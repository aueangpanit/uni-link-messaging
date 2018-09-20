import { FETCH_USER_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  friendRequest: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      // action.payload = null or action.payload = user object from realtime database
      return action.payload || INITIAL_STATE;
    default:
      return state;
  }
};
