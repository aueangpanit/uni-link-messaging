import firebase from 'firebase';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { sendFriendRequest } from '../actions';

class AddUser extends Component {
  state = {
    uid: '',
    error: '',
    loading: false
  };

  validate() {
    const { uid } = this.state;
    const currentUser = firebase.auth().currentUser;
    let error = '';

    if (currentUser.uid === uid) {
      error = "You can't send yourself a friend request!";
    }

    this.setState({ error });
    return error;
  }

  onButtonPress() {
    const error = this.validate();
    const { uid, loading } = this.state;
    const { sendFriendRequest } = this.props;

    if (!error && !loading) {
      sendFriendRequest({ uid });
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
    const { uid } = this.state;

    return (
      <Card>
        <CardSection>
          <Input
            placeholder="OoDU2lR4xgdt2WAHdDiWppxLNsm1"
            label="uid"
            value={uid}
            onChangeText={uid => this.setState({ uid })}
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
