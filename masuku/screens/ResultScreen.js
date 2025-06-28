// screens/ResultScreen.js
import React, { useState } from "react";
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


    useEffect(() => {
      setImage()
    }, []);

    const setImage = () => {
          if ((numberCorrect/total) > 0.7){
          // playFinalSound(true)
          setCurrentImage(winImage)
        }
        else{
          // playFinalSound(false)
          setCurrentImage(LostImage)
        }
    }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Final Result</Text>
      <Text style={styles.description}>Good Job!</Text>
      <Text>
        Your Score: {score} / {total}
      </Text>

            <Image
              style={styles.subjectImage}
              source={winImage}
              width={width * 0.8}
              height={270}
            />
      <Progress.Bar
        style={styles.historyProgress}
        size={200}
        strokeCap={"butt"}
        borderRadius={5}
        borderWidth={0}
        unfilledColor={"#ddd"}
        color={"#333"}
        progress={score/total}
        showsText={true}
      />

      <ThemedButton
        style={styles.button}
        name="bruce"
        type="primary"
        onPress={() => navigation.popToTop()}
        width={width * 0.8}
        height={50}
      >
        BACK TO MENU
      </ThemedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: height * 0.08,
    alignItems: "left",
    backgroundColor: "#f4f3ee",
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
    height: 600,
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
    bottom: 20,
    marginTop: 50,
  },
  historyProgress: {
    borderRadius: 2,
    marginVertical: 10,
    borderWidth: 0,
  
    // backgroundColor:'#ccc',
    // height:100,
  },
});
