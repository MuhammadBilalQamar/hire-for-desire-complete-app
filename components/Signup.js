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
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView
} from "react-native";
import * as Expo from "expo";
import { ImagePicker, Location, Permissions, Constants } from "expo";
import fire from "../Database/Firebase";
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Input } from 'react-native-elements';
import { Card, Input, Item, Picker, Title, Header } from "native-base";


export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      image: null,
      location: 'Karachi',
      errorMessage: null,
      pass: '',
      repeatPass: ''
    };
  }

  componentDidMount() {
    const { category } = this.state;

    this.setState({
      uid: this.props.uid
    })
    this._getLocationAsync();
    // fire
    //   .database()
    //   .ref("categories/")
    //   .on("value", snapshot => {
    //     snapshot.forEach(snapshotValue => {
    //       // console.log(snapshotValue);
    //       category.push(snapshotValue);
    //     });
    //     this.setState({ category });
    //   });

    // if (!category) {
    //   fetch("http://192.168.56.1:8000/allservices")
    //     .then(res =>
    //       res
    //         .json()
    //         .then(categories => {
    //           this.setState({ category: categories });
    //           //   console.log("CATEGORIES in did mount", categories);
    //         })
    //         .catch(err => {
    //           console.log("internal error", err);
    //         })
    //     )
    //     .catch(err => console.log("Err in getting categories reason:", err));
    // }
  }


  _getLocationAsync = () => {

    Expo.Permissions.askAsync(Expo.Permissions.LOCATION).then(() => {
      Expo.Location.getCurrentPositionAsync().then(result => {
        console.log(result);
      });
    });
  };

  whatLocation(value) {
    console.log(value);
    this.setState({
      location: value
    });
  }


  signUp() {
    console.log(this.state);
    //  this.props.navigation.navigate("Home")
    const { name, email, phone, image, location, pass, repeatPass } = this.state;

    if (location != "" && name != "" && email != "" && phone != "" && image != null && pass != '' && repeatPass != '') {
      if (pass === repeatPass) {

        fire.auth().createUserWithEmailAndPassword(email, pass).then((e) => {
          // console.log("user uid******", e.user.uid);
          fire.database().ref("Users/" + e.user.uid + "/").set({
            name,
            email,
            phone,
            uid: e.user.uid,
            pass,
            location,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX7k1TRCVhuEfNuL_osBIp83B26ozY_QasAW_rOd1xwFbEo-5i",
          }).then(() => {
            alert("Conguratulations You Have Been Successfully Registered");
            this.setState({
              uid: e.user.uid
            });
                  this.props.navigation.navigate("Signin")
          })
        }).catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // console.log(errorMessage);
          alert(errorMessage);
        });
      }
      else {
        alert("Your Password Must Be Same");
      }

    }
    else {


    }

  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    // console.log(result);
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };


  render() {
    const { image, category, asAuserOrServiceProvider } = this.state;

    return (
      <ScrollView>
        <View style={styles.container} >

          <Text style={styles.header}>Sign Up</Text>

          <Item rounded style={{ marginBottom: 20, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderColor: 'gray' }}>
            <Input placeholder='Your Name...'
              onChangeText={(text) => this.setState({ name: text })}
              value={this.state.name}
            />
          </Item>

          <Item rounded style={{ marginBottom: 20, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderColor: 'gray' }}>
            <Input placeholder='Phone Number...'
              onChangeText={(text) => this.setState({ phone: text })}
              value={this.state.phone}
            />

          </Item>

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

          <Item rounded style={{ marginBottom: 20, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderColor: 'gray' }}>
            <Input secureTextEntry={true} type='password' placeholder='Repeat Password...'
              onChangeText={(text) => this.setState({ repeatPass: text })}
              value={this.state.repeatPass}
            />
          </Item>

          <Item rounded style={{ marginBottom: 20, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderColor: 'gray' }}>
            <Picker
              headerComponent={
                <Header>

                  <Title>Custom Header</Title>
                </Header>
              }
              mode='dropdown'
              selectedValue={this.state.location}
              onValueChange={value => this.whatLocation(value)}
            >
              <Item label='Karachi' value='Karachi' />
              <Item label='Lahore' value='Lahore' />
              <Item label='Hyderabad' value='Hyderabad' />
              <Item label='Peshawar' value='Peshawar' />

            </Picker>

          </Item>
          <Item >
            <Button
              style={styles.imgbutton}
              title="Pick An Image.."
              onPress={this._pickImage}
            />
            {image && (
              <Image source={{ uri: image }} style={{ width: 200, height: 200, padding: 20 }} />
            )}
          </Item>

          <TouchableOpacity style={styles.botton}
            onPress={() => this.signUp()}
          >
            <Text style={styles.btntext}>Submit
          </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
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
