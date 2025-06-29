import React, { useEffect, useState, useRef } from "react";
import { 
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import { saveQuizzesToLocal } from '@/utils/QuizStore';
import quizzesData from '@/data/quizzes.json'; // Adjust if importing fails in Expo

const { width, height } = Dimensions.get("window");

import { ThemedButton } from "react-native-really-awesome-button";
import { Fredoka_400Regular } from '@expo-google-fonts/fredoka';
import { Jersey25_400Regular } from '@expo-google-fonts/jersey-25';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";

const headerImage = require("@/assets/store.png");

export default function StoreScreen() {

      const [loaded, error] = useFonts({
      Fredoka_400Regular,
      Jersey25_400Regular,
    });
  
    useEffect(() => {
      if (loaded || error) {
        SplashScreen.hideAsync();
      }
    }, [loaded, error]);
  
    if (!loaded && !error) {
      return null;
    }

  const downloadQuizzes = async () => {
    await saveQuizzesToLocal(quizzesData);
    alert("Quizzes downloaded!");
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.header}>Umodzi Library</Text>
      <Text style={styles.subHeader}>Download Books and Quizzes</Text>

              <View style={styles.card}>
                  <Image
                style={styles.headerImage}
                source={headerImage}
                width={width*0.9}
                height={400}
              />

                    {/* <Button title="Download Quizzes" onPress={downloadQuizzes} /> */}

      <Text style={styles.title}>Get Some Quizzes</Text>
      <Text style={styles.description}>Right now we have nothing in the store because it is till being built but have demos.</Text>

               <ThemedButton
                      // style={styles.button}
                      onPress={downloadQuizzes}
                      name="bruce"
                      type="primary"
                    >
                      GET EXAMPLE QUIZZES
                    </ThemedButton>

              </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    paddingLeft:0,
    paddingTop:height * 0.08,
    alignItems: 'center',
    backgroundColor: '#e5e6fa'
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
  card: {
    borderRadius: 5,
    width: width * 0.8,

    elevation: 3,
    alignItems: "center",
    padding:40,
    paddingTop:0,
    borderColor: "white",
    borderWidth: 0,
    backgroundColor: "white",
    top:20,
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
    marginBottom: 20,
    width: 250,
    fontFamily: "Fredoka_400Regular",
    fontWeight: 600,
  },
  button: {
    bottom: 50,
    marginTop: 50,
  },
});
