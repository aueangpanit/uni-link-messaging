import { FETCH_USER_SUCCESS } from './types';
import firebase from 'firebase';

export const fetchUser = () => dispatch => {
  const { currentUser } = firebase.auth();

  firebase
    .database()
    .ref(`/users/${currentUser.uid}`)
    .on('value', snapshot => {
      dispatch({ type: FETCH_USER_SUCCESS, payload: snapshot.val() });
    });
};
