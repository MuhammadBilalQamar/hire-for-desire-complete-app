import React from "react";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import { Icon } from "native-base";
import { Image } from "react-native";
import Signup from "./components/Signup";
// import SignIn from "./screen/SignIn";
import Home from "./components/Home";
import Signin from './components/Signin';

import Maps from './components/Map'
const AppNavigator = createStackNavigator(
  {
    // StartPage: {
    //   screen: StartPage,
    //   navigationOptions: {
    //     tabBarLabel: "StartPage",
    //     // color:"#1A5CAD",
    //     //tabBarActiveTintColor
    //     tabBarIcon: ({ tintColor }) => (
    //       <Icon name="ios-home" size={20} style={{ color: "white" }} />
    //     )
    //   }
    // },
    // SignUp: {
    //   screen: SignUp,
    //   navigationOptions: {
    //     tabBarLabel: "Sign Up",
    //     // color:"#1A5CAD",
    //     //tabBarActiveTintColor
    //     tabBarIcon: ({ tintColor }) => (
    //       <Icon name="ios-home" size={20} style={{ color: "white" }} />
    //     )
    //   }
    // },
    // SignIn: {
    //   screen: SignIn,
    //   navigationOptions: {
    //     tabBarLabel: "SignIn",
    //     // color:"#1A5CAD",
    //     //tabBarActiveTintColor
    //     tabBarIcon: ({ tintColor }) => (
    //       <Icon name="ios-home" size={20} style={{ color: "white" }} />
    //     )
    //   }
    // },
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        // color:"#1A5CAD",
        //tabBarActiveTintColor
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home" size={20} style={{ color: "white" }} />
        )
      }
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        tabBarLabel: "Membership",
        title: 'Sign Up',
        // color:"#1A5CAD",
        //tabBarActiveTintColor
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home" size={20} style={{ color: "white" }} />
        )
      }
    },
    Signin: {
      screen: Signin,
      navigationOptions: {
        // tabBarLabel: "Membership",
        title: 'Family Locator App',
        // color:"#1A5CAD",
        //tabBarActiveTintColor
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home" size={20} style={{ color: "white" }} />
        )
      }
    },
    Maps: {
      screen: Maps,
      navigationOptions: {
        // tabBarLabel: "Membership",
        title: 'Maps',
        // color:"#1A5CAD",
        //tabBarActiveTintColor
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home" size={20} style={{ color: "white" }} />
        )
      }
    },
    // InviteFriend: {
    //   screen: InviteFriend,
    //   navigationOptions: {
    //     tabBarLabel: "Invite Friend",
    //     // color:"#1A5CAD",
    //     //tabBarActiveTintColor
    //     tabBarIcon: ({ tintColor }) => (
    //       <Icon name="ios-home" size={20} style={{ color: "white" }} />
    //     )
    //   }
    // },
    // AccountSetting: {
    //   screen: AccountSetting,
    //   navigationOptions: {
    //     tabBarLabel: "Account Setting",
    //     // color:"#1A5CAD",
    //     //tabBarActiveTintColor
    //     tabBarIcon: ({ tintColor }) => (
    //       <Icon name="ios-home" size={20} style={{ color: "white" }} />
    //     )
    //   }
    // },
    // Help: {
    //   screen: Help,
    //   navigationOptions: {
    //     tabBarLabel: "Help",
    //     // color:"#1A5CAD",
    //     //tabBarActiveTintColor
    //     tabBarIcon: ({ tintColor }) => (
    //       <Icon name="ios-home" size={20} style={{ color: "white" }} />
    //     )
    //   }
    // }
  },
  {
    // tabBarOptions: {
    //   activeTintColor: "white",
    //   inactiveTintColor: 'white',
    //   style: {
    //     backgroundColor: 'red',
    //   },
    // },

    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);
