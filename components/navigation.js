import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, Button } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import fire from "../Database/Firebase";
import { SearchBar } from 'react-native-elements';
// const FirstRoute = () => (
//     <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
// );
// const SecondRoute = () => (
//     <View style={[styles.scene, { backgroundColor: '#673ab7' }]} >
//         {/* <Text>{state.index}</Text> */}
//     </View>
// );
import { Container, Content, Card, CardItem, Icon, Thumbnail, Item, Header, Picker, Title, Input } from 'native-base';


export class SecondRoute extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    componentDidMount() {

    }
    render() {

        return (
            <View style={[styles.scene, { backgroundColor: '#673ab7' }]} >

            </View>
        )
    }

}

export class ThirdRoute extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    componentDidMount() {

    }
    render() {

        return (
            <View style={[styles.scene, { backgroundColor: 'yellow' }]} >

            </View>
        )
    }

}

export class FirstRoute extends React.Component {
    constructor() {
        super();
        this.state = {
            category: null,
            currentuid: null,
            search: '',
            searchby: 'category',
            serviceproviders: [],
            filteredProviders: [],
            currentUserData: []
        };
    }

    componentDidMount() {
        const { serviceproviders } = this.state;



        fetch("http://192.168.100.248:8000/allserviceproviders")
            .then(res =>
                res.json()
                    .then(serviceproviders => {
                        // console.log(allserviceprovidersusers)
                        this.setState({ serviceproviders: serviceproviders });
                        //   console.log("CATEGORIES in did mount", categories);
                    })
                    .catch(err => {
                        console.log("internal error", err);
                    })
            )
            .catch(err => console.log("Err in getting categories reason:", err));

    }

    // REQUEST FUNCTIONALITY

    sendHireReq(index) {
        const { serviceproviders } = this.state;
        var slectedUserUid = serviceproviders[index].uid;
        // console.log(slectedUserUid);

        fetch('http://192.168.100.248:8000/send-request', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                slectedUserUid
            })
        });

        //for image backend
        // let form = new FormData();
        // form.append("file-name", 'filevalue')
        // fetch('http://192.168.0.102:8000/send-request', {
        //     method: "POST",
        //     headers: {
        //         "Accept": "application/*",
        //         "Content-Type": "x-www-form-urlencoded",
        //     },
        //     body: form,
        // });
    }

    cancelReq(index) {

    }

    // SEARCH FUNCTIONALITY

    updateSearch = search => {
        this.setState({ search })

        let { serviceproviders, searchby, filteredProviders } = this.state;
        filteredProviders = serviceproviders;

        // console.log("======search by===******",searchby);
        if (searchby == 'category') {
            // console.log('search in categories');
            filteredProviders = filteredProviders.filter((element) => {
                let Name = element.service.toLowerCase()
                return Name.indexOf(search.toLowerCase()) !== -1
            })

            this.setState({
                filteredProviders
            })
        }
        else if (searchby == 'location') {
            // console.log('search in location');
            filteredProviders = filteredProviders.filter((element) => {
                let Name = element.location.toLowerCase()
                return Name.indexOf(search.toLowerCase()) !== -1
            })

            this.setState({
                filteredProviders
            })
        }
        else if (searchby == 'contacts') {
            // console.log('search in contacts');
            filteredProviders = filteredProviders.filter((element) => {
                let Name = element.phone.toLowerCase()
                return Name.indexOf(search.toLowerCase()) !== -1
            })

            this.setState({
                filteredProviders
            })
        }
    };
    

    searchBy(value) {
        // console.log(value);
        this.setState({
            searchby: value,
            filteredProviders: []
        });

    }

    render() {
        const { serviceproviders, search, filteredProviders, currentuid } = this.state;
        // console.log(serviceproviders)
        return (
            <View style={[styles.scene]} >
                <Container>
                    <Content>
                        <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>
                            <SearchBar
                                placeholder="Type Here..."
                                onChangeText={this.updateSearch}
                                value={this.state.search}
                            />
                            <Item rounded style={{ width: 500, alignItems: "center", marginBottom: 20, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderColor: 'rgba(255, 255, 255, 0.5)' }}>
                                <Picker
                                    headerComponent={
                                        <Header>

                                            <Title>Custom Header</Title>
                                        </Header>
                                    }
                                    mode='dropdown'
                                    selectedValue={this.state.searchby}
                                    onValueChange={value => this.searchBy(value)}
                                >
                                    <Item label='categories' value='category' />
                                    <Item label='location ' value='location' />
                                    <Item label='contacts' value='contacts' />
                                </Picker>

                            </Item>
                            {search == "" && serviceproviders && serviceproviders.map((Item, index) => {
                                // console.log("map ka item****", Item.name, "inexxx*****", index);
                                return (
                                    <View key={index}>
                                        <Card>
                                            <CardItem style={{ alignItems: "center" }} >

                                                <Thumbnail size={200} source={{ uri: Item.pic }} />
                                                <Text style={{ padding: 20 }}>
                                                    {`Name : ${Item.name}\n`}
                                                    {`Location : ${Item.location}\n`}
                                                    {`phone : ${Item.phone}\n`}
                                                    {`Service : ${Item.service}\n`}
                                                </Text>

                                                {/* {Item.request.forEach(element => {
                                                    if (element.uid == currentuid) {
                                                        return element.isReqAccept
                                                    }
                                                }) === false &&
                                                    <Button
                                                        title="Cancel Request"
                                                        onPress={() => this.cancelReq(index)}
                                                    />
                                                } */}

                                                <Button
                                                    title="Hire"
                                                    onPress={() => this.sendHireReq(index)}
                                                />
                                            </CardItem>
                                        </Card>
                                    </View>
                                )
                            })}

                            {search != "" && filteredProviders && filteredProviders.map((Item, index) => {
                                // console.log("map ka item****", Item.name, "inexxx*****", index);
                                return (
                                    <View key={index}>
                                        <Card>
                                            <CardItem style={{ alignItems: "center" }} >

                                                <Thumbnail size={200} source={{ uri: Item.pic }} />
                                                <Text style={{ padding: 20 }}>
                                                    {`Name : ${Item.name}\n`}
                                                    {`Location : ${Item.location}\n`}
                                                    {`phone : ${Item.phone}\n`}
                                                    {`Service : ${Item.service}\n`}
                                                </Text>
                                                <Button
                                                    title="Send Offer"
                                                    onPress={() => this.sendHireReq(index)}
                                                />
                                            </CardItem>
                                        </Card>
                                    </View>
                                )
                            })}
                        </View>
                    </Content>
                </Container>
            </View>
        )
    }
}




export default class TabViewExample extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'See Users' },
            { key: 'second', title: 'Requests' },
            { key: 'third', title: 'Chat' },

        ],
    };

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: FirstRoute,
                    second: SecondRoute,
                    third: ThirdRoute,
                })}
                onIndexChange={index => this.setState({ index })}
                // initialLayout={{ width: Dimensions.get('window').width }}
                initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }} />

        );
    }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
})