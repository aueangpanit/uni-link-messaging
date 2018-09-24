import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { CardSection } from '../common';

class ListItem extends Component {
  render() {
    const { id, title, navigation } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('Chat', { chatId: id })}
      >
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>{title}</Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
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
