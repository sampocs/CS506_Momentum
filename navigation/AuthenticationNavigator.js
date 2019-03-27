import { createStackNavigator } from 'react-navigation'
import AuthenticationHomeScreen from '../screens/AuthenticationHomeScreen'
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'


export default createStackNavigator({
    AuthHome: AuthenticationHomeScreen,
    Login: LoginScreen,
    SignUp: SignUpScreen,
});