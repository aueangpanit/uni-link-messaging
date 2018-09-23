import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

export const createChat = ({ value }) => async dispatch => {
  const receiverId = value;
  try {
    const dbChatsCreate = firebase.functions().httpsCallable('dbChatsCreate');
    const dbChatsUsersWrite = firebase
      .functions()
      .httpsCallable('dbChatsUsersWrite');
    const { data } = await dbChatsCreate({ receiverId: value });
    const chatId = data.success;
    if (!chatId) throw data;

    dispatch(NavigationActions.navigate({ routeName: 'MessageList' }));
  } catch (error) {
    console.log(error);
    alert(error.details);
  }
};

export const fetchChats = chatId => async dispatch => {};
