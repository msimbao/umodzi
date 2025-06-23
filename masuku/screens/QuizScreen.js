import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import { saveScore } from '@/utils/ScoreTracker';
import * as Speech from 'expo-speech';


export default function QuizScreen({ route, navigation }) {
  const { quiz } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quiz.questions[currentIndex];
  const correctIndex = currentQuestion.answer;
  const [currentRate, setcurrentRate] = useState(0.2);


  const handleSubmit = () => {
    if (isSubmitted || selectedOption === null) return;

    const isCorrect = selectedOption === correctIndex;
    if (isCorrect) setScore(score + 1);

    setIsSubmitted(true);
  };

  const handlePlay = (inputValue) => {
        // const inputValue = currentWord
        Speech.speak(inputValue, {
            rate:currentRate,
        });
    }

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);

    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      saveScore({
        grade: quiz.grade,
        quizId: quiz.id,
        score,
        total: quiz.questions.length
      });
      navigation.navigate('Result', {
        score,
        total: quiz.questions.length
      });
    }
  };

  const getOptionStyle = (index) => {
    if (!isSubmitted) {
      return selectedOption === index ? styles.selectedOption : styles.option;
    }

    if (index === correctIndex) return styles.correctOption;
    if (index === selectedOption && selectedOption !== correctIndex)
      return styles.wrongOption;

    return styles.option;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Show image if available */}
      {currentQuestion.image && (
        <Image
          source={{ uri: currentQuestion.image }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <Text style={styles.question}>{currentQuestion.question}</Text>
      <Button title="Read Question" onPress={() => handlePlay(currentQuestion.question)}/>
      {currentQuestion.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={getOptionStyle(index)}
          onPress={() => !isSubmitted && setSelectedOption(index)}
        >
          <Text style={styles.optionText}>{option}</Text>
          <Button title="Read Question" onPress={() => handlePlay(option)}/>

        </TouchableOpacity>
      ))}

      {!isSubmitted ? (
        <Button
          title="Submit"
          onPress={handleSubmit}
          disabled={selectedOption === null}
        />
      ) : (
        <>
          <Text style={styles.feedback}>
            {selectedOption === correctIndex ? '✅ Correct!' : '❌ Incorrect.'}
          </Text>
          <Text style={styles.hint}>Hint: {currentQuestion.hint}</Text>
          <Button title="Read Hint" onPress={() => handlePlay(currentQuestion)}/>

          <Button
            title={currentIndex + 1 < quiz.questions.length ? 'Next' : 'Finish'}
            onPress={handleNext}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'flex-start'
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 10
  },
  question: {
    fontSize: 20,
    marginBottom: 20
  },
  option: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#888'
  },
  selectedOption: {
    backgroundColor: '#d0ebff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#339af0'
  },
  correctOption: {
    backgroundColor: '#d3f9d8',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#37b24d'
  },
  wrongOption: {
    backgroundColor: '#ffa8a8',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f03e3e'
  },
  optionText: {
    fontSize: 16
  },
  feedback: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  },
  hint: {
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 20
  }
});
