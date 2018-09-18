import firebase from 'firebase';
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';

class SignupForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  };

  async onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email.trim(), password);
      this.onSignupSuccess();
    } catch (error) {
      this.onSignupFail(error);
    }
  }

  onSignupSuccess() {
    this.setState({ error: '', loading: false, email: '', password: '' });
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
    const { email, password } = this.state;

    return (
      <Card>
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
