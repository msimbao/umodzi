// screens/MyScoresScreen.js
import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { getScores } from "@/utils/ScoreTracker";
import * as Progress from "react-native-progress";
import SvgBackground from "@/components/SvgBackground";
import { Picker } from "@react-native-picker/picker";
import GradingThemes from "@/utils/gradingTheme";
import { Ionicons } from "@expo/vector-icons";

import { ThemedButton } from "react-native-really-awesome-button";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("window");

import BackButtons from "@/components/BackButtons";

const nohistory = require("@/assets/images/nohistory.png");

export default function HistoryListScreen() {
  const [scores, setScores] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("All");

  // const subjects = [
  //   "All",
  //   "Science",
  //   "Mathematics",
  //   "English",
  //   "Additional Mathematics",
  //   "Civics",
  //   "Commerce",
  // ];

  const subjectIcons = {
    Science: "planet",
    Biology: "leaf",
    Chemistry: "bonfire",
    Physics: "speedometer",
    Mathematics: "calculator",
    English: "chatbox-ellipses",
    History: "book",
    Commerce: "cash",
    "Civic Education": "business",
    Geography: "earth",
    "Social Studies": "people",
    "Religious Education": "rose",
    "Special Paper 2": "medical",
    "Special Paper 1": "apps",
    "Additional Math": "bar-chart",
  };

  const subjects = useMemo(() => {
    const uniqueSubjects = [...new Set(scores.map((item) => item.subject))];
    return ["All", ...uniqueSubjects];
  }, []);

  const getGrade = (percentage) => {
    if (percentage == 100) return "PERFECT";
    if (percentage >= 90) return "EXCELLENT";
    if (percentage >= 80) return "GREAT";
    if (percentage >= 70) return "GOOD";
    if (percentage >= 60) return "OKAY";
    if (percentage >= 50) return "POOR";
    return "FAIL";
  };

  useEffect(() => {
    const fetchScores = async () => {
      const data = await getScores();
      setScores(data.reverse()); // show most recent first
    };
    fetchScores();
  }, []);

  const [loaded, error] = useFonts({
    Fredoka_400Regular,
    Jersey25_400Regular,
  });

  const filteredData =
    selectedSubject === "All"
      ? scores
      : scores.filter((item) => item.subject === selectedSubject);

  const renderItem = ({ item }) => (
    <View style={styles.cards}>
      <Text style={styles.scoreTitle}>{item.title}</Text>


        <View style={{ justifyContent: "left", flexDirection: "row" }}>
          <Text style={styles.gradeText}>Grade: {item.grade}</Text>
          <Text style={styles.gradeText}>{item.subject}</Text>
       

        <Text
          style={[
            styles.gradeText,
            {
              backgroundColor:
                GradingThemes[
                  getGrade(Math.round((100 * item.score) / item.total))
                ].backgroundColor,
              color:
                GradingThemes[
                  getGrade(Math.round((100 * item.score) / item.total))
                ].color,
            },
          ]}
        >
          {Math.round((100 * item.score) / item.total)} %
        </Text>
      </View>
      <Progress.Bar
        style={styles.historyProgress}
        progress={item.score / item.total}
        width={width * 0.7}
        height={15}
        color={"#333"}
      />

      <Text
        style={[
          styles.gradeText,
          {
            backgroundColor:
              GradingThemes[
                getGrade(Math.round((100 * item.score) / item.total))
              ].backgroundColor,
            color:
              GradingThemes[
                getGrade(Math.round((100 * item.score) / item.total))
              ].color,
          },
        ]}
      >
        {getGrade(Math.round((100 * item.score) / item.total))}
      </Text>
      {/* <Text>{new Date(item.date).toLocaleString()}</Text> */}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <SvgBackground
        seed="zore"
        // patternIndex={1}
        backgroundColor="#e5e6fa"
        patternColor="#B8849B"
      /> */}
      <View>
        <Text style={styles.header}>Detailed History</Text>
        <Text style={styles.subHeader}>Individual Test Score History</Text>
        <BackButtons />

        <Picker
          selectedValue={selectedSubject}
          onValueChange={(value) => setSelectedSubject(value)}
          style={styles.picker}
        >
          {subjects.map((subject) => (
            <Picker.Item label={subject} value={subject} key={subject} />
          ))}
        </Picker>

        <View style={styles.card}>
          {filteredData.length === 0 ? (
            <View style={styles.topPart}>
              <View>
                <Image
                  style={styles.subjectImage}
                  source={nohistory}
                  width={width * 0.8}
                  height={300}
                />

                <Text style={styles.emptyTextTitle}>No grades yet!</Text>
                <Text style={styles.emptyTextSentence}>
                  Take some tests to start tracking
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.card}>
              <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: width * 0.55 }} // <-- Adds space at the bottom
              />
            </View>
          )}
        </View>
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
    // height:height*1.5,
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
  headerImage: {
    top: -20,
    resizeMode: "contain",
  },
  cards: {
    // borderRadius: 5,
    width: width * 0.8,
    marginVertical: 5,
    elevation: 3,
    alignItems: "left",
    padding: 20,
    borderColor: "black",
    backgroundColor: "white",
    marginRight: 10,
    borderBottomWidth: 5,
    // borderBottomEndRadius: 5,
    // borderBottomStartRadius: 5,
  },
  scoreTitle: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: "left",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    width: 300,
    fontWeight: 600,
  },

  historyProgress: {
    borderRadius: 2,
    marginVertical: 10,
    borderWidth: 0,
    backgroundColor: "#ccc",
    // height:100,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "left",
    marginBottom: 16,
    flexWrap: "wrap",
    width: width * 0.75,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginRight: 4,
    marginBottom: 8,
  },
  buttonActive: {
    backgroundColor: "#333",
  },
  buttonText: {
    fontSize: 10,
  },
  buttonTextActive: {
    color: "white",
  },
  card: {
    borderRadius: 5,
    width: width * 0.8,
    alignItems: "center",
    textAlign: "left",
    borderColor: "#333",
    borderWidth: 0,
    height: height * 0.95,
  },
  background: {
    borderRadius: 5,
    width: width * 0.8,
    alignItems: "center",
    textAlign: "left",
    borderColor: "#333",
    borderWidth: 0,
    backgroundColor: "#fff",
    padding: 20,
    paddingHorizontal: 0,
    marginBottom: 10,
    // height: height * 0.95,
  },
  topPart: {
    width: width * 0.8,
    backgroundColor: "white",
    elevation: 3,
    borderRadius: 5,
    padding: 20,
    marginBottom: 5,
    paddingTop: 50,
  },
  picker: {
    height: 50,
    width: width * 0.8,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  emptyTextTitle: {
    marginVertical: 20,
    textAlign: "center",
    fontFamily: "Jersey25_400Regular",
    fontSize: 40,
  },
  emptyTextSentence: {
    marginVertical: 10,
    textAlign: "center",
    fontFamily: "Fredoka_400Regular",
    fontSize: 15,
  },
  gradeText: {
    backgroundColor: "#333",
    borderRadius: 4,
    padding: 5,
    color: "#fff",
    marginHorizontal: 2,
    fontSize: 12,
    textAlign: "center",
  },
});
