const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {
  admin.initializeApp();
} catch (e) {
  console.log(e);
}

module.exports = functions.database
  .ref('/users/{uid}/username')
  .onWrite((eventSnapshot, context) => {
    const { uid } = context.params;
    let username = eventSnapshot.after.val();

    if (username) {
      const ref = admin.database().ref(`/usernames/${username}`);
      ref.set(uid);
    } else {
      username = eventSnapshot.before.val();
      const ref = admin.database().ref(`/usernames/${username}`);
      ref.remove();
    }
  });
