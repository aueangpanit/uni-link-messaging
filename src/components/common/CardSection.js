import React from 'react';
import { View } from 'react-native';

const CardSection = ({ children, style }) => {
  return <View style={[styles.containerSyle, style]}>{children}</View>;
};

const styles = {
  containerSyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSection };
