import React, { Component } from 'react';
import { Profile } from '../components';

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile'
  };

  render() {
    return <Profile />;
  }
}

export { ProfileScreen };
