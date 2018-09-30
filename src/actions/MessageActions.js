import firebase from 'firebase';
import { FETCH_MESSAGE_SUCCESS, CLEAR_MESSAGE } from './types';

export const fetchMessage = chatId => dispatch => {
  dispatch({ type: CLEAR_MESSAGE });

  firebase
    .database()
    .ref(`/messages/${chatId}`)
    .limitToLast(20)
    .on('child_added', snapshot => {
      dispatch({
        type: FETCH_MESSAGE_SUCCESS,
        payload: { messageId: snapshot.key, message: snapshot.val() }
      });
    });
};

export const stopFetchingMessage = chatId => dispatch => {
  firebase
    .database()
    .ref(`/messages/${chatId}`)
    .off();
};
