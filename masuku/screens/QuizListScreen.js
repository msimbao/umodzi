import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { getLocalQuizzes } from "@/utils/QuizStore";
import { Ionicons } from "@expo/vector-icons";

import { ThemedButton } from "react-native-really-awesome-button";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("window");

export default function QuizListScreen({ route, navigation }) {
  const { grade, item } = route.params;
  const [quizzes, setQuizzes] = useState([]);

    const goBack = () => {
    navigation.goBack();
  }

  useEffect(() => {
    (async () => {
      const data = await getLocalQuizzes();
      const filtered = data.filter(
        (q) => q.grade === grade && q.subject === item
      );
      setQuizzes(filtered);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
         <Ionicons name={'arrow-back-circle'} onPress={goBack} size={25} color={"#333"}/> Grade {grade} </Text>
      <Text style={styles.subHeader}>{item} Tests</Text>

      {quizzes.map((quiz) => (
        <View style={styles.cards} key={quiz.id}>
          <Text style={[styles.subjectName, {fontSize:30} ]}>{quiz.title} </Text>
          <Text style={styles.subjectName}>Total Questions: {quiz.questions.length} </Text>


          <ThemedButton
            style={styles.button}
            onPress={() => navigation.navigate("Quiz", { quiz })}
            name="bruce"
            type="primary"
            height={40}
            width={width * 0.7}
          >
            START TEST
          </ThemedButton>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    paddingLeft: 0,
    paddingTop: height * 0.08,
    alignItems: "center",
    backgroundColor: "#e5e6fa",
  },
  header: {
    fontSize: 40,
    marginBottom: 0,
    textAlign: "left",
    color: "black",
    fontFamily: "Jersey25_400Regular",
    width: 300,
    fontWeight: 600,
    left: -20,
  },
  subHeader: {
    fontSize: 15,
    marginBottom: 10,
    left: -20,
    textAlign: "left",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    width: 300,
    fontWeight: 600,
  },
  subjectHeader: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: "left",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    width: 300,
    fontWeight: 900,
  },
  subject: {
    elevation: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.8,
    left: -20,
    textAlign: "center",
  },
  listContainer: {
    paddingHorizontal: 10, // Add padding to the sides of the list
  },
  cards: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    width: width * 0.85,
    top: 10,
    textAlign: 'left',
    borderWidth:0,
  },
  subjectImage: {
    top: 0,
    resizeMode: "contain",
  },
  title: {
    fontSize: 40,
    marginBottom: 10,
    textAlign: "center",
    color: "black",
    fontFamily: "Jersey25_400Regular",
    width: 300,
    fontWeight: 600,
  },
  subjectName: {
    fontSize: 20,
    marginBottom: 0,
    textAlign: "left",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    width: 300,
    fontWeight: "600",
  },
  description: {
    fontSize: 20,
    color: "#000",
    textAlign: "justify",
    marginBottom: 10,
    width: 250,
    fontFamily: "Fredoka_400Regular",
    fontWeight: 600,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    // justifyContent: "center",
    alignItems: "center",
  },
  button: {
    bottom: 10,
    marginTop: 30,
  },
});
