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
import { saveQuizzesToLocal } from "@/utils/QuizStore";
import { getLocalQuizzes } from "@/utils/QuizStore";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedButton } from "react-native-really-awesome-button";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";


export default function StoreTestScreen({route, navigation}) {
//   const { grade } = route.params;
    const [DATA, setDATA] = useState(null);
  

    const goBack = () => {
    navigation.goBack();
  };

    const downloadQuizzes = async (link) => {
    fetch(link)
    .then((response) => response.json())
    .then((responseJson) => {
        saveQuizzesToLocal(responseJson);
    })
    
    await saveQuizzesToLocal(quizzesData);
    alert("Quizzes downloaded!");
  };

  useEffect(() => {
getList()
  }, []);

      const getList = () => fetch('https://raw.githubusercontent.com/msimbao/umodziLibrary/refs/heads/main/tests/grade7/english/list.json')
     .then((response) => response.json())
     .then((responseJson) => {
        setDATA(responseJson)
        console.log(DATA)
        // this.setState({ result: responseJson.Cat });
     })
     .catch((error) => {
        console.error(error);
     })

  const renderItem = ({ item }) => (
    <View style={styles.cards}>
      <Text style={styles.scoreTitle}>
        {item.title}
      </Text>
          <ThemedButton
            style={styles.button}
            name="bruce"
            type="primary"
            progress
            onPress={async (next) =>{
                    

                    fetch(item.link)
                .then((response) => response.json())
                .then((responseJson) => {
                    
                    saveQuizzesToLocal(responseJson);
                    // console.log(responseJson)
                })
                alert("Quizzes downloaded!");
                next()
            }}
          >
            CONTINUE
          </ThemedButton>
    </View>
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
          data={DATA}
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
