import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

class InitScreen extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) this.props.navigation.navigate('App');
      else this.props.navigation.navigate('Auth');
    });
  }

  render() {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
}

export { InitScreen };
