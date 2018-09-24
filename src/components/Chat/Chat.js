import _ from 'lodash';
import firebase from 'firebase';
import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Input, Button, Card, CardSection, Spinner } from '../common';
import { connect } from 'react-redux';
import { fetchMessage } from '../../actions';
import { FlatList, View, Text } from 'react-native';
import Item from './Item';

class Chat extends Component {
  state = {
    loading: false,
    message: ''
  };

  componentWillMount() {
    const { fetchMessage } = this.props;
    const chatId = this.props.navigation.getParam('chatId');
    fetchMessage({ chatId });
  }

  async sendMessage() {
    const chatId = this.props.navigation.getParam('chatId');
    const { message } = this.state;

    this.setState({ loading: true, message: '' });
    try {
      const dbMessagesWrite = firebase
        .functions()
        .httpsCallable('dbMessagesWrite');
      const { data } = await dbMessagesWrite({ chatId, message });

      if (!data.success) throw data;

      this.setState({ loading: false });
    } catch (error) {
      alert(error.details);
    }
  }

  keyExtractor = (item, index) => item.time;

  renderItem({ item }) {
    return (
      <Item time={item.time} sender={item.sender} message={item.message} />
    );
  }

  renderSendButton() {
    const { loading } = this.state;

    if (loading) {
      return <Spinner size="small" />;
    }

    return <Button onPress={this.sendMessage.bind(this)}>Send</Button>;
  }

  render() {
    const id = this.props.navigation.getParam('chatId');
    const { message } = this.state;

    return (
      <React.Fragment>
        <FlatList
          data={this.props.messages}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
        <View>
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
          <CardSection>{this.renderSendButton()}</CardSection>
        </View>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { message } = state;

  const messages = _.map(message, (value, time) => {
    return { time, sender: value.name, message: value.message };
  });

  return { messages };
};

Chat = connect(
  mapStateToProps,
  { fetchMessage }
)(Chat);
Chat = withNavigation(Chat);
export { Chat };
