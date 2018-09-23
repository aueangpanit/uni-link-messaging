import firebase from 'firebase';

class FirebaseUtils {
  static getUsernameIndexRef = username =>
    firebase.database().ref(`/usernames/${username}`);

  static getUserUsernameRef = uid =>
    firebase.database().ref(`/users/${uid}/username`);

  static getUserVisibilityRef = uid =>
    firebase.database().ref(`/users/${uid}/visible`);

  static userExists = uid => {
    return firebase
      .database()
      .ref(`/users/${uid}/visible`)
      .once('value')
      .then(snapshot => {
        return snapshot.val() === true;
      });
  };

  static getUidFromUsername = username => {
    const usernameIndexRef = FirebaseUtils.getUsernameIndexRef(username);
    return usernameIndexRef.once('value').then(snapshot => snapshot.val());
  };
}

export { FirebaseUtils };
