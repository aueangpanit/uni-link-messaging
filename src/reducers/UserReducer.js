import { FETCH_USER_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  friendRequest: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
