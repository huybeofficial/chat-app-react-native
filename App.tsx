import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import RegisterScreen from './screens/RegisterScreen'
import WelcomeScreen from'./screens/WelcomeScreen'
import LoginScreen from'./screens/LoginScreen'

const StackNavigator = createStackNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen
  },
  LoginScreen: {
    screen: LoginScreen
  },
  RegisterScreen: {
    screen: RegisterScreen
  }
}, {
  initialRouteName: "LoginScreen"
})

 
export default createAppContainer(StackNavigator)