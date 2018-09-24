import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Input, Button, Card, CardSection } from '../common';
import { connect } from 'react-redux';
import { sendMessage } from '../../actions';
import { View, Text } from 'react-native';

class Chat extends Component {
  state = {
    message: ''
  };

  sendMessage() {
    const chatId = this.props.navigation.getParam('chatId');
    const { message } = this.state;
    const { sendMessage } = this.props;

    sendMessage({ chatId, message });
  }

  render() {
    const id = this.props.navigation.getParam('chatId');
    const { message } = this.state;

    return (
      <Card>
        <CardSection>
          <Text>Chat Page: {id}</Text>
        </CardSection>
        <CardSection>
          <Input
            label="Message:"
            placeholder="message"
            value={message}
            onChangeText={message => this.setState({ message })}
          />
        </CardSection>
        <CardSection>
          <Button onPress={this.sendMessage.bind(this)}>Send</Button>
        </CardSection>
      </Card>
    );
  }
}

Chat = connect(
  null,
  { sendMessage }
)(Chat);
Chat = withNavigation(Chat);
export { Chat };
