import firebase from 'firebase';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { createChat } from '../actions';

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
      error = "You can't add yourself!";
    }

    this.setState({ error });
    return error;
  }

  onButtonPress() {
    const error = this.validate();
    const { value, loading } = this.state;
    const { createChat } = this.props;

    if (!error && !loading) {
      createChat({ value });
    }
  }

  renderButton() {
    const { loading } = this.state;

    if (loading) return <Spinner size="small" />;
    return <Button onPress={this.onButtonPress.bind(this)}>Add User</Button>;
  }

  render() {
    const { value } = this.state;

    return (
      <Card>
        <CardSection>
          <Input
            placeholder="username"
            label="username"
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
  { createChat }
)(AddUser);
export { AddUser };
