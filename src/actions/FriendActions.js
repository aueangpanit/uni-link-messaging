import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

export const sendFriendRequest = ({ value }) => async dispatch => {
  const senderId = firebase.auth().currentUser.uid;
  const receiverId = value;
  try {
    const dbUsersFriendRequestWrite = firebase
      .functions()
      .httpsCallable('dbUsersFriendRequestWrite');
    const { data } = await dbUsersFriendRequestWrite({ senderId, receiverId });
    if (!data.success) throw data;

    dispatch(NavigationActions.navigate({ routeName: 'FriendList' }));
  } catch (error) {
    console.log(error);
    alert(error.details);
  }
};
