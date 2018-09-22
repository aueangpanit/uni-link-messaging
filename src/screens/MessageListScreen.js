import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { InlineButton } from '../components/common';
import { MessageList } from '../components';

class MessageListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Messages',
    headerRight: (
      <InlineButton
        style={{ marginRight: 10 }}
        onPress={() => navigation.navigate('AddUser')}
      >
        <Icon name="person-add" size={25} />
      </InlineButton>
    )
  });

  render() {
    return <MessageList />;
  }
}

export { MessageListScreen };
