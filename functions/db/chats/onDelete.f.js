const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {
  admin.initializeApp();
} catch (e) {
  console.log(e);
}

module.exports = functions.database
  .ref('/chats/{chatId}')
  .onDelete((eventSnapshot, context) => {
    const { chatId } = context.params;

    admin
      .database()
      .ref(`/messages/${chatId}`)
      .remove();
  });
