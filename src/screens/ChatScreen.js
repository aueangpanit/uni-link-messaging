import React, { Component } from 'react';
import { Chat } from '../components';

class ChatScreen extends Component {
  static navigationOptions = {
    title: 'Chat'
  };

  render() {
    return <Chat />;
  }
}

export { ChatScreen };
