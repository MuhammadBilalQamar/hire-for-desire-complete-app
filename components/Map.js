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
import { Constants, MapView, Location, Permissions } from "expo";
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
    Title
} from "native-base";

import img from "../images/bgimg.jpg";
export default class Maps extends Component {


    constructor() {
        super();
        this.state = {
            circleMembersLocation: [],
            groupSecret: "",
            mapRegion: {
                latitude: 24.8832759,
                longitude: 67.0643432,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            },
            locationResult: null,
            location: { coords: { latitude: 24.8832759, longitude: 67.0643432 } }
        };
    }

    componentDidMount() {

        // console.log(this.props.navigation.state.params.secretKey)
        try {
            this._getLocationAsync();
            this.getAllCircleCoords(this.props.navigation.state.params.secretKey);
        }
        catch (err) {
            console.log(err);
        }
    }

    getAllCircleCoords = groupSecret => {
        // parseInt(groupSecret);
        // console.log(groupSecret)
        fetch(
            'http://192.168.0.110:8000/get-group-members-information/' + groupSecret
        )
            .then(res => {
                res.json().then(coords => {
                    // console.log("ALL MEMBER COORDS", coords);
                    this.setState({ circleMembersLocation: coords, groupSecret });
                });
            })
            .catch(err => {
                console.log("ERROR GETTING COORDS OF ALL MEMBERS", err);
            });
    };

    _handleMapRegionChange = mapRegion => {
        this.setState({ mapRegion });
    };

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
            this.setState({
                locationResult: "Permission to access location was denied",
                location
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ locationResult: JSON.stringify(location), location });
    };


    sendPanicAlarm() {
        // console.log("")
        try {
            var currentUser = this.props.navigation.state.params.currentUserData.name;
            firebase.database().ref("Groups/" + this.state.groupSecret + "/").update({
                message: currentUser + "is in trouble"
            }).then(() => {
                alert("Auto Panic Generated");
            })
        }
        catch (err) {
            alert(err)
        }
    }
    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.sendPanicAlarm()}
                    style={{ position: "absolute", paddingTop: 6, height: 50, width: 50, left: 10, bottom: 20, borderRadius: 100, alignItems: "center", backgroundColor: "red" }}>
                    {/* <Button primary > */}
                    {/* <Text> Send Notification</Text> */}
                    <Icon style={{ color: "white" }} name='ios-notifications' />
                    {/* </Button> */}
                </TouchableOpacity>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
                {/* <MapView
                    // showsUserLocation
                    liteMode={true}
                    style={{
                        alignSelf: "stretch",
                        height: 450,
                        width: "100%",
                        // height: Dimensions.get("window").height
                    }}
                    region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
                    onRegionChange={this._handleMapRegionChange}
                > */}


                {this.state.circleMembersLocation.length != 0 &&
                    this.state.circleMembersLocation.map((item, i) => {
                        console.log(item)
                        console.log(item.image)

                        // let coords = { latitude: item.lat, longitude: item.lng };
                        return (
                            <MapView.Marker
                                key={i}
                                coordinate={item.coords}
                                title={item.name}
                                description="Some description"
                                title={"@3x image"}
                            >
                                <View
                                    style={{
                                        height: 80,
                                        width: 80,
                                        borderRadius: 100
                                    }}
                                >
                                    {item.image != null &&
                                        <Image
                                            source={{ uri: item.image }}
                                            // source={require('../images/bgimg.jpg')}
                                            style={{
                                                borderWidth: 5,
                                                borderColor: "green",
                                                backgroundColor: "white",
                                                height: 80,
                                                width: 80,
                                                borderRadius: 100
                                            }}
                                        />}
                                </View>
                            </MapView.Marker>
                        );
                    })}
                {/* </MapView> */}
                <Text>
                    Location: {this.state.locationResult}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#ecf0f1"
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "#34495e"
    }
});
