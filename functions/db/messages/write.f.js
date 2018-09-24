const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {
  admin.initializeApp();
} catch (e) {
  console.log(e);
}
const Utils = require('../../utils');

module.exports = functions.https.onCall((data, context) => {
  if (!context.auth) {
    return new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.',
      'The function must be called while authenticated.'
    );
  }
  const { uid } = context.auth;
  const { chatId, message } = data;
  if (typeof message !== 'string' || message.length === 0) {
    return new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with "data" argument containing "userId" of type string',
      'The function must be called with "data" argument containing "userId" of type string'
    );
  }
  if (typeof chatId !== 'string' || chatId.length === 0) {
    return new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with "data" argument containing "chatId" of type string',
      'The function must be called with "data" argument containing "chatId" of type string'
    );
  }

  return Utils.getUsername(uid)
    .then(username => {
      const messageKey = Date.now();

      return admin
        .database()
        .ref(`/messages/${chatId}/${messageKey}`)
        .set({
          name: username,
          message: message
        });
    })
    .then(() => {
      return { success: 'Message successfully sent.' };
    })
    .catch(error => error);
});
