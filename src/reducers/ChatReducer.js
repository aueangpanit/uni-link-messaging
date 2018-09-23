import { FETCH_CHAT_SUCCESS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CHAT_SUCCESS:
      let chatObj = {};
      chatObj[action.payload.chatId] = action.payload.chat;
      return { ...state, ...chatObj };
    default:
      return state;
  }
};
