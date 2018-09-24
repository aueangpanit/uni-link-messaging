import firebase from 'firebase';
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import {
  Card,
  CardSection,
  Input,
  Button,
  Spinner,
  InlineButton
} from './common';

class LoginForm extends Component {
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
      await firebase.auth().signInWithEmailAndPassword(email.trim(), password);
      this.onLoginSuccess();
    } catch (error) {
      this.onLoginFail();
    }
  }

  onLoginSuccess() {
    this.props.navigation.navigate('App');
  }

  onLoginFail() {
    this.setState({
      password: '',
      error: 'Authentication failed',
      loading: false
    });
  }

  renderButton() {
    const { loading } = this.state;

    if (loading) return <Spinner size="small" />;
    return <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>;
  }

  renderError() {
    const { errorTextStyle } = styles;
    const { error } = this.state;

    if (error) return <Text style={errorTextStyle}>{error}</Text>;
  }

  render() {
    const { separator } = styles;
    const { email, password } = this.state;
    const { navigation } = this.props;

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
        <CardSection style={separator}>
          <Text>Don't already have an account?</Text>
          <InlineButton onPress={() => navigation.navigate('Signup')}>
            Sign up
          </InlineButton>
        </CardSection>
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

LoginForm = withNavigation(LoginForm);
export { LoginForm };
