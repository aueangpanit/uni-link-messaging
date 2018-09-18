import React, { Component } from 'react';
import { LoginForm } from '../components';

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login'
  };

  render() {
    return <LoginForm />;
  }
}

export { LoginScreen };
