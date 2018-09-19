import firebase from 'firebase';
import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { CardSection } from '../common';

class ListItem extends Component {
  render() {
    const { currentUser } = firebase.auth();
    const { sender, receiver } = this.props.request;
    return (
      <View>
        <CardSection>
          <Text
            style={styles.titleStyle}
          >{`sender: ${sender}\nreceiver: ${receiver}`}</Text>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default withNavigation(ListItem);
