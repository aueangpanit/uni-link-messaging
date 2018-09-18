import React, { Component } from 'react';
import { SignupForm } from '../components';

class SignupScreen extends Component {
  static navigationOptions = {
    title: 'Signup'
  };

  render() {
    return <SignupForm />;
  }
}

export { SignupScreen };
