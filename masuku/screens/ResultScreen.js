// screens/ResultScreen.js
import React, { useState, useEffect } from "react";
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

import * as Progress from "react-native-progress";
import { ThemedButton } from "react-native-really-awesome-button";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("window");

const winImage = require("@/assets/win.png");
const LostImage = require("@/assets/images/A.png");

const A = require("@/assets/images/A.png");
const B = require("@/assets/images/B.png");
const C = require("@/assets/images/C.png");
const D = require("@/assets/images/D.png");
const E = require("@/assets/images/E.png");
const F = require("@/assets/images/F.png");

export default function ResultScreen({ route, navigation }) {
  const { score, total } = route.params;
  const [currentImage, setCurrentImage] = useState();
  const [currentText, setCurrentText] = useState();
  const [grading, setGrading] = useState();
  const [percentage, setPercentage] = useState();

  const gradingLevels = {
    Excellent: { min: 80, max: 100 },
    Good: { min: 65, max: 79 },
    Okay: { min: 50, max: 64 },
    Poor: { min: 35, max: 49 },
    Fail: { min: 0, max: 34 },
  };

  function getGrade(percent) {
    for (const [grade, range] of Object.entries(gradingLevels)) {
      if (percent >= range.min && percent <= range.max) {
        return grade;
      }
    }
    return "Invalid";
  }

  useEffect(() => {
    setImage();
    setText();
  }, []);

  const setImage = () => {
    const percent = 100 * Math.floor(score / total);
    setPercentage(percent);

    const currentGrade = getGrade(percent);
    setGrading(currentGrade);

    if (percent > 70) {
      // playFinalSound(true)
      setCurrentImage(winImage);
    } else {
      // playFinalSound(false)
      setCurrentImage(LostImage);
    }
  };

  const setText = () => {
    if (Math.floor(score / total) > 0.7) {
      // playFinalSound(true)
      setCurrentText("Practice more to maintain good grades!");
    } else {
      // playFinalSound(false)
      setCurrentText("Practice more to improve!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Final Result</Text>
      <Text style={styles.subHeader}>You're All Done!</Text>

      <Image
        style={styles.subjectImage}
        source={currentImage}
        width={width * 0.8}
        height={300}
      />

      <View style={styles.card}>
        <Text style={styles.percentage}>
          {Math.floor((100 * score) / total)}%
        </Text>

        <Text style={styles.endTextTitle}>
          {getGrade(Math.floor((100 * score) / total))}
        </Text>

        <Text style={styles.endText}>{currentText}</Text>

        <View style={styles.footer}>
          <Text style={{ fontFamily: "Fredoka_400Regular" }}>
            {score} Questions Correct
          </Text>
          <Progress.Bar
            style={styles.historyProgress}
            width={width * 0.65}
            height={20}
            strokeCap={"butt"}
            borderRadius={5}
            borderWidth={0}
            unfilledColor={"#ACE4AC"}
            color={"#6CBA6C"}
            progress={score / total}
            showsText={true}
          />

          <Text style={{ fontFamily: "Fredoka_400Regular" }}>
            {total - score} Questions Wrong
          </Text>
          <Progress.Bar
            style={styles.historyProgress}
            width={width * 0.65}
            height={20}
            strokeCap={"butt"}
            borderRadius={5}
            borderWidth={0}
            unfilledColor={"#FCA4A4"}
            color={"#FC0404"}
            progress={(total - score) / total}
            showsText={true}
          />

          <ThemedButton
            style={styles.button}
            name="bruce"
            type="primary"
            onPress={() => navigation.popToTop()}
            width={width * 0.65}
            height={50}
            borderRadius={5}
          >
            BACK TO MENU
          </ThemedButton>
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
  percentage: {
    fontSize: 80,
    marginBottom: 0,
    textAlign: "center",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    fontWeight: 600,
    borderRadius: 50,
    padding: 0,
  },
  subHeader: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "left",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    width: 300,
    fontWeight: 600,
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    width: width * 0.8,
    top: 10,
    height: height * 0.45,
    // borderWidth:1
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    // justifyContent: "center",
    alignItems: "center",
  },
  button: {
    bottom: 20,
    marginTop: 30,
  },
  historyProgress: {
    borderRadius: 5,
    marginVertical: 0,
    borderWidth: 0,
  },
  endTextTitle: {
    textAlign: "center",
    fontSize: 26,
    color: "blue",
    fontWeight: 600,
    fontFamily: "Fredoka_400Regular",
  },
  endText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Fredoka_400Regular",
  },
});
