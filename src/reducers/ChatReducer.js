import { FETCH_CHAT_SUCCESS, DELETE_CHAT_SUCCESS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CHAT_SUCCESS:
      let chatObj = {};
      chatObj[action.payload.chatId] = action.payload.chat;
      return { ...state, ...chatObj };
    case DELETE_CHAT_SUCCESS:
      let clone = Object.assign({}, state);
      delete clone[action.payload];
      return clone;
    default:
      return state;
  }
};
