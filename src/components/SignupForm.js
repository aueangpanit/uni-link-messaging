import firebase from 'firebase';
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { getUsernameIndexRef, getUserUsernameRef } from '../utils';

class SignupForm extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    error: '',
    loading: false
  };

  async validate() {
    const { username } = this.state;
    let error = '';
    // check if username already exists
    const usernameIndexRef = getUsernameIndexRef(username);
    const snapshot = await usernameIndexRef.once('value');
    if (snapshot.val()) {
      error = 'Username already exists.';
    }

    this.setState({ error });
    return error;
  }

  async createUser() {
    const { email, password, username } = this.state;
    // create user
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email.trim(), password);
    const { uid } = firebase.auth().currentUser; // get current user
    // create username index
    const usernameIndexRef = getUsernameIndexRef(username);
    await usernameIndexRef.set(uid);
    // set username field in user's tree
    const userUsernameRef = getUserUsernameRef(uid);
    await userUsernameRef.set(username);
  }

  async onButtonPress() {
    this.setState({ loading: true });
    const error = await this.validate();

    if (!error) {
      try {
        await this.createUser();
        this.onSignupSuccess();
      } catch (error) {
        this.onSignupFail(error);
      }
    } else {
      this.onSignupFail(error);
    }
  }

  onSignupSuccess() {
    this.setState({ error: '', loading: false, email: '', password: '' });
    this.props.navigation.navigate('App');
  }

  onSignupFail(error) {
    this.setState({
      password: '',
      error,
      loading: false
    });
  }

  renderButton() {
    const { loading } = this.state;

    if (loading) return <Spinner size="small" />;
    return <Button onPress={this.onButtonPress.bind(this)}>Signup</Button>;
  }

  renderError() {
    const { errorTextStyle } = styles;
    const { error } = this.state;

    if (error) return <Text style={errorTextStyle}>{error.toString()}</Text>;
  }

  render() {
    const { email, password, username } = this.state;

    return (
      <Card>
        <CardSection>
          <Input
            placeholder="username"
            label="Username"
            value={username}
            onChangeText={username => this.setState({ username })}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder="user@gmail.com"
            label="Email"
            value={email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder="password"
            label="Password"
            value={password}
            onChangeText={password => this.setState({ password })}
            secureTextEntry
          />
        </CardSection>
        {this.renderError()}
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  separator: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export { SignupForm };
