import firebase from 'firebase';

export const getUsernameIndexRef = username =>
  firebase.database().ref(`/usernames/${username}`);

export const getUserUsernameRef = uid =>
  firebase.database().ref(`users/${uid}/username`);

export const getUserFriendRequestRef = ({ senderId, receiverId }) =>
  firebase
    .database()
    .ref(`/users/${senderId}/friendRequest/${senderId}/${receiverId}`);

export const getReceiverFriendRequestRef = ({ senderId, receiverId }) =>
  firebase
    .database()
    .ref(`/users/${receiverId}/friendRequest/${senderId}/${receiverId}`);
