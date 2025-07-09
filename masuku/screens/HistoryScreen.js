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
import { useNavigation } from "@react-navigation/native";

export default function HistoryScreen() {
  const navigation = useNavigation();

  const [scores, setScores] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedScore, setSelectedScore] = useState(null);
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(null);
  const [clicked, setClicked] = useState(null);

  const subjects = useMemo(() => {
    const uniqueSubjects = [...new Set(scores.map((item) => item.subject))];
    return ["All", ...uniqueSubjects];
  }, []);

  useEffect(() => {
    const fetchScores = async () => {
      const data = await getScores();
      setScores(data.reverse().slice(0, 10)); // show most recent first
    };
    fetchScores();
  }, []);

  const [loaded, error] = useFonts({
    Fredoka_400Regular,
    Jersey25_400Regular,
  });

  const getGrade = (percentage) => {
    if (percentage == 100) return "PERFECT";
    if (percentage >= 90) return "EXCELLENT";
    if (percentage >= 80) return "GREAT";
    if (percentage >= 70) return "GOOD";
    if (percentage >= 60) return "OKAY";
    if (percentage >= 50) return "POOR";
    return "FAIL";
  };

  const barData = scores.map((item) => ({
    value: (100 * item.score) / item.total,
    grade: item.grade,
    subject: item.subject,
    title: item.title,
    frontColor:
      GradingThemes[getGrade(Math.floor((100 * item.score) / item.total))]
        .backgroundColor,
    fontColor:
      GradingThemes[getGrade(Math.floor((100 * item.score) / item.total))]
        .color,
  }));

  const total = 100; // Max possible score, used for percentage

  // Add onPress and conditional top label
  const chartData = barData.reverse().map((bar, index) => ({
    ...bar,
    onPress: () => {
      setSelectedIndex(index);
      setSelectedGrade(barData[index].grade);
      setSelectedSubjectIndex(barData[index].subject);
      setSelectedTitle(barData[index].title);
      setSelectedScore(barData[index].value);
      setClicked(true);
    },
    labelComponent: () =>
      selectedIndex === index ? (
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: "#333",
            marginBottom: 4,
            textAlign: "center",
          }}
        >
          {/* {Math.round((bar.value / total) * 100)}% */}▲
        </Text>
      ) : null,
  }));

  const gradeCounts = {
    PERFECT: 0,
    EXCELLENT: 0,
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

  const horizontalLinesArbitrary = [
    {
      y: 50, // Value on Y-axis
      color: "red",
      width: 10,
      // dashArray: [],         // Solid line
    },
    {
      y: 75,
      color: "blue",
      width: 1,
      // dashArray: [4, 4],     // Dashed line
    },
  ];

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Recent History</Text>
        <Text style={styles.subHeader}>History of Last 10 Tests</Text>

        <View style={styles.card}>
          <Text
            style={{
              color: "black",
              fontSize: 12,
              fontWeight: "bold",
              textAlign: "center",
              paddingBottom: 20,
              fontFamily: "Jersey25_400Regular",
              fontWeight: 600,
            }}
          >
           CLICK A BAR TO SEE MORE
          </Text>
          {scores.length === 0 ? (
            <Text style={styles.emptyText}>No scores yet. Try a quiz!</Text>
          ) : (
            <BarChart
              maxValue={100}
              noOfSections={4}
              data={chartData}
              barWidth={18}
              spacing={5}
              isAnimated
              width={width * 0.6} // Force a wider chart width
              side="right"
              barBorderRadius={3}
              xAxisThickness={2}
              yAxisThickness={1}
              yAxisColor={"#eee"}
              xAxisColor={"#eee"}
              rulesColor={"#eee"}
              rulesType={"solid"}
              // showReferenceLine1
              // referenceLine1Position={60}
              // referenceLine1Config={{
              //   color: "black",
              //   dashWidth: 10,
              //   dashGap: 5,
              // }}
              // textFontSize={5}
              height={height * 0.2}
              yAxisTextStyle={{
                fontSize: 10, // 👈 change this to your preferred size
                color: "#555",
              }}
            />
          )}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {clicked ? (
              <>
                <Text style={styles.selectedText}>Grade {selectedGrade}</Text>
                <Text style={styles.selectedText}>{selectedSubjectIndex}</Text>
                <Text style={styles.selectedText}>{selectedTitle}</Text>
                <Text
                  style={[
                    styles.selectedText,
                    {
                      backgroundColor: chartData[selectedIndex].frontColor,
                      color: chartData[selectedIndex].fontColor,
                    },
                  ]}
                >
                  {selectedScore}%
                </Text>
              </>
            ) : (
              <View></View>
            )}
          </View>
        </View>

        <View style={[styles.card]}>
          {Object.entries(gradeCounts).map(([grade, count]) => (
            <View key={grade} style={styles.gradingBars}>
              <Text
                style={[
                  styles.selectedText,
                  {
                    width: 80,
                    textAlign: "center",
                    verticalAlign: "middle",
                    height: height * 0.03,
                    fontSize: 12,
                    padding: 0,
                    fontWeight: 600,
                    backgroundColor: "#fff",
                    backgroundColor: GradingThemes[grade].backgroundColor,
                    color: GradingThemes[grade].color,
                  },
                ]}
              >
                {grade}
              </Text>
              <Text
                style={[
                  styles.selectedText,
                  {
                    paddingLeft: 10,
                    width: 60,
                    textAlign: "center",
                    verticalAlign: "middle",
                    height: height * 0.03,
                    fontSize: 12,
                    padding: 0,
                    backgroundColor: GradingThemes[grade].backgroundColor,
                    color: GradingThemes[grade].color,
                  },
                ]}
              >
                {Math.floor((100 * count) / 10)} %
              </Text>

              <Progress.Bar
                style={styles.historyProgress}
                progress={count / 10}
                width={width * 0.37}
                height={height * 0.03}
                color={GradingThemes[grade].backgroundColor}
              />
            </View>
          ))}
        </View>

               <ThemedButton
          style={styles.button}
          onPress={() => navigation.navigate("HistoryList")}
          name="bruce"
          type="primary"
          height={50}
          width={width * 0.80}
          borderRadius={5}
        >
          VIEW DETAILED HISTORY
        </ThemedButton>
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
    borderRadius: 5,
    borderWidth: 0,
    backgroundColor: "#ddd",
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
    borderRadius: 5,
    backgroundColor: "#fff",
    marginRight: 4,
    // marginBottom: 8,
    // marginTop:10,
  },
  card: {
    borderRadius: 0,
    width: width * 0.80,
    alignItems: "center",
    textAlign: "center",
    borderColor: "#333",
    alignSelf:"center",
    borderWidth: 0,
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    elevation:3,
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
    borderRadius: 4,
    padding: 5,
    color: "#fff",
    marginHorizontal: 2,
    fontSize: 10,
    textAlign: "center",
    height: height * 0.03,
  },
  gradingBars: {
    marginVertical: 5,
    alignContent: "center",
    // justifyContent: "space-between" ,
    flexDirection: "row",
    // flexWrap: 'wrap',
    alignItems: "flex-start", // if you want to fill rows left to right
  },
});
