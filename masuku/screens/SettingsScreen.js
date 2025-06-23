import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({ navigation }) {
  const resetIntro = async () => {
    await AsyncStorage.removeItem('hasSeenIntro');
    Alert.alert('Intro Reset', 'The intro will be shown again next time.');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Intro' }],
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>⚙️ Settings</Text>
      <Button title="Reset Intro" onPress={resetIntro} />
    </View>
  );
}
