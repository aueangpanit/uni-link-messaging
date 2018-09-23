const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {
  admin.initializeApp();
} catch (e) {
  console.log(e);
}
const Utils = require('../../../utils');

module.exports = functions.https.onCall((data, context) => {
  const { user, chatId } = data;
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.',
      'The function must be called while authenticated.'
    );
  }
  if (typeof user !== 'string' || user.length === 0) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with "data" argument containing "userId" of type string',
      'The function must be called with "data" argument containing "userId" of type string'
    );
  }
  if (typeof chatId !== 'string' || chatId.length === 0) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with "data" argument containing "chatId" of type string',
      'The function must be called with "data" argument containing "chatId" of type string'
    );
  }

  return admin
    .database()
    .ref(`/chats/${chatId}`)
    .once('value')
    .then(snapshot => {
      if (!snapshot.val()) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          'Chat does not exists.',
          'Chat does not exists.'
        );
      }

      return Utils.getUid(user);
    })
    .then(uid => {
      return admin
        .database()
        .ref(`/chats/${chatId}/users/${uid}`)
        .set(true);
    })
    .then(() => {
      return { success: 'Successfully added user to chat.' };
    })
    .catch(error => error);
});
