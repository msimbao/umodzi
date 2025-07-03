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

import { ThemedButton } from "react-native-really-awesome-button";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";

export default function StoreListScreen({route, navigation}) {
  const { grade } = route.params;

    const goBack = () => {
    navigation.goBack();
  };

  const subjects =
  {
    7: ['Science', 'English', 'Special Paper 1', 'Special Paper 2', 'Mathematics', 'Social Studies'],
    8: ['Science', 'English', 'History', 'Social Studies', 'Geography' , 'Mathematics','Civics', 'Religious Education', 'French'],
    9: ['Science', 'English', 'History', 'Social Studies', 'Geography' , 'Mathematics','Civics', 'Religious Education', 'French'],
    10: ['Science', 'English', 'Biology', 'Chemistry', 'Physics', 'Civic Education', 'Geography', 'History', 'Commerce', 'Mathematics', 'Additional Math',],
    11: ['Science', 'English', 'Biology', 'Chemistry', 'Physics', 'Civic Education', 'Geography', 'History', 'Commerce', 'Mathematics', 'Additional Math',],
    12: ['Science', 'English', 'Biology', 'Chemistry', 'Physics', 'Civic Education', 'Geography', 'History', 'Commerce', 'Mathematics', 'Additional Math',]
  }
  

  useEffect(() => {
    console.log(grade)

  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.cards}>
      <Text style={styles.scoreTitle}>
        {item}
      </Text>
    
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}> <Ionicons
                name={"arrow-back-circle"}
                onPress={goBack}
                size={25}
                color={"#333"}
              /> Subjects</Text>
      <Text style={styles.subHeader}>Select a Subject</Text>

        <FlatList
          data={subjects[grade]}
        //   keyExtractor={(subjects)}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer} // Optional: styles for the content container

        />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    paddingLeft: 30,
    paddingTop: height * 0.08,
    alignItems: "left",
    backgroundColor: "#e5e6fa",
  },
  listContainer: {
    // marginBottom:10,
    // height:height * 0.9,
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
    marginVertical: 5,
    elevation: 3,
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    top: 0,
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
