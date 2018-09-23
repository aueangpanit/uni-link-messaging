import { FETCH_USER_SUCCESS, FETCH_CHAT_SUCCESS } from './types';
import firebase from 'firebase';

export const fetchUser = () => dispatch => {
  const { currentUser } = firebase.auth();

  firebase
    .database()
    .ref(`/users/${currentUser.uid}/chats`)
    .on('child_added', snapshot => {
      const chatId = snapshot.key;
      firebase
        .database()
        .ref(`/chats/${chatId}`)
        .on('value', snapshot => {
          dispatch({
            type: FETCH_CHAT_SUCCESS,
            payload: { chatId, chat: snapshot.val() }
          });
        });
    });
};
