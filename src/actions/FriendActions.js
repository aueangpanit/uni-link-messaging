import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

export const sendFriendRequest = ({ uid }) => async dispatch => {
  const currentUser = firebase.auth().currentUser;
  try {
    await firebase
      .database()
      .ref(`/users/${currentUser.uid}/friendRequest/`)
      .push({
        sender: currentUser.uid,
        receiver: uid
      });

    await firebase
      .database()
      .ref(`/users/${uid}/friendRequest/`)
      .push({
        sender: currentUser.uid,
        receiver: uid
      });

    dispatch(NavigationActions.navigate({ routeName: 'FriendList' }));
  } catch (error) {
    alert(error);
  }
};
