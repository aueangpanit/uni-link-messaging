import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import { getUserFriendRequestRef, getReceiverFriendRequestRef } from '../utils';

export const sendFriendRequest = ({ uid }) => async dispatch => {
  const currentUser = firebase.auth().currentUser;
  try {
    const userFriendRequestRef = getUserFriendRequestRef({
      senderId: currentUser.uid,
      receiverId: uid
    });
    await userFriendRequestRef.set(true);

    const receiverFriendRequestRef = getReceiverFriendRequestRef({
      senderId: currentUser.uid,
      receiverId: uid
    });
    await receiverFriendRequestRef.set(true);

    dispatch(NavigationActions.navigate({ routeName: 'FriendList' }));
  } catch (error) {
    alert(error);
  }
};
