import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import { saveScore } from "@/utils/ScoreTracker";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";

import * as Progress from "react-native-progress";
import { ThemedButton } from "react-native-really-awesome-button";

const { width, height } = Dimensions.get("window");

import BackButtons from "@/components/BackButtons";

export default function QuizScreen({ route, navigation }) {
  const { quiz } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [startTime, setStartTime] = useState(new Date().toISOString());
  const currentQuestion = quiz.questions[currentIndex];
  const correctIndex = currentQuestion.answer;
  const [currentRate, setcurrentRate] = useState(0.7);
  const [explanation, setExplanation] = useState();
  const [isCorrect, setIsCorrect] = useState();

  const handleSubmit = () => {
    Speech.stop()
    onModalOpen();
    if (isSubmitted || selectedOption === null) return;

    const isCorrect = selectedOption === correctIndex;
    if (isCorrect) {
      setIsCorrect(true);
      setScore(score + 1);
      playFeedbackSound(true);
    } else {
      setIsCorrect(false);
      playFeedbackSound(false);
    }

    onModalOpen();
    setExplanation(currentQuestion.explanation);
    setIsSubmitted(true);
  };

  const handlePlay = (inputValue) => {
    Speech.stop()
    Speech.speak(inputValue, {
      rate: currentRate,
    });
  };

  const onModalOpen = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    onModalClose();

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
      return styles.correctOption;
    }
    if (index === selectedOption && selectedOption !== correctIndex) {
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

      <View style={styles.topPart}>

      <Text style={styles.header}>{quiz.subject} Test
      </Text>
      <Text style={styles.subHeader}>{quiz.title} Test</Text>
      <BackButtons />

      <Text style={styles.questionCount}>
        Question {currentIndex}/{quiz.questions.length}
      </Text>
      <Progress.Bar
        style={styles.quizProgress}
        progress={currentIndex / quiz.questions.length}
        width={width * 0.75}
        height={20}
        color={"black"}
      />
      </View>

                   {!isSubmitted ? (
          <View>
            <ThemedButton
              style={styles.button}
              onPress={handleSubmit}
              name="bruce"
              type="primary"
              disabled={selectedOption === null}
              height={55}
              width={width * 0.85}
              borderRadius={5}
            >
              SUBMIT
            </ThemedButton>
          </View>
        ) : (
          <>
          
          <View style={{marginTop:0}}>
            <ThemedButton
              style={styles.button}
              name="bruce"
              type="primary"
              onPress={handleNext}
              width={width * 0.85}
              height={55}
              borderRadius={5}
            >
              {currentIndex + 1 < quiz.questions.length ? "NEXT" : "FINISH"}
            </ThemedButton>


            </View>
          </>
          
        )}

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
        {/* <SvgXml xml={currentQuestion.image} width="100" height="100" /> */}

        <View style={styles.questionView}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          <ThemedButton
            style={styles.questionSpeechButton}
            onPress={() => handlePlay(currentQuestion.question)}
            name="bruce"
            type="primary"
            width={50}
            height={40}
            borderRadius={5}
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
              borderRadius={4}
              raiseLevel={5}
            >
              ▶
            </ThemedButton>
          </Pressable>
        ))}


      </ScrollView>

      <Modal
        animationType="fade"
        backdropColor={"#333"}
        transparent={true}
        visible={isModalVisible}
      >
        <View style={styles.backdrop}
                onPress={onModalClose}
