// screens/ResultScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { PieChart } from "react-native-gifted-charts";

import * as Progress from "react-native-progress";
import { ThemedButton } from "react-native-really-awesome-button";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("window");
import SvgBackground from "@/components/SvgBackground";

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
  // const [percentage, setPercentage] = useState();
  const percentage = score / total;

  const gradingLevels = {
    Excellent: { min: 90, max: 100, image:A },
    Great: { min: 80, max: 89, image:B },
    Good: { min: 70, max: 79, image:C },
    Okay: { min: 60, max: 69, image:D },
    Poor: { min: 50, max: 59,image:E },
    Fail: { min: 0, max: 49,image:F },
  };

  function getGrade(percent) {
    for (const [grade, range] of Object.entries(gradingLevels)) {
      if (percent >= range.min && percent <= range.max) {
        return grade;
      }
    }
    return "Invalid";
  }

      const pieData = [
        {value: score, color: '#333'},
        {value: total-score, color: '#eee'},
        // {value: 20, color: '#ED6665', text: '26%'},

    ];

    

  useEffect(() => {
    
    const percent = 100 * Math.floor(score / total);
    // setPercentage(percent);

    const currentGrade = getGrade(percent);
    setGrading(currentGrade);

    setCurrentImage(gradingLevels[currentGrade].image)


    setText();
  }, []);



  const setText = () => {
    if (Math.floor(score / total) > 0.7) {
      // playFinalSound(true)
      setCurrentText("Practice more to maintain good grades!");
    } else {
      // playFinalSound(false)
      setCurrentText("Practice more. You will improve!");
    }
  };

  return (
    <View style={styles.container}>
        {/* <SvgBackground
          seed={"jfeewqax"}
          patternIndex={1}
          backgroundColor={"#CFBCDF"}
          patternColor={"#6A3BCE"}
        /> */}
        
        <View>
      <Text style={styles.header}>Final Result</Text>
      <Text style={styles.subHeader}>You're All Done!</Text>


      <View style={styles.card}>


      <Image
        style={styles.subjectImage}
        source={currentImage}
        width={width * 0.7}
        height={200}
      />
            <PieChart
            donut
            showText
            textColor="black"
            radius={80}
            textSize={20}
            sectionAutoFocus
            innerRadius={60}
            // showTextBackground
            // textBackgroundRadius={0}
            data={pieData}
            centerLabelComponent={() => {
                return <Text style={{paddingLeft:10,fontSize: 30}}>{100 * (score/total)}%</Text>;
                }}
            />

        <View style={styles.footer}>
          {/* <Text style={{ fontFamily: "Fredoka_400Regular" }}>
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
          /> */}


          {/* <Text style={{ fontFamily: "Fredoka_400Regular" }}>
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
          /> */}

        <Text style={styles.endTextTitle}>
          {getGrade(Math.floor((100 * score) / total))}
        </Text>

        <Text style={styles.endText}>{currentText}</Text>

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
    marginBottom:40,
   },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    paddingVertical:50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    width: width * 0.8,
    top: 10,
    height: height * 0.8,
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
    fontSize: 26,
    color: "black",
    fontWeight: 600,
    fontFamily: "Fredoka_400Regular",
  },
  endText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Fredoka_400Regular",
  },
});
