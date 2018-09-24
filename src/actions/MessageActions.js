import firebase from 'firebase';
import { FETCH_MESSAGE_SUCCESS } from './types';

export const fetchMessage = ({ chatId }) => async dispatch => {
  firebase
    .database()
    .ref(`/messages/${chatId}`)
    .on('child_added', snapshot => {
      dispatch({
        type: FETCH_MESSAGE_SUCCESS,
        payload: { messageId: snapshot.key, message: snapshot.val() }
      });
    });
};
