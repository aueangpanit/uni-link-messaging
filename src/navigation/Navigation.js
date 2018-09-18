import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { LoginScreen, SignupScreen, MessageListScreen } from '../screens';

const AuthStack = createStackNavigator(
  { Login: LoginScreen, Signup: SignupScreen },
  { initialRouteName: 'Login' }
);
const AppStack = createStackNavigator({ MessageList: MessageListScreen });

const Navigation = createSwitchNavigator({ Auth: AuthStack, App: AppStack });

export { Navigation };
