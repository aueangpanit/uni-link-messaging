const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {
  admin.initializeApp();
} catch (e) {
  console.log(e);
}

module.exports = functions.database
  .ref('/usernames/{username}')
  .onWrite((eventSnapshot, context) => {
    const { username } = context.params;
    let uid = eventSnapshot.after.val();

    if (uid) {
      const ref = admin.database().ref(`/users/${uid}/username`);
      ref.set(username);
    } else {
      uid = eventSnapshot.before.val();
      const ref = admin.database().ref(`/users/${uid}/username`);
      ref.remove();
    }
  });
