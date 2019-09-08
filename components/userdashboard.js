import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Image,
    Picker,
    PickerItem,
    Platform,
    TouchableOpacity
} from "react-native";
import * as Expo from "expo";
import fire from "../Database/Firebase";
import { SearchBar } from 'react-native-elements';



export default class UserDashboard extends Component {
    constructor() {
        super();
        this.state = {
            category: null,
            users: [],
            search: ''
        };
    }
    updateSearch = search => {
        // console.log(this.state.users)
    };
    componentDidMount() {
        const { users } = this.state;

        fire.database().ref('users/').on('value', snapshot => {
            // console.log(snapshot.val())
            users.push(snapshot.val());
        }, () => {
            this.setState({ users })
        })
        // this._getLocationAsync();
        // if (!category) {
        //   fetch("http://localhost:8000/allservices")
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

    render() {

        return (
            <View style={{ textAlignVertical: 'top', padding: 0, }}>
                <Text>users dashboard</Text>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     // backgroundColor: "#fff",
    //     // alignItems: "center",
    //     // justifyContent: "center"
    // },

});
