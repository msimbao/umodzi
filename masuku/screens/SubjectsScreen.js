// screens/SubjectSelectionScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getLocalQuizzes } from '@/utils/QuizStore';

export default function SubjectsScreen({ navigation }) {
  // const { grade } = route.params;
  const grade = 7
  const [quizzes, setQuizzes] = useState([]);


useEffect(() => {
      (async () => {
        const data = await getLocalQuizzes();
        const filtered = data.filter(q => q.grade === grade);
        const uniqueSubjects = [
      ...new Set(filtered.map((q) => q.subject))].sort();
        setQuizzes(uniqueSubjects);
      })();
    }, [grade]);
const subjects = ['Mathematics', 'Science', 'English', 'Social Studies'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Subject (Grade {grade})</Text>
      {quizzes.map((subject) => (
        <Button
          key={subject}
          title={subject}
          onPress={() =>
            navigation.navigate('Quizzes', { grade, subject })
          }
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 }
});
