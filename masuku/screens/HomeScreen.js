import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={[ styles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={{ fontSize: 24 }}>🏠 Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    // bottom: 20,
    backgroundColor: '#f4f3ee'
  }
});
