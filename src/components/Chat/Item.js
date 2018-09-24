import React from 'react';
import { View, Text } from 'react-native';
import { CardSection } from '../common';

export default ({ time, sender, message }) => {
  return (
    <View>
      <CardSection>
        <Text>{`Time: ${time}\nSender: ${sender}\nMessage: ${message}`}</Text>
      </CardSection>
    </View>
  );
};
