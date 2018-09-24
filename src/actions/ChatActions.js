import firebase from 'firebase';
import 'firebase/functions';
import { NavigationActions } from 'react-navigation';

export const createChat = ({ value }) => async dispatch => {
  const receiverId = value;
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
export const sendMessage = ({ chatId, message }) => async dispatch => {
  try {
    const dbMessagesWrite = firebase
      .functions()
      .httpsCallable('dbMessagesWrite');
    const { data } = await dbMessagesWrite({ chatId, message });
    if (!data.success) throw data;
  } catch (error) {
    alert(error.details);
  }
};

export const fetchMessage = ({ chatId }) => async dispatch => {};
