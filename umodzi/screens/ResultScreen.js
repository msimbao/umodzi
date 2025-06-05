// screens/ResultScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ResultScreen({ route, navigation }) {
  const { score, total } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text>Your Score: {score} / {total}</Text>
      <Button title="Back to Grades" onPress={() => navigation.popToTop()} />
    </View>
  );
}
