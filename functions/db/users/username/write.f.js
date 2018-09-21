const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {
  admin.initializeApp();
} catch (e) {
  console.log(e);
}

module.exports = functions.https.onCall((data, context) => {
  const { username } = data;
  if (typeof username !== 'string' || username.length === 0) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with "data" argument containing "username" of type string.',
      'The function must be called with "data" argument containing "username" of type string.'
    );
  }
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.',
      'The function must be called while authenticated.'
    );
  }

  // Check if username already exists.
  return admin
    .database()
    .ref(`/username/${username}`)
    .once('value')
    .then(snapshot => {
      if (snapshot.val()) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          'This username already exist',
          'This username already exist'
        );
      }

      const { uid } = context.auth;
      return admin
        .database()
        .ref(`/users/${uid}/username`)
        .set(username)
        .then(() => ({ success: 'Username updated successfully.' }));
    })
    .catch(error => {
      return error;
    });
});
