import { FETCH_MESSAGE_SUCCESS, CLEAR_MESSAGE } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAR_MESSAGE:
      return {};
    case FETCH_MESSAGE_SUCCESS:
      const messageObj = {};
      messageObj[action.payload.messageId] = action.payload.message;
      return { ...messageObj, ...state };
    default:
      return state;
  }
};
