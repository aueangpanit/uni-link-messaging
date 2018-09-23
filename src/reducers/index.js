import { combineReducers } from 'redux';
import NavReducer from './NavReducer';
import UserReducer from './UserReducer';
import ChatReducer from './ChatReducer';

export default combineReducers({
  navigation: NavReducer,
  user: UserReducer,
  chat: ChatReducer
});
