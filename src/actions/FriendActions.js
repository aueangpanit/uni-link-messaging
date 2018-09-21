import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import { FirebaseUtils } from '../utils';

export const sendFriendRequest = ({ value }) => async dispatch => {
  console.log('value: ' + value);
  const senderId = firebase.auth().currentUser.uid;
  const receiverId = (await FirebaseUtils.userExists(value))
    ? value
    : await FirebaseUtils.getUidFromUsername(value);
  try {
    if (!receiverId) throw new Error('User does not exist.');
    const userFriendRequestRef = FirebaseUtils.getUserFriendRequestRef({
      senderId,
      receiverId
    });
    await userFriendRequestRef.set(true);

    const receiverFriendRequestRef = FirebaseUtils.getReceiverFriendRequestRef({
      senderId,
      receiverId
    });
    await receiverFriendRequestRef.set(true);

    dispatch(NavigationActions.navigate({ routeName: 'FriendList' }));
  } catch (error) {
    alert(error);
  }
};
