import React from 'react';
import { View, Button, Text } from 'react-native';
import { saveQuizzesToLocal } from '@/utils/QuizStore';
import quizzesData from '@/data/quizzes.json'; // Adjust if importing fails in Expo

export default function StoreScreen() {
  const downloadQuizzes = async () => {
    await saveQuizzesToLocal(quizzesData);
    alert("Quizzes downloaded!");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Offline Quiz Store</Text>
      <Button title="Download Quizzes" onPress={downloadQuizzes} />
    </View>
  );
}
