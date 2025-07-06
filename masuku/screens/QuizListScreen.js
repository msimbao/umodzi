import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
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

import BackButtons from "@/components/BackButtons";
const nohistory = require("@/assets/images/empty.png");

export default function QuizListScreen({ route, navigation }) {
  const { grade, subject } = route.params;
  const [quizzes, setQuizzes] = useState([]);
  const [DATA, setData] = useState([]);
  const [search, setSearch] = useState("");

  const goBack = () => {
    navigation.goBack();
  };

  const filteredData = quizzes.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    // console.log(item)
    (async () => {
      const data = await getLocalQuizzes();
      // setData(data)
      const filtered = data.filter(
        (item) => item.grade == grade && item.subject == subject
      );
      setQuizzes(filtered);
    })();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.cards}>
      <Text style={[styles.subjectName, { fontSize: 30 }]}>{item.title} </Text>
      <Text style={styles.subjectName}>
        Total Questions: {item.questions.length}{" "}
      </Text>

      <ThemedButton
        style={styles.button}
        onPress={() => navigation.navigate("Quiz", { quiz: item })}
        name="bruce"
        type="primary"
        height={40}
        width={width * 0.7}
      >
        START TEST
      </ThemedButton>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Grade {grade} </Text>
        <Text style={styles.subHeader}>{subject} Tests</Text>
        <BackButtons />

        <TextInput
          placeholder="> Search For Tests Here..."
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />

        {/* {filteredData.map((quiz) => (
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
      ))} */}

        {quizzes.length === 0 ? (
          <View style={styles.topPart}>
            <View>
              <Image
                style={styles.subjectImage}
                source={nohistory}
                width={width * 0.7}
                height={250}
              />

              <Text style={styles.emptyTextTitle}>No Tests Yet!</Text>
              <Text style={styles.emptyTextSentence}>
                Get Some Pamphlets from the Library!
                <ThemedButton
                  style={styles.button}
                  name="bruce"
                  type="primary"
                  onPress={() => navigation.navigate("Main")}
                  width={width * 0.65}
                  height={50}
                  borderRadius={5}
                >
                  GO TO LIBRARY
                </ThemedButton>
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
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
    // width: width * 0.8,
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
  subjectHeader: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: "left",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    width: 300,
    fontWeight: 900,
  },

  // listContainer: {
  //   paddingHorizontal: 10, // Add padding to the sides of the list
  // },
  input: {
    height: 70,
    width: width * 0.80,
    backgroundColor: "#fff",
    color: "#333",
    padding: 20,
    elevation: 5,
    borderRadius: 5,
    paddingLeft: 20,
    fontFamily: "Fredoka_400Regular",
    fontSize: 20,
    marginVertical: 10,
  },
  cards: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    width: width * 0.80,
    textAlign: "left",
    borderWidth: 0,
    marginBottom:10,
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

  button: {
    marginTop: 30,
  },
  topPart: {
    width: width * 0.80,
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 5,
    padding: 20,
    marginBottom: 5,
  },
  storeImage: {
    bottom: 0,
    resizeMode: "contain",
    alignSelf: "center",
  },
  emptyTextTitle: {
    marginVertical: 20,
    marginBottom: 5,
    textAlign: "center",
    fontFamily: "Jersey25_400Regular",
    fontSize: 40,
  },
  emptyTextSentence: {
    marginVertical: 5,
    textAlign: "center",
    fontFamily: "Fredoka_400Regular",
    fontSize: 15,
  },
  storeImage: {
    bottom: 0,
    resizeMode: "contain",
    alignSelf: "center",
  },
});
