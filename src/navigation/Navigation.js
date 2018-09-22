import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import {
  InitScreen,
  LoginScreen,
  SignupScreen,
  MessageListScreen,
  AddUserScreen,
  ProfileScreen
} from '../screens';

const Messages = createStackNavigator(
  { MessageList: MessageListScreen, AddUser: AddUserScreen },
  {
    initialRouteName: 'MessageList'
  }
);
const Profile = createStackNavigator({ Profile: ProfileScreen });

const AuthStack = createStackNavigator(
  { Login: LoginScreen, Signup: SignupScreen },
  { initialRouteName: 'Login' }
);
const AppStack = createBottomTabNavigator(
  { Messages, Profile },
  {
    initialRouteName: 'Messages'
  }
);

const Navigation = createSwitchNavigator(
  {
    Init: InitScreen,
    Auth: AuthStack,
    App: AppStack
  },
  {
    initialRouteName: 'Init'
  }
);

export { Navigation };
