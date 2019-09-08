import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Image,
    // Picker,
    PickerItem,
    Platform,
    TouchableOpacity
} from "react-native";
import * as Expo from "expo";
import { ImagePicker, Location, Permissions, Constants } from "expo";
import fire from "../Database/Firebase";
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Input } from 'react-native-elements';
import { Card, Input, Item, Picker, Title, Header } from "native-base";


export default class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            uid: null
        };
    }

    componentDidMount() {
      
    }



    signIn() {
        // console.log(this.state);
        //  this.props.navigation.navigate("Home")
        const { email, pass } = this.state;

        fire.auth().signInWithEmailAndPassword(email, pass).then((e) => {
            // console.log("success", e.user.uid)

            this.props.navigation.navigate("Home", { uid: e.user.uid })

        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Something Went Wrong");
            // ...
        });
    }
    signUp(){

        this.props.navigation.navigate("Signup")

    }


    render() {
        const { email, pass } = this.state;

        return (
            <View style={styles.container}>

                <Text style={styles.header}>Sign In</Text>


                <Item rounded style={{ marginBottom: 20, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderColor: 'gray' }}>
                    <Input placeholder='Your Email..'
                        onChangeText={(text) => this.setState({ email: text })}
                        value={this.state.email}
                    />
                </Item>

                <Item rounded style={{ marginBottom: 20, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderColor: 'gray' }}>
                    <Input secureTextEntry={true} placeholder='Your Password...'
                        onChangeText={(text) => this.setState({ pass: text })}
                        value={this.state.pass}
                    />
                </Item>


                <TouchableOpacity style={styles.botton}
                    onPress={() => this.signIn()}
                >
                    <Text style={styles.btntext}>Login
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botton}
                    onPress={() => this.signUp()}
                >
                    <Text style={styles.btntext}>Sign Up
                  </Text>
                </TouchableOpacity>

            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        // alignSelf: 'stretch',
        display: 'flex',
        flex: 1,
        // backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 20,
        paddingRight: 20,
        marginLeft: 20,
        marginRight: 20
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: '#199187',
        // borderBottomWidth: 1,
        textAlign: 'center'
    },
    textInput: {
        alignSelf: 'stretch',
        height: 40,
        marginTop: 30,
        color: "#fff",
        borderBottomColor: "#f8f8f8",
        borderBottomWidth: 1
    },
    botton: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#59cbbd",
        marginTop: 30,
        borderRadius: 10
    },
    btntext: {
        color: "#fff",
        fontWeight: 'bold'
    },
    imgbutton: {
        alignSelf: 'stretch',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: "#59cbbd",
    },
    dropDown: {
        alignSelf: 'stretch',
        borderBottomColor: '#199187',
        borderBottomWidth: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    }
});
