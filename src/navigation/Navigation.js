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
  FriendListScreen,
  ProfileScreen
} from '../screens';

const Messages = createStackNavigator(
  { MessageList: MessageListScreen },
  {
    initialRouteName: 'MessageList'
  }
);
const Friends = createStackNavigator(
  { FriendList: FriendListScreen, AddUser: AddUserScreen },
  { initialRouteName: 'FriendList' }
);
const Profile = createStackNavigator({ Profile: ProfileScreen });

const AuthStack = createStackNavigator(
  { Login: LoginScreen, Signup: SignupScreen },
  { initialRouteName: 'Login' }
);
const AppStack = createBottomTabNavigator(
  { Messages, Friends, Profile },
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
