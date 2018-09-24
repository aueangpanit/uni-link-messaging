import { FETCH_MESSAGE_SUCCESS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_MESSAGE_SUCCESS:
      const messageObj = {};
      messageObj[action.payload.messageId] = action.payload.message;
      return { ...state, ...messageObj };
    default:
      return state;
  }
};
