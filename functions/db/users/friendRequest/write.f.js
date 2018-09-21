const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {
  admin.initializeApp();
} catch (e) {
  console.log(e);
}

module.exports = functions.https.onCall((data, context) => {
  const { senderId } = data;
  let { receiverId } = data; // can be either receiver's uid or receiver's username.
  if (typeof senderId !== 'string' || senderId.length === 0) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      '"senderId" must be of type string.',
      '"senderId" must be of type string.'
    );
  }
  if (typeof receiverId !== 'string' || receiverId.length === 0) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      '"receiverId" must be of type string.',
      '"receiverId" must be of type string.'
    );
  }
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.',
      'The function must be called while authenticated.'
    );
  }
  const { uid } = context.auth;
  if (senderId !== uid) {
    return new functions.https.HttpsError(
      'invalid-argument',
      'The person currently logged in must be the sender.',
      'The person currently logged in must be the sender.'
    );
  }

  // check if receiver exists
  const usersReceiverRef = admin.database().ref(`/users/${receiverId}/visible`);
  return usersReceiverRef
    .once('value')
    .then(snapshot => {
      if (snapshot.val() !== true) {
        // receiverId must either be username or user does not exist
        const usernameReceiverRef = admin
          .database()
          .ref(`/usernames/${receiverId}`);
        return usernameReceiverRef.once('value');
      }
      return { val: () => receiverId };
    })
    .then(snapshot => {
      receiverId = snapshot.val();
      if (!receiverId) {
        throw new functions.https.HttpsError(
          'not-found',
          'No user found.',
          'No user found.'
        );
      }
      return;
    })
    .then(() => {
      // We can now be sure that receiverId is the id of the receiver and that
      // receiver exists.
      if (senderId === receiverId) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          "You are already you own friend! You can't send youself a friend request.",
          "You are already you own friend! You can't send youself a friend request."
        );
      }

      // Update friendRequest.
      const ref = admin
        .database()
        .ref(`/users/${uid}/friendRequest/${senderId}/${receiverId}`);
      return ref.set(true).then(() => ({ success: 'Friend request updated.' }));
    })
    .catch(error => {
      return error;
    });
});
