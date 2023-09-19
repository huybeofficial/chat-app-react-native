import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import StartScreen from './screens/StartScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';

const StackNavigator = createStackNavigator({
  StartScreen: {
    screen: StartScreen,
  },
  LoginScreen: {
    screen: LoginScreen
  },
  RegisterScreen: {
    screen: RegisterScreen
  },
  WelcomeScreen: {
    screen: WelcomeScreen
  },
  HomeScreen: {
    screen: HomeScreen
  },
}, {
  initialRouteName: "WelcomeScreen",
  defaultNavigationOptions: { headerShown: false },
})


export default createAppContainer(StackNavigator)