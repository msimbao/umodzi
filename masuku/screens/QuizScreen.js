import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { saveScore } from "@/utils/ScoreTracker";
import * as Speech from "expo-speech";

import { ThemedButton } from "react-native-really-awesome-button";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("window");

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
      rate: currentRate,
    });
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);

    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      saveScore({
        title: quiz.title,
        grade: quiz.grade,
        quizId: quiz.id,
        score,
        total: quiz.questions.length,
      });
      navigation.navigate("Result", {
        score,
        total: quiz.questions.length,
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
    <View style={styles.container}>
      <Text style={styles.header}>{quiz.title} </Text>
      <Text style={styles.subHeader}>{quiz.subject} Tests</Text>

      <ScrollView contentContainerStyle={styles.card}>
        {/* Show image if available */}

        {currentQuestion.image && (
          <Image
            source={{ uri: currentQuestion.image }}
            style={styles.image}
            resizeMode="contain"
          />
        )}


        <View style={styles.questionView}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        <ThemedButton
          style={styles.speechButton}
          onPress={() => handlePlay(currentQuestion.question)}
          name="bruce"
          type="primary"
          width={30}
          height={30}
        >
        
        </ThemedButton>
        </View>

        {currentQuestion.options.map((option, index) => (
          <Pressable
            key={index}
            style={getOptionStyle(index)}
            onPress={() => !isSubmitted && setSelectedOption(index)}
          >
            <Text style={styles.optionText}>{option}</Text>
            <ThemedButton
              style={styles.speechButton}
              onPress={() => handlePlay(option)}
              name="bruce"
              type="primary"
              width={30}
              height={30}
            >
              🗨
            </ThemedButton>
          </Pressable>
        ))}

        {!isSubmitted ? (
          <ThemedButton
            style={styles.button}
            onPress={handleSubmit}
            name="bruce"
            type="primary"
            disabled={selectedOption === null}
          >
            SUBMIT
          </ThemedButton>
        ) : (
          <>
            <Text style={styles.feedback}>
              {selectedOption === correctIndex
                ? "✅ Correct!"
                : "❌ Incorrect."}
            </Text>
            <Text style={styles.hint}>Hint: {currentQuestion.hint}</Text>

            <ThemedButton
              style={styles.button}
              name="bruce"
              type="primary"
              onPress={() => handlePlay(currentQuestion)}
            >
              READ HINT
            </ThemedButton>

            <ThemedButton
              style={styles.button}
              name="bruce"
              type="primary"
              onPress={handleNext}
            >
              {currentIndex + 1 < quiz.questions.length ? "Next" : "Finish"}
            </ThemedButton>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingLeft: 30,
    paddingTop: height * 0.08,
    alignItems: "left",
    backgroundColor: "#f4f3ee",
  },
  header: {
    fontSize: 40,
    marginBottom: 0,
    textAlign: "left",
    color: "black",
    fontFamily: "Jersey25_400Regular",
    width: 300,
    fontWeight: 600,
  },
  subHeader: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: "left",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    width: 300,
    fontWeight: 600,
  },
  card: {
    borderRadius: 5,
    width: width * 0.8,
    marginVertical: 10,
    elevation: 3,
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    top: 20,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "left",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    width: 300,
    fontWeight: 600,
  },
  button: {
    bottom: 50,
    marginTop: 50,
  },
  speechButton: {
    bottom: 50,
    marginTop: 50,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
  },
  questionView:{
    padding:15,
    flexDirection:'row',
    justifyContent:'space-between',
      width:0.7 * width,
  },
  option: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 3,
    width:0.7 * width,
    backgroundColor:'white',
    borderColor: "white",
    flexDirection:'row',
    justifyContent:'space-between'
  },
  selectedOption: {
    backgroundColor: "#d0ebff",
    padding: 20,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 3,
    width:0.7 * width,
    borderColor: "white",
    flexDirection:'row',
        justifyContent:'space-between'
  },
  correctOption: {
    backgroundColor: "#d3f9d8",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 3,
    width:0.7 * width,
    borderColor: "white",
    flexDirection:'row',
        justifyContent:'space-between'
  },
  wrongOption: {
    backgroundColor: "#ffa8a8",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 3,
    width:0.7 * width,
    borderColor: "white",
    flexDirection:'row',
        justifyContent:'space-between'
  },
  optionText: {
    fontSize: 16,
  },
  feedback: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  hint: {
    fontStyle: "italic",
    color: "#555",
    marginBottom: 20,
  },
});
