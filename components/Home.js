import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    SafeAreaView,
    Image,
    TextInput,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity
} from "react-native";
import {
    Container,
    Content,
    InputGroup,
    Input,
    Icon,
    Item,
    Card,
    CardItem,
    Header,
    Body,
    Button,
    Picker,
    Title,

} from "native-base";
import { Drawer, Item as FormItem } from "native-base";
import ContentView from "./Drawer";
import fire from "../Database/Firebase";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Map: false,
            uid: null,
            search: '',
            groupname: "",
            currentUserData: null,
            finalResult: [],
            group: "Create-Group",
            selectedGroupName: "",
            joinNewGroupCode: ""
        };
    }

    componentDidMount() {


        let { currentUserData, uid } = this.state;
        // uid = this.props.navigation.state.params.uid;
        uid = "4tax5TN2vQNWMVxOLRgaIboKaiq1";

        fire.database().ref('Users/' + uid + '/').on('value', snap => {
            console.log("userdata--------------", snap.val());

            currentUserData = snap.val();
            this.setState({ currentUserData, uid })
        });
        // http://192.168.0.107:8000/all-user-joined-groups/4tax5TN2vQNWMVxOLRgaIboKaiq1

        fetch('http://192.168.0.110:8000/all-user-joined-groups/' + uid).
            then(res => res.json()).then(mainres => {
                // console.log("mainres--------", mainres);
                this.setState({ finalResult: mainres, uid })

            }).catch(err => {
                console.log(err);
            })

    }

    static navigationOptions = {
        header: null
    };
    openDrawer = () => {
        this.drawer._root.open();
    };
    closeDrawer = () => {
        this.drawer._root.close();
    };



    createGroup(value) {
        console.log(value);
        this.setState({
            group: value
        });
    }


    developGroup() {
        // console.log(this.state.currentUserGroups)
        try {
            let { groupname, uid, currentUserData } = this.state;

            console.log(uid, groupname);
            var name = currentUserData.name;
            var email = currentUserData.email;
            var lat = currentUserData.lat;
            var long = currentUserData.long;
            var image = currentUserData.image;
            var adminUid = currentUserData.uid;
            var secretKeys = currentUserData.secretKeys;


            var groupSecretKey = Math.floor(Math.random() * 5000);

            if (groupname != "" && uid != null) {
                fire.database().ref("Groups/" + groupSecretKey + "/").set({
                    groupname,
                    secretKeys: groupSecretKey.toString(),
                    // groupAdmin: currentUserData,
                    // members: [currentUserData]
                }).then(() => {
                    fire.database().ref("Groups/" + groupSecretKey + "/members/").push({
                        name, email, lat, long, image, adminUid, secretKeys

                    });
                    fire.database().ref('Users/' + uid + '/secretKeys/').push({
                        secretKeys: groupSecretKey.toString()
                    });
                    // [groupSecrets]: [groupSecretKey] 
                    alert("Your group has been successfully created")
                    this.setState({ groupname: "" })
                });
            }
            else {
                alert("Something Went Wrong")
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    navigateToGroup(value) {
        // console.log("bhai yaha sy ab map py bhej with data",value);
        this.setState({
            selectedGroupName: value,
            secretKey
        });
    }


    goToSpecificGroup(secretKey) {
        // console.log(secretKey);
        const { currentUserData } = this.state;
        this.props.navigation.navigate("Maps", { secretKey, currentUserData })


    }

    sendInvitation(key, gpname) {

        alert("Send " + key + " to your partner to join " + gpname)
    }

    joinNewGroup() {
        // const { currentUserData } = this.state;
        try {
            let { currentUserData } = this.state;

            var name = currentUserData.name;
            var email = currentUserData.email;
            var lat = currentUserData.lat;
            var long = currentUserData.long;
            var image = currentUserData.image;
            var uid = currentUserData.uid;
            var secretKeys = currentUserData.secretKeys;
            // console.log(this.state.joinNewGroupCode);

            firebase.database().ref("Groups/" + this.state.joinNewGroupCode + "/members/").push({
                name, email, lat, long, image, uid, secretKeys
            }).then(() => {
                alert("You have successfully joined this group");
            })
        }
        catch (err) {
            alert(err);
        }
    }

    render() {
        let { currentUserData, group, finalResult } = this.state;

        try {

            // console.log("current user Group Data######", finalResult);

        }
        catch (err) {
            // console.log(currentUserData.groupSecrets);
        }

        return (
            <Drawer
                ref={ref => {
                    this.drawer = ref;
                }}
                content={currentUserData != null && <ContentView menu={this.props} data={this.state.currentUserData} />}
                onClose={() => this.closeDrawer()}
                openDrawerOffset={0.3}
                panCloseMask={0.3}
            >
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 0.2, marginTop: 22 }}>
                        <Header style={{ backgroundColor: "#1974BA" }}>
                            <Body
                                style={{
                                    flex: 1,
                                    // justifyContent: "flex-start",
                                    flexDirection: "row",
                                    marginLeft: 5
                                }}
                            >
                                <TouchableOpacity onPress={this.openDrawer.bind(this)}>
                                    <View>
                                        <Image
                                            source={require("../images/menu.png")}
                                            style={{ height: 25, width: 25, marginTop: 15 }}
                                        />
                                    </View>
                                </TouchableOpacity>

                                <View
                                    style={{
                                        borderWidth: 2,
                                        borderRadius: 10,
                                        width: "85%",
                                        height: 45,
                                        marginLeft: "8%",
                                        borderColor: "#DFDFDF",
                                        backgroundColor: "white"
                                    }}
                                >
                                    <Item style={{ borderColor: "transparent" }}>

                                        <Picker
                                            headerComponent={
                                                <Header>

                                                    <Title>Custom Header</Title>
                                                </Header>
                                            }
                                            mode='dropdown'
                                            selectedValue={this.state.group}
                                            onValueChange={value => this.createGroup(value)}
                                        >
                                            <Item label='Create Group' value='Create-Group' />
                                            <Item label='My Groups' value='Joined-Groups' />
                                            <Item label='Join New One' value='Joined-New-Group' />
                                        </Picker>
                                    </Item>
                                </View>
                            </Body>
                            <View
                                style={{
                                    justifyContent: "flex-end",
                                    flexDirection: "row",
                                    marginTop: 20
                                }}
                            >

                            </View>
                        </Header>
                    </View>
                    <View
                        style={{
                            height: Dimensions.get("window").height,
                            backgroundColor: "white",
                            flex: 1.6
                        }}
                    >
                        {/* join new group*/}


                        {group == "Joined-New-Group" &&

                            <View style={{ alignItems: "center" }}>
                                <Text style={{
                                    fontWeight: "bold",
                                    fontSize: 20,
                                    marginBottom: 10
                                }}>
                                    Enter Group Code Here
                                  </Text>
                                <Item rounded style={{
                                    marginBottom: 20,
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                    borderColor: 'gray',
                                    marginLeft: 10,
                                    marginRight: 10,
                                }}>
                                    <Input placeholder='abcxyz123..'
                                        value={this.state.groupname}
                                        onChangeText={(text) => this.setState({ joinNewGroupCode: text })}
                                    />
                                </Item>
                                <TouchableOpacity style={{
                                    alignSelf: 'stretch',
                                    alignItems: 'center',
                                    padding: 20,
                                    backgroundColor: "pink",
                                    marginTop: 10,
                                    borderRadius: 15,
                                    marginLeft: 20,
                                    marginRight: 20,
                                }}
                                    onPress={() => this.joinNewGroup()}
                                >
                                    <Text style={{
                                        color: "#fff",
                                        fontWeight: 'bold',
                                    }}>Join
</Text>
                                </TouchableOpacity>
                            </View>
                        }

                        {/* GROUP-CREATION-FORM */}
                        {group == "Create-Group" &&

                            <View style={{ alignItems: "center" }}>
                                <Text style={{
                                    fontWeight: "bold",
                                    fontSize: 20,
                                    marginBottom: 10
                                }}>
                                    Enter your circle name
                                  </Text>
                                <Item rounded style={{
                                    marginBottom: 20,
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                    borderColor: 'gray',
                                    marginLeft: 10,
                                    marginRight: 10,
                                }}>
                                    <Input placeholder='Enter Circle Name..'
                                        value={this.state.groupname}
                                        onChangeText={(text) => this.setState({ groupname: text })}
                                    />
                                </Item>
                                <TouchableOpacity style={{
                                    alignSelf: 'stretch',
                                    alignItems: 'center',
                                    padding: 20,
                                    backgroundColor: "pink",
                                    marginTop: 10,
                                    borderRadius: 15,
                                    marginLeft: 20,
                                    marginRight: 20,
                                }}
                                    onPress={() => this.developGroup()}
                                >
                                    <Text style={{
                                        color: "#fff",
                                        fontWeight: 'bold',
                                    }}>Create
                                 </Text>
                                </TouchableOpacity>
                            </View>
                        }

                        {/* MY-GROUP-SESSION */}


                        {group == "Joined-Groups" &&

                            <View style={{ alignItems: "center" }}>
                                <Text style={{
                                    fontWeight: "bold",
                                    fontSize: 20,
                                    marginBottom: 10
                                }}>
                                    These are my groups </Text>

                                {finalResult.length != 0 &&
                                    <View
                                        style={{
                                            // borderWidth: 2,
                                            // borderRadius: 10,
                                            width: "85%",
                                            height: 35,
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            // marginLeft: "8%",
                                            // borderColor: "#DFDFDF",
                                            // backgroundColor: "white"
                                        }}
                                    >
                                        {/* <Item style={{ borderColor: "transparent" }}> */}


                                        {finalResult && finalResult.map((element, index) => {
                                            // console.log(element.groupname);
                                            return (
                                                <Card key={index} style={{ margin: 5 }}>
                                                    <CardItem header>
                                                        <Text>Group Name : </Text>
                                                        <Text>
                                                            {element.groupname}
                                                        </Text>
                                                    </CardItem>

                                                    <CardItem footer bordered >
                                                        <TouchableOpacity style={{
                                                            alignSelf: 'stretch',
                                                            alignItems: 'center',
                                                            padding: 20,
                                                            backgroundColor: "pink",
                                                            marginTop: 10,
                                                            borderRadius: 15,
                                                            marginLeft: 20,
                                                            marginRight: 20,
                                                        }}
                                                            onPress={() => this.goToSpecificGroup(element.secretKeys)}
                                                        >
                                                            <Text style={{
                                                                color: "#fff",
                                                                fontWeight: 'bold',
                                                            }}>View Group
                                                         </Text>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity style={{
                                                            alignSelf: 'stretch',
                                                            alignItems: 'center',
                                                            padding: 20,
                                                            backgroundColor: "pink",
                                                            marginTop: 10,
                                                            borderRadius: 15,
                                                            marginLeft: 20,
                                                            marginRight: 20,
                                                        }}
                                                            onPress={() => this.sendInvitation(element.secretKeys, element.groupname)}
                                                        >
                                                            <Text style={{
                                                                color: "#fff",
                                                                fontWeight: 'bold',
                                                            }}>Invite Friends
                                                         </Text>
                                                        </TouchableOpacity>
                                                    </CardItem>
                                                </Card>
                                            )
                                        })}


                                        {/* <Picker
                                                headerComponent={
                                                    <Header>

                                                        <Title>Custom Header</Title>
                                                    </Header>
                                                }
                                                mode='dropdown'
                                                selectedValue={this.state.selectedGroupName}
                                                onValueChange={value => this.navigateToGroup(value)}
                                            >
                                                {finalResult && finalResult.map((element, index) => {
                                                    console.log(element.groupname);
                                                    return (
                                                        <Item label={element.groupname} value={element.groupname} key={index} />

                                                    )
                                                })}
                                            </Picker> */}
                                        {/* </Item> */}

                                    </View>
                                }
                            </View>
                        }

                        {/* <ImageBackground
              source={require("../images/back.jpg")}
              style={{ width: "100%", height: "100%" }}
            /> */}
                        {/* {this.state.Map == true && (
              <Map lat={74.2572175} lng={31.5219706} />
            )} */}
                    </View>

                    <View style={{ flex: 0.2, backgroundColor: "#428DC6" }}>
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate("Maps")
                            }}>
                                <Text
                                    style={{
                                        color: "white",
                                        fontSize: 20,
                                        fontWeight: "500",
                                        marginTop: 10
                                    }}
                                >
                                    View Map
                          </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Drawer>
        );
    }
}

