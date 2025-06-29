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
import { Audio } from "expo-av";

import * as Progress from "react-native-progress";
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

  const [startTime, setStartTime] = useState(new Date().toISOString());
  const currentQuestion = quiz.questions[currentIndex];
  const correctIndex = currentQuestion.answer;
  const [currentRate, setcurrentRate] = useState(0.7);

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
        subject: quiz.subject,
        grade: quiz.grade,
        quizId: quiz.id,
        score,
        total: quiz.questions.length,
        start: startTime,
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

    if (index === correctIndex) {
      playFeedbackSound(true);
      return styles.correctOption;
    }
    if (index === selectedOption && selectedOption !== correctIndex) {
      playFeedbackSound(false);
      return styles.wrongOption;
    }

    return styles.option;
  };

  async function playFeedbackSound(isCorrect) {
    const file = isCorrect
      ? require("@/assets/correct.mp3")
      : require("@/assets/wrong.mp3");

    const { sound } = await Audio.Sound.createAsync(file, { shouldPlay: true });

    await sound.setPositionAsync(0);
    await sound.playAsync();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{quiz.title} </Text>
      <Text style={styles.subHeader}>{quiz.subject} Test</Text>

      <Text style={styles.questionCount}>
        Question {currentIndex}/{quiz.questions.length}
      </Text>
      <Progress.Bar
        style={styles.quizProgress}
        progress={currentIndex / quiz.questions.length}
        width={width * 0.8}
        height={20}
        color={"black"}
      />
      <ScrollView contentContainerStyle={styles.card}>
        {/* Show image if available */}

        {/*  {currentQuestion.image && (
          <Image
            source={{ uri: currentQuestion.image }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
          */}

        <View style={styles.questionView}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          <ThemedButton
            style={styles.questionSpeechButton}
            onPress={() => handlePlay(currentQuestion.question)}
            name="bruce"
            type="primary"
            width={50}
            height={40}
          >
            ▶
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
              style={styles.optionSpeechButton}
              onPress={() => handlePlay(option)}
              name="bruce"
              type="secondary"
              width={50}
              height={35}
            >
              ▶
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
              onPress={handleNext}
            >
              {currentIndex + 1 < quiz.questions.length ? "NEXT" : "FINISH"}
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
    padding: 30,
    paddingLeft: 40,
    paddingTop: height * 0.08,
    alignContent: "center",
    backgroundColor: "#e5e6fa",
  },
  questionCount: {
    fontSize: 20,
    marginTop: 10,
    alignContent: "left",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    width: width * 0.5,
    fontWeight: 600,
  },
  header: {
    fontSize: 35,
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
    elevation: 5,
    alignItems: "center",
    padding: 20,
    paddingTop: 30,
    backgroundColor: "#FCF4F6",
    top: 0,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "left",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    width: width * 0.7,
    fontWeight: 600,
  },
  button: {
    bottom: 50,
    marginTop: 70,
  },

  optionSpeechButton: {
    bottom: -5,
    position: "absolute",
    right: 0,
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
  questionView: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 0,
    width: 0.7 * width,
    backgroundColor: "#FCF4F6",
    borderColor: "white",
    flex: "1",
  },
  questionSpeechButton: {
    left: 0,
    top: 0,
    alignSelf: "right",
    marginLeft: "auto",
  },
  option: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 3,
    width: 0.7 * width,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 2,
  },
  selectedOption: {
    backgroundColor: "#e5e6fa",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 3,
    width: 0.7 * width,
    borderColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderStyle: "dashed",
  },
  correctOption: {
    backgroundColor: "#94EC94",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 5,
    width: 0.7 * width,
    borderColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderStyle: "solid",
  },
  wrongOption: {
    backgroundColor: "#FC7C7C",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 5,
    width: 0.7 * width,
    borderColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderStyle: "solid",
  },
  optionText: {
    fontSize: 16,
    width: width * 0.45,
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
  quizProgress: {
    borderRadius: 2,
    marginVertical: 10,
    borderWidth: 0,
    backgroundColor: "#fff",
  },
});
