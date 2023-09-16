import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import StartScreen from './screens/StartScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const StackNavigator = createStackNavigator({
  StartScreen: {
    screen: StartScreen
  },
  LoginScreen: {
    screen: LoginScreen
  },
  RegisterScreen: {
    screen: RegisterScreen
  }
}, {
  initialRouteName: "StartScreen"
})


export default createAppContainer(StackNavigator)