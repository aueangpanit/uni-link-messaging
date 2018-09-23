const admin = require('firebase-admin');
try {
  admin.initializeApp();
} catch (e) {
  console.log(e);
}

/**
 * Utils class.
 */
function Utils() {}

/**
 * Get uid or check if user exists.
 * @param {user} - uid or username
 * @return {String} - uid
 */
Utils.getUid = user => {
  return admin
    .database()
    .ref(`/users/${user}/visible`)
    .once('value')
    .then(snapshot => {
      if (snapshot.val()) {
        // user = uid
        return {
          val: () => {
            user;
          }
        };
      }
      return admin
        .database()
        .ref(`usernames/${user}`)
        .once('value');
    })
    .then(snapshot => {
      if (!snapshot.val()) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          'User does not exist',
          'User does not exist'
        );
      }

      return (user = snapshot.val()); // user = uid
    })
    .catch(error => {
      return error;
    });
};

Utils.getUsername = uid => {
  return admin
    .database()
    .ref(`/user/${uid}/username`)
    .once('value')
    .then(snapshot => {
      const username = snapshot.val();
      if (!username) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          'User does not exist',
          'User does not exist'
        );
      }

      return username;
    })
    .catch(error => error);
};

module.exports = Utils;
