// screens/QuizScreen.js
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { saveScore } from '../utils/scoreTracker';

export default function QuizScreen({ route, navigation }) {
  const { quiz } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const question = quiz.questions[currentIndex];

const handleAnswer = (selectedOption) => {
  const isCorrect = selectedOption === quiz.questions[currentIndex].answer;
  const updatedScore = isCorrect ? score + 1 : score;

  if (currentIndex + 1 < quiz.questions.length) {
    setScore(updatedScore);
    setCurrentIndex(currentIndex + 1);
  } else {
    saveScore({
      grade: quiz.grade,
      quizId: quiz.id,
      score: updatedScore,
      total: quiz.questions.length
    });
    navigation.navigate('Result', {
      score: updatedScore,
      total: quiz.questions.length
    });
  }
};

//   async function handleAnswer(option){
//     if (option === question.answer) setScore(score + 1);

//     if (currentIndex + 1 < quiz.questions.length) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       navigation.navigate('Result', { score, total: quiz.questions.length });
//     }

//     if (currentIndex + 1 < quiz.questions.length) {
//   setCurrentIndex(currentIndex + 1);
//     } else {
//      saveScore({
//         grade: quiz.grade,
//         quizId: quiz.id,
//         score,
//         total: quiz.questions.length
//     });
//     navigation.navigate('Result', { score, total: quiz.questions.length });
//     }

//     console.log(question.answer)
//     console.log(option)
//     console.log(score)
//   };

  return (
    <View style={{ padding: 20 }}>
      <Text>{question.question}</Text>
      {question.options.map((option, idx) => (
        <Button key={idx} title={option} onPress={() => handleAnswer(option)} />
      ))}
    </View>
  );
}
