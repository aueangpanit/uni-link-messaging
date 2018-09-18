import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const InlineButton = ({ onPress, children, style }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity style={[buttonStyle, style]} onPress={onPress}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    color: '#007aff',
    fontWeight: '600'
  },
  buttonStyle: { paddingLeft: 5, paddingRight: 5 }
};

export { InlineButton };
