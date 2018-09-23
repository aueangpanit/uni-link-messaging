import firebase from 'firebase';
import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { CardSection } from '../common';

class ListItem extends Component {
  render() {
    const { id, title } = this.props;

    return (
      <View>
        <CardSection>
          <Text style={styles.titleStyle}>{title}</Text>
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
