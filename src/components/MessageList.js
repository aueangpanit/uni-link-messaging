import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { fetchUser } from '../actions';

class MessageList extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <View>
        <Text>Message List</Text>
      </View>
    );
  }
}

MessageList = connect(
  null,
  { fetchUser }
)(MessageList);
export { MessageList };
