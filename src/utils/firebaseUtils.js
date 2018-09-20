import firebase from 'firebase';

export const getUsernameIndexRef = username => {
  return firebase.database().ref(`/usernames/${username}`);
};

export const getUserUsernameRef = uid => {
  return firebase.database().ref(`users/${uid}/username`);
};