export default Home;



 //MY WORK

        // try {
        //     fire.database().ref('Users/' + this.props.navigation.state.params.uid + '/').on('value', snap => {

        //         tempSecrets.push(snap.val().secretKeys);
        //         currentUserData = snap.val();
        //         tempSecrets.forEach(element => {
        //             // console.log(element)
        //             // temp.push(element)
        //             for (const [key, value] of Object.entries(element)) {
        //                 // console.log(`key: ${key}, value: ${value.secretKeys}`)
        //                 temp.push(value);
        //             }
        //         }
        //         );
        //         this.setState({ currentUserData, uid: this.props.navigation.state.params.uid })
        //     });


        //     // console.log(currentUserData);


        //     fire.database().ref('Groups/').on('value', snapshot => {


        //         snapshot.forEach(element => {
        //             tempGroups.push(element.secretKeys)
        //             console.log("element secret keyss$$$$$$$$", element)
        //         });
        //         // console.log("ye raha temp", temp)
        //         // console.log("ye  tempGroups", tempGroups)

        //         temp.forEach(item => {
        //             // console.log(currentUserGroups[0].includes(item.secretKeys));
        //             // console.log("temp array ka item", item.secretKeys);
        //             for (const [key, value] of Object.entries(item)) {
        //                 // console.log(`key: ${key}, value: ${value.secretKeys}`)
        //                 if (tempGroups.includes(item.secretKeys)) {
        //                     console.log("true", temp)
        //                     currentUserGroups.push(snapshot.val())
        //                     this.setState({ currentUserGroups })
        //                 }
        //             }

        //             // if (currentUserGroups.includes(item.secretKeys)) {
        //             //     console.log("true", temp)
        //             //     // snapshot.child(element.key).val()
        //             //     currentUserGroups.push(snapshot.val())
        //             //     this.setState({ currentUserGroups })
        //             // }
        //         });

        //         // currentUserGroups.push(snapshot.val())
        //         // snapshot.forEach(element => {
        //         //     console.log(element.key);
        //         // });
        //     })

        // }
        // catch (err) {
        //     console.log(err);
        // }