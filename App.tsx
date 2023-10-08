import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import HomeTabs from './screens/HomeTabs';


const StackNavigator = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen
  },
  RegisterScreen: {
    screen: RegisterScreen
  },
  HomeTabs: {
    screen: HomeTabs
  },
}, {
  initialRouteName: "LoginScreen",
  defaultNavigationOptions: { headerShown: false },
  detachInactiveScreens: true,


})


export default createAppContainer(StackNavigator)
