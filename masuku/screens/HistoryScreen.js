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
import { BarChart } from "react-native-gifted-charts";

import { ThemedButton } from "react-native-really-awesome-button";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("window");
import GradingThemes from "@/utils/gradingTheme";
import * as Progress from "react-native-progress";

export default function HistoryScreen() {
  const [scores, setScores] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(null);

  const subjects = useMemo(() => {
    const uniqueSubjects = [...new Set(scores.map((item) => item.subject))];
    return ["All", ...uniqueSubjects];
  }, []);

  useEffect(() => {
    const fetchScores = async () => {
      const data = await getScores();
      setScores(data); // show most recent first
    };
    fetchScores();
  }, []);

  const filteredData =
    selectedSubject === "All"
      ? scores
      : scores.filter((item) => item.subject === selectedSubject);

  const barData = scores.map((item) => ({
    value: (100 * item.score) / item.total,
    grade: item.grade,
    subject: item.subject,
    title: item.title,
  }));

  const total = 100; // Max possible score, used for percentage

  // Add onPress and conditional top label
  const chartData = barData.map((bar, index) => ({
    ...bar,
    onPress: () => {
      setSelectedIndex(index);
      setSelectedGrade(barData[index].grade);
      setSelectedSubjectIndex(barData[index].subject);
      setSelectedTitle(barData[index].title);
    },
    topLabelComponent: () =>
      selectedIndex === index ? (
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: "#333",
            marginBottom: 4,
          }}
        >
          {Math.round((bar.value / total) * 100)}%
        </Text>
      ) : null,
  }));

  const getGrade = (percentage) => {
    if (percentage == 100) return "PERFECT";
    if (percentage >= 90) return "EXCELLENT";
    if (percentage >= 80) return "GREAT";
    if (percentage >= 70) return "GOOD";
    if (percentage >= 60) return "OKAY";
    if (percentage >= 50) return "POOR";
    return "FAIL";
  };

  const gradeCounts = {
    EXCELLENT: 0,
    PERFECT: 0,
    GREAT: 0,
    GOOD: 0,
    OKAY: 0,
    POOR: 0,
    FAIL: 0,
  };

  scores.forEach(({ score, total }) => {
    const percentage = Math.floor((score / total) * 100);
    const grade = getGrade(percentage);
    gradeCounts[grade]++;
  });

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

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Recent History</Text>
        <Text style={styles.subHeader}>Track your performance</Text>
        {renderFilterButtons()}

        <View style={styles.card}>
          <Text
            style={{
              color: "black",
              fontSize: 15,
              fontWeight: "bold",
              textAlign: "center",
              paddingBottom: 20,
            }}
          >
            History Of Last 10 Tests
          </Text>
          {scores.length === 0 ? (
            <Text style={styles.emptyText}>No scores yet. Try a quiz!</Text>
          ) : (
            <BarChart
              // showFractionalValue
              // showYAxisIndices
              // hideRules
              maxValue={100}
              // yAxisLabelTexts={[ "20", "60", "80", "100",]} // No 0 here
              noOfSections={4}
              data={chartData.slice(0, 7)}
              barWidth={25}
              spacing={5}
              // sideWidth={20}
              // curveType={CurveType.QUADRATIC}
              isAnimated
              width={width * 0.55} // Force a wider chart width
              side="right"
              barBorderRadius={3}
              xAxisThickness={2}
              yAxisThickness={1}
              yAxisColor={"#eee"}
              xAxisColor={"#eee"}
              rulesColor={"#eee"}
              rulesType={"solid"}
              textFontSize={5}
              height={170}
              yAxisTextStyle={{
                fontSize: 10, // 👈 change this to your preferred size
                color: "#555",
              }}
            />
          )}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            { selectedIndex ? (            
             <>
              <Text style={styles.selectedText}>Grade {selectedGrade}</Text>
            <Text style={styles.selectedText}>{selectedSubjectIndex}</Text>
            <Text style={styles.selectedText}>{selectedTitle}</Text>
          </>
        ) :
            (
              <View></View>
            )}

          </View>
        </View>

        <View style={[styles.card,{textAlign:"left"}]}>
          <Text style={[styles.selectedText, { fontSize: 10 }]}>
            FAIL - {gradeCounts["FAIL"]} %
          </Text>
          <Progress.Bar
            style={styles.historyProgress}
            progress={gradeCounts["FAIL"] / 7}
            width={width * 0.65}
            height={15}
            color={GradingThemes["FAIL"].backgroundColor}
          />
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
    borderRadius: 5,
    width: width * 0.75,
    marginVertical: 10,
    elevation: 3,
    alignItems: "left",
    padding: 20,
    borderColor: "black",
    backgroundColor: "white",
    marginRight: 10,
  },
  scoreTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "left",
    color: "black",
    fontFamily: "Jersey25_400Regular",
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
    // marginBottom: 16,
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
    padding: 20,
    marginVertical: 5,
    backgroundColor: "#fff",
  },
  topPart: {
    width: width * 0.8,
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 5,
    padding: 20,
    marginBottom: 5,
    paddingTop: 50,
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
  selectedText: {
    backgroundColor: "#333",
    borderRadius: 5,
    padding: 7,
    color: "#fff",
    marginHorizontal: 2,
    fontSize: 10,
  },
});
