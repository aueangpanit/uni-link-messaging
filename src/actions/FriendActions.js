import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

export const sendFriendRequest = ({ uid }) => async dispatch => {
  const currentUser = firebase.auth().currentUser;
  try {
    await firebase
      .database()
      .ref(`/users/${currentUser.uid}/friendRequest/${currentUser.uid}/${uid}`)
      .set(true);

    await firebase
      .database()
      .ref(`/users/${uid}/friendRequest/${currentUser.uid}/${uid}`)
      .set(true);

    dispatch(NavigationActions.navigate({ routeName: 'FriendList' }));
  } catch (error) {
    alert(error);
  }
};
