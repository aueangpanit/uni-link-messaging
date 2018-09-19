import { combineReducers } from 'redux';
import NavReducer from './NavReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  navigation: NavReducer,
  user: UserReducer
});
