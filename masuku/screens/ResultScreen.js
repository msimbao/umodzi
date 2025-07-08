// screens/ResultScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { PieChart } from "react-native-gifted-charts";

import * as Progress from "react-native-progress";
import { ThemedButton } from "react-native-really-awesome-button";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("window");
import GradingThemes from "@/utils/gradingTheme"

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
  const [currentText, setCurrentText] = useState();
  const [grading, setGrading] = useState();

  function getGrade(percent) {
    for (const [grade, range] of Object.entries(GradingThemes)) {
      if (percent >= range.min && percent <= range.max) {
        return grade;
      }
    }
    return "Invalid";
  }

  const pieData = [
    { value: score, color: "#333" },
    { value: total - score, color: "#eee" },
  ];

  useEffect(() => {
    setGrading(100 * Math.floor(score / total));
  }, []);

  return (
    <View style={styles.container}>
      <SvgBackground
          seed={"jfeewqax"}
          patternIndex={1}
          backgroundColor={"#CFBCDF"}
          patternColor={"#6A3BCE"}
        />

      <View>
        <Text style={styles.header}>Final Result</Text>
        <Text style={styles.subHeader}>Congrats on Finishing!</Text>

        <View style={styles.card}>
          <PieChart
            donut
            showText
            textColor="black"
            radius={100}
            textSize={20}
            sectionAutoFocus
            innerRadius={80}
            // showTextBackground
            // textBackgroundRadius={0}
            isAnimated
            data={pieData}
            centerLabelComponent={() => {
              return (
                <Text style={{ paddingLeft: 10, fontSize: 30 }}>
                  {100 * (score / total)}%
                </Text>
              );
            }}
          />

          <View style={styles.footer}>
            <Text style={[styles.endTextTitle,{color:GradingThemes[getGrade(grading)].color, backgroundColor:GradingThemes[getGrade(grading)].backgroundColor}]}>
              {getGrade(grading)}
            </Text>

            <Text style={styles.endText}>
              {GradingThemes[getGrade(grading)].text}
            </Text>

            <ThemedButton
              style={styles.button}
              name="bruce"
              type="primary"
              onPress={() => navigation.popToTop()}
              width={width * 0.65}
              height={50}
              borderRadius={5}
            >
              BACK TO LIBRARY
            </ThemedButton>
            <ThemedButton
              style={styles.button}
              name="bruce"
              type="secondary"
              onPress={() => navigation.navigate("Main", { screen: "History" })}
              width={width * 0.65}
              height={50}
              borderRadius={5}
            >
              GO TO HISTORY
            </ThemedButton>
          </View>
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
  subjectImage: {
    alignSelf: "center",
    marginBottom: 40,
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    paddingVertical: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    width: width * 0.8,
    top: 10,
    height: 570,
    // borderWidth:1
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    // justifyContent: "center",
    alignItems: "center",
  },
  button: {
    // bottom: 20,
    marginTop: 20,
  },
  historyProgress: {
    borderRadius: 5,
    marginVertical: 0,
    borderWidth: 0,
  },
  endTextTitle: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontWeight: 600,
    fontFamily: "Fredoka_400Regular",
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  endText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Fredoka_400Regular",
    width: 250,
  },
});
