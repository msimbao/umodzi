import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getLocalQuizzes } from '@/utils/QuizStore';

export default function QuizListScreen({ route, navigation }) {
  const { grade, subject } = route.params;
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getLocalQuizzes();
      const filtered = data.filter((q) => q.grade === grade && q.subject === subject);
      setQuizzes(filtered);
    })();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Choose a Quiz for Grade {grade}</Text>
      {quizzes.map((quiz) => (
        <Button
          key={quiz.id}
          title={quiz.title}
          onPress={() => navigation.navigate('Quiz', { quiz })}
        />
      ))}
    </View>
  );
}
