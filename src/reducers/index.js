import { combineReducers } from 'redux';
import NavReducer from './NavReducer';
import UserReducer from './UserReducer';
import ChatReducer from './ChatReducer';
import MessageReducer from './MessageReducer';

export default combineReducers({
  navigation: NavReducer,
  user: UserReducer,
  chat: ChatReducer,
  message: MessageReducer
});
