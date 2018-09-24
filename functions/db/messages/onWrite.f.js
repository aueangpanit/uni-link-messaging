const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {
  admin.initializeApp();
} catch (e) {
  console.log(e);
}

module.exports = functions.database
  .ref('/messages/{chatId}/{messageId}')
  .onWrite((eventSnapshot, context) => {
    const { chatId } = context.params;
    let value = eventSnapshot.after.val();

    if (value) {
      // being created or updated
      admin
        .database()
        .ref(`/chats/${chatId}/lastMessage`)
        .set(value);
    }
  });