>
        </View>

        {isCorrect ? (
          <View
            style={[
              styles.modalContent,
              { backgroundColor: "#ddffbe", borderColor: "#60bb08" },
            ]}
          >
            <View style={styles.titleContainer}>
              <Text style={[styles.title, { color: "#60bb08" }]}>
                <Ionicons
                  name={"checkmark-circle"}
                  size={20}
                  color={"#60bb08"}
                />{" "}
                Well Done!
              </Text>
              {/* <Text style={styles.subTitle}>Explanation: </Text> */}
              <Text style={[styles.explanation, { color: "#046404" }]}>
                {explanation}{" "}
              </Text>
              <ThemedButton
                style={styles.nextButton}
                name="bruce"
                type="primary"
                height={50}
                width={width * 0.8}
                backgroundColor={"#60bb08"}
                borderColor={"#60bb08"}
                textColor={"#ddffbe"}
                backgroundDarker={"#046404"}
                onPress={handleNext}
                borderRadius={4}
              >
                {currentIndex + 1 < quiz.questions.length ? "NEXT" : "FINISH"}
              </ThemedButton>

              <ThemedButton
                style={styles.nextButton}
                name="bruce"
                type="secondary"
                height={50}
                width={width * 0.8}
                backgroundColor={"#d3f2d4"}
                borderColor={"#046404"}
                textColor={"#046404"}
                backgroundDarker={"#046404"}
                onPress={onModalClose}
                borderRadius={4}
              >
                REVIEW
              </ThemedButton>

            </View>
          </View>
        ) : (
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: "#ffdfe3",
                borderColor: "#ff4b4d",
                borderRadius: 5,
              },
            ]}
          >
            <View style={styles.titleContainer}>
              <Text style={[styles.title, { color: "#ea2a2e" }]}>
                <Ionicons name={"close-circle"} size={20} color={"#ea2a2e"} />{" "}
                Not correct
              </Text>
              <Text style={[styles.explanation, { color: "#ea2a2e" }]}>
                {explanation}{" "}
              </Text>
              <ThemedButton
                style={styles.nextButton}
                name="bruce"
                type="primary"
                height={50}
                width={width * 0.8}
                backgroundColor={"#ff4b4d"}
                borderColor={"#ff4b4d"}
                backgroundDarker={"#ea2a2d"}
                borderRadius={5}
                onPress={handleNext}
              >
                {currentIndex + 1 < quiz.questions.length ? "NEXT" : "FINISH"}
              </ThemedButton>

                <ThemedButton
                style={styles.nextButton}
                name="bruce"
                type="primary"
                height={50}
                width={width * 0.8}
                backgroundColor={"#ffdfe3"}
                borderColor={"#ff4b4d"}
                backgroundDarker={"#ea2a2d"}
                borderRadius={5}
                onPress={onModalClose}
                textColor={"#ff4b4d"}
              >
               REVIEW
              </ThemedButton>

            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: height * 0.08,
    alignItems: "center",
    backgroundColor: "#e5e6fa",
        // height:height*1.5,
  },
    topPart: {
    width: width * 0.85,
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 5,
    padding: 20,
    marginBottom: 5,
  },
  modalContent: {
    width: "90%",
    borderRadius: 5,
    paddingBottom: 10,
    alignSelf: "center",
    position: "absolute",
    bottom: 30,
    borderWidth: 0,
    padding:20,
    // borderColor:'#333',
    elevation: 5,
  },
    backdrop: {
      width: width*0.95,
      height: height*0.95,
      backgroundColor:'#333',
      opacity:0.2,
      alignSelf:'center',
      top:height * 0.0125,
      borderRadius:5,
    },
  titleContainer: {
    marginTop: 0,
    padding: 15,
  },
  title: {
    fontSize: 25,
    textAlign: "left",
    fontFamily: "Fredoka_400Regular",
    fontWeight: "bold",
  },
  subTitle: {
    textAlign: "left",
    fontFamily: "Fredoka_400Regular",
    fontWeight: "bold",
    fontSize: 20,
  },
  explanation: {
    textAlign: "left",
    fontFamily: "Fredoka_400Regular",
    fontSize: 18,
    marginVertical: 10,
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
    width: width * 0.85,
    marginVertical: 10,
    elevation: 5,
    alignItems: "center",
    padding: 20,
    // paddingTop: 30,
    backgroundColor: "#fff",
    top: 0,
    borderWidth: 0,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 50,
    textAlign: "left",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    width: width * 0.65,
    fontWeight: 600,
  },
  button: {
    bottom: 0,
    marginVertical: 5,
  },

  nextButton: {
    alignSelf: "center",
    bottom: -10,
    marginVertical:10,
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
    width: 0.75 * width,
    backgroundColor: "#FCF4F6",
    borderColor: "black",
    flex: "1",
    borderWidth:1,
    // borderStyle:'dashed',
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
    elevation: 0,
    width: 0.75 * width,
    backgroundColor: "#ddd",
    borderWidth: 0,
  },
  selectedOption: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 3,
    width: 0.75 * width,
    borderColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderStyle: "dashed",
  },
  correctOption: {
    backgroundColor: "#ddffbe",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 5,
    width: 0.75 * width,
    borderColor: "#60bb08",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0,
    borderStyle: "solid",
  },
  wrongOption: {
    backgroundColor: "#FC7C7C",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 5,
    width: 0.75 * width,
    borderColor: "#ff4b4d",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0,
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
    backgroundColor: "#eee",
  },
});
