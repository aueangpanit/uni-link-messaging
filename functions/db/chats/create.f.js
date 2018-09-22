const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {
  admin.initializeApp();
} catch (e) {
  console.log(e);
}

module.exports = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.',
      'The function must be called while authenticated.'
    );
  }

  const { uid } = context.auth;

  let userObj = {};
  userObj[uid] = true;
  const { key } = admin
    .database()
    .ref('/chats')
    .push({
      users: userObj
    });

  return admin
    .database()
    .ref(`/users/${uid}/chats/${key}`)
    .set(true)
    .then(() => {
      return { success: 'Successfully created new chat.' };
    })
    .catch(error => error);
});
