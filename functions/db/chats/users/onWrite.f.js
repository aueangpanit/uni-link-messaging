const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {
  admin.initializeApp();
} catch (e) {
  console.log(e);
}

module.exports = functions.database
  .ref('/chats/{chatId}/users/{uid}')
  .onWrite((eventSnapshot, context) => {
    const { chatId, uid } = context.params;
    const value = eventSnapshot.after.val();

    if (value) {
      // being created or updated
      admin
        .database()
        .ref(`/users/${uid}/chats/${chatId}`)
        .set(true);
    } else {
      // being deleted
      admin
        .database()
        .ref(`/users/${uid}/chats/${chatId}`)
        .remove();
    }
  });
