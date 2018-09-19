import firebase from 'firebase';
import React, { Component } from 'react';
import { Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Card, CardSection, Button } from './common';

class Profile extends Component {
  async onButtonPress() {
    await firebase.auth().signOut();
    this.props.navigation.navigate({ routeName: 'Auth' });
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Text>{firebase.auth().currentUser.email}</Text>
        </CardSection>
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Log out</Button>
        </CardSection>
      </Card>
    );
  }
}

Profile = withNavigation(Profile);
export { Profile };
