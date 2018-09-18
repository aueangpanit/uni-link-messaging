import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { LoginScreen, MessageListScreen } from '../screens';

const AuthStack = createStackNavigator({ Login: LoginScreen });
const AppStack = createStackNavigator({ MessageList: MessageListScreen });

const Navigation = createSwitchNavigator({ Auth: AuthStack, App: AppStack });

export { Navigation };
