const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {
  admin.initializeApp();
} catch (e) {
  console.log(e);
}

module.exports = functions.database
  .ref('/users/:uid/username')
  .onWrite((eventSnapshot, context) => {
    const { uid } = admin.database().ref(`/usernames/`);
  });
