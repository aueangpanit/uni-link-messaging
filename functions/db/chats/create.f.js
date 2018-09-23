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
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.',
      'The function must be called while authenticated.'
    );
  }

  const { uid } = context.auth;
  const { receiverId } = data;
  let key;

  return Utils.getUid(receiverId)
    .then(receiverId => {
      let userObj = {};
      userObj[uid] = true;
      userObj[receiverId] = true;
      const chatRef = admin
        .database()
        .ref('/chats')
        .push({
          users: userObj
        });
      key = chatRef.key;

      return admin
        .database()
        .ref(`/users/${receiverId}/chats/${key}`)
        .set(true);
    })
    .then(() => {
      return admin
        .database()
        .ref(`/users/${uid}/chats/${key}`)
        .set(true);
    })
    .then(() => {
      return { success: 'Chat successfully created.' };
    })
    .catch(error => error);
});
