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
  Button
} from "native-base";
import { Drawer, Item as FormItem } from "native-base";


class ContentView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUserData: null

    }


  }
  componentDidMount() {
    // console.log(this.props.data)
    this.setState({
      currentUserData: this.props.data
    })
  }

  signOut() {
    // this.props.navigation.navigate("Signin")
  }


  render() {
    //   const navigate=this.props.navigation;

    let { currentUserData } = this.state;
    try {
      console.log(currentUserData.image)
      // console.log(currentUserData.email)
    }
    catch (err) {

    }

    return (
      <View
        style={{
          height: Dimensions.get("window").height,
          backgroundColor: "#0B0F58",
          flex: 1
        }}
      >
        <View style={{ flex: 0.3, backgroundColor: "#1974BA" }}>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            {/* <Text
              style={{
                marginTop: 30,
                marginLeft: 30,
                color: "white",
                fontSize: 22,
                fontWeight: "500"
              }}
            > */}
            {currentUserData && <Image
              style={{
                width: 100, height: 100, borderRadius: 100, borderWidth: 5, borderColor: 'gray',
              }}
              source={{ uri: currentUserData.image }} />}
            {/* Umair */}
            {/* </Text> */}
          </View>


          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start"
            }}
          >
            <Text
              style={{
                marginTop: 30,
                marginLeft: 30,
                color: "white",
                fontSize: 22,
                fontWeight: "500"
              }}
            >
              {currentUserData && <Text>{currentUserData.name}</Text>}

              {/* Umair */}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start"
            }}
          >
            <Text
              style={{
                marginTop: 10,
                marginLeft: 30,
                color: "white",
                fontSize: 16,
                fontWeight: "400"
              }}
            >
              {currentUserData && <Text>{currentUserData.email}</Text>}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start"
            }}
          >
            {/* <Text
              style={{
                marginTop: 10,
                marginLeft: 30,
                color: "white",
                fontSize: 16,
                fontWeight: "400"
              }}
            >
              Credits : $
            </Text>
            <Text
              style={{
                marginTop: 10,
                marginLeft: 30,
                color: "white",
                fontSize: 16,
                fontWeight: "400"
              }}
            >
              0.00
            </Text> */}
          </View>
        </View>
        <View style={{ borderBottomWidth: 0.5, borderColor: "white" }} />
        <View style={{ flex: 0.7, backgroundColor: "#1974BA" }}>
          {/* <TouchableOpacity
            onPress={() => this.props.menu.navigation.navigate("Home")}
          > */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 30,
              marginLeft: 20
            }}
          >
            {/* <Image
              source={require("../images/home.png")}
              style={{ width: 20, height: 20 }}
            /> */}
            <Text style={{ fontSize: 16, color: "white", marginLeft: 20 }}>
              {/* Find a Car Wash */}
            </Text>
          </View>
          {/* </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => this.props.menu.navigation.navigate("Membership")}
          >
            <View
              style={{ flexDirection: "row", marginTop: 30, marginLeft: 20 }}
            >
              {/* <Image
                source={require("../images/qr-code.png")}
                style={{ width: 20, height: 20 }}
              /> */}
              <Text style={{ fontSize: 16, color: "white", marginLeft: 20 }}>
                {/* Member Ships */}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", marginTop: 30, marginLeft: 20 }}>
            {/* <Image
              source={require("../images/user.png")}
              style={{ width: 20, height: 20 }}
            /> */}
            <Text style={{ fontSize: 16, color: "white", marginLeft: 20 }}>
              Invite a Friends
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 30, marginLeft: 20 }}>
            {/* <Image
              source={require("../images/setting.png")}
              style={{ width: 20, height: 20 }}
            /> */}
            <Text style={{ fontSize: 16, color: "white", marginLeft: 20 }}>
              Account Settings
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 30, marginLeft: 20 }}>
            {/* <Image
              source={require("../images/help.png")}
              style={{ width: 20, height: 20 }}
            /> */}
            <Text style={{ fontSize: 16, color: "white", marginLeft: 20 }}>
              Help & Support
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 30, marginLeft: 20 }}>
            {/* <Image
              source={require("../images/help.png")}
              style={{ width: 20, height: 20 }}
            /> */}
            <TouchableOpacity
              onPress={() => this.signOut()}
            >
              <Text style={{ fontSize: 16, color: "white", marginLeft: 20 }}>Log Out
                  </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default ContentView;