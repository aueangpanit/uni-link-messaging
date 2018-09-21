import firebase from 'firebase';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { sendFriendRequest } from '../actions';

class AddUser extends Component {
  state = {
    value: '',
    error: '',
    loading: false
  };

  validate() {
    const { value } = this.state;
    const currentUser = firebase.auth().currentUser;
    let error = '';

    if (currentUser.uid === value) {
      error = "You can't send yourself a friend request!";
    }

    this.setState({ error });
    return error;
  }

  onButtonPress() {
    const error = this.validate();
    const { value, loading } = this.state;
    const { sendFriendRequest } = this.props;

    if (!error && !loading) {
      sendFriendRequest({ value });
    }
  }

  renderButton() {
    const { loading } = this.state;

    if (loading) return <Spinner size="small" />;
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Send friend request
      </Button>
    );
  }

  render() {
    const { value } = this.state;

    return (
      <Card>
        <CardSection>
          <Input
            placeholder="OoDU2lR4xgdt2WAHdDiWppxLNsm1"
            label="uid"
            value={value}
            onChangeText={value => this.setState({ value })}
          />
        </CardSection>
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

AddUser = connect(
  null,
  { sendFriendRequest }
)(AddUser);
export { AddUser };
