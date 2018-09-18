import firebase from 'firebase';
import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import { navMiddleware, NavigationWithState } from './src/navigation';

class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCJxlEiLzF-nZ1EXi_zrg6tv1xzqDRge8c',
      authDomain: 'uni-link-messaging-eba97.firebaseapp.com',
      databaseURL: 'https://uni-link-messaging-eba97.firebaseio.com',
      projectId: 'uni-link-messaging-eba97',
      storageBucket: 'uni-link-messaging-eba97.appspot.com',
      messagingSenderId: '970521514552'
    });
  }

  render() {
    const store = createStore(
      reducers,
      {},
      applyMiddleware(ReduxThunk, navMiddleware)
    );

    return (
      <Provider store={store}>
        <NavigationWithState />
      </Provider>
    );
  }
}

export default App;
