// screens/GradeSelectionScreen.js
import React from 'react';
import { View, Button } from 'react-native';

export default function GradeSelectionScreen({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      {[7, 9, 12].map((grade) => (
        <Button
          key={grade}
          title={`Grade ${grade}`}
         onPress={() => navigation.navigate('SubjectSelection', { grade })}
        />
      ))}

      <Button
  title="View My Scores"
  onPress={() => navigation.navigate('MyScores')}
/>

<Button
  title="Buy New Quizzes"
  onPress={() => navigation.navigate('Store')}
/>

    </View>
  );
}