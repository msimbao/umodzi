// screens/MyScoresScreen.js
import React, { useEffect, useState, useRef, useMemo } from "react";
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
import { BarChart } from "react-native-gifted-charts";

import { ThemedButton } from "react-native-really-awesome-button";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("window");

export default function HistoryScreen() {
  const [scores, setScores] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("All");

  // const subjects = ['All', 'Math', 'Science', 'English'];

  const subjects = useMemo(() => {
    const uniqueSubjects = [...new Set(scores.map((item) => item.subject))];
    return ["All", ...uniqueSubjects];
  }, []);

  useEffect(() => {
    const fetchScores = async () => {
      const data = await getScores();
      setScores(data.reverse()); // show most recent first
    };
    fetchScores();
    console.log(data);
  }, []);

  const filteredData =
    selectedSubject === "All"
      ? scores
      : scores.filter((item) => item.subject === selectedSubject);

  const data = scores.map((item) => ({
    value: (100 * item.score) / item.total,
  }));

  const renderFilterButtons = () => (
    <View style={styles.filterContainer}>
      {subjects.map((subject) => (
        <TouchableOpacity
          key={subject}
          onPress={() => setSelectedSubject(subject)}
          style={[
            styles.button,
            selectedSubject === subject && styles.buttonActive,
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              selectedSubject === subject && styles.buttonTextActive,
            ]}
          >
            {subject}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.cards}>
      <Text style={styles.scoreTitle}>
        Grade {item.grade} - {item.title}
        {item.date.getMinutes}
      </Text>

      <Text style={{ fontSize: 20 }}>
        {Math.floor((100 * item.score) / item.total)} %
      </Text>
      <Text style={{ fontSize: 15 }}>
        Score: {item.score} / {item.total}
      </Text>
      <Progress.Bar
        style={styles.historyProgress}
        progress={item.score / item.total}
        width={200}
        height={15}
        color={"black"}
      />
      <Text>{new Date(item.date).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent History</Text>
      <Text style={styles.subHeader}>Track your performance</Text>

      {/* {renderFilterButtons()} */}
      {scores.length === 0 ? (
        <Text style={styles.emptyText}>No scores yet. Try a quiz!</Text>
      ) : (
        <View>
          <View>
            <BarChart
              showFractionalValue
              showYAxisIndices
              hideRules
              noOfSections={10}
              maxValue={100}
              data={data}
              barWidth={10}
              sideWidth={20}
              // isThreeD
              side="right"
            />
          </View>
          <Progress.Bar
            style={styles.historyProgress}
            progress={3 / 4}
            width={200}
            height={15}
            color={"black"}
          ></Progress.Bar>
        </View>
      )}
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
    borderRadius: 5,
    width: width * 0.8,
    marginVertical: 10,
    elevation: 3,
    alignItems: "center",
    padding: 20,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    top: 20,
  },
  scoreTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "black",
    fontFamily: "Jersey25_400Regular",
    width: 300,
    fontWeight: 600,
  },
  button: {
    bottom: 50,
    marginTop: 50,
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
    justifyContent: "center",
    marginBottom: 16,
    flexWrap: "wrap",
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#ddd",
    marginHorizontal: 4,
    marginBottom: 8,
  },
  buttonActive: {
    backgroundColor: "#5e60ce",
  },
  buttonText: {
    color: "#333",
  },
  buttonTextActive: {
    color: "#fff",
  },
});
