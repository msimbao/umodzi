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
const LostImage = require("@/assets/lost.png");

export default function ResultScreen({ route, navigation }) {
  const { score, total } = route.params;
  const [currentImage, setCurrentImage] = useState();
  const [currentText,setCurrentText] = useState();

  useEffect(() => {
    setImage();
    setText();
  }, []);

  const setImage = () => {
    if (Math.floor(score / total) > 0.7) {
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
      setCurrentText('You did Really Well! \n Practice more to maintain good grades!');
    } else {
      // playFinalSound(false)
      setCurrentText("You didn't do well \n Keep practicing and you will improve!");
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
       {Math.floor(100*score/total)}%
      </Text>

        <Text style={styles.endText}>
       {currentText}
      </Text>



      <View style={styles.footer}>

   
   <Text>
        {score} Questions Correct
      </Text>
              <Progress.Bar
        style={styles.historyProgress}
        width={width * 0.7}
        height={20}
        strokeCap={"butt"}
        borderRadius={5}
        borderWidth={0}
        unfilledColor={"#ACE4AC"}
        color={"#6CBA6C"}
        progress={score / total}
        showsText={true}
      />

    <Text>
        {total-score} Questions Wrong
      </Text>
      <Progress.Bar
        style={styles.historyProgress}
        width={width * 0.7}
        height={20}
        strokeCap={"butt"}
        borderRadius={5}
        borderWidth={0}
        unfilledColor={"#FCA4A4"}
        color={"#FC0404"}
        progress={(total-score) / total}
        showsText={true}
      />

      <ThemedButton
        style={styles.button}
        name="bruce"
        type="primary"
        onPress={() => navigation.popToTop()}
        width={width * 0.7}
        height={50}
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
    padding: 30,
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
    percentage: {
    fontSize: 80,
    marginBottom: 0,
    textAlign: "center",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    fontWeight: 600,
    // borderWidth:1,
    borderRadius:50,
    padding:0,
    paddingTop:10,
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
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    width: width * 0.8,
    top: 10,
    height: height * 0.45,
  },

  footer: {
    flex: 1,
    justifyContent: "flex-end",
    // justifyContent: "center",
    alignItems: "center",
  },
  button: {
    bottom: 20,
    marginTop: 50,
  },
  historyProgress: {
    borderRadius: 5,
    marginVertical: 10,
    borderWidth: 0,
  },
  endText:{
    textAlign:'center',
    fontSize:16,
  },
  
});
