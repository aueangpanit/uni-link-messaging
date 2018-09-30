import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import { CLEAR_CHAT } from './types';

export const createChat = ({ value }) => async dispatch => {
  const receiverId = value;
  dispatch({ type: CLEAR_CHAT });
  try {
    const dbChatsCreate = firebase.functions().httpsCallable('dbChatsCreate');
    const { data } = await dbChatsCreate({ receiverId: value });
    if (!data.success) throw data;
    dispatch(NavigationActions.navigate({ routeName: 'MessageList' }));
  } catch (error) {
    console.log(error);
    alert(error.details);
  }
};
