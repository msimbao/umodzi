// screens/MyScoresScreen.js
import React, { useEffect, useState} from "react";
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
import SvgBackground from "@/components/SvgBackground";

import { ThemedButton } from "react-native-really-awesome-button";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("window");

const nohistory = require("@/assets/images/nohistory.png");

export default function HistoryListScreen() {
  const [scores, setScores] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("All");


  const subjects = ['All', 'Science', 'Mathematics', 'English']
  // const subjects = useMemo(() => {
  //   const uniqueSubjects = [...new Set(scores.map((item) => item.subject))];
  //   return ["All", ...uniqueSubjects];
  // }, []);

  useEffect(() => {
    const fetchScores = async () => {
      const data = await getScores();
      setScores(data.reverse()); // show most recent first
    };
    fetchScores();
  }, []);

  const filteredData =
    selectedSubject === "All"
      ? scores
      : scores.filter((item) => item.subject === selectedSubject);

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

  const renderItem = ({ item }) => (
    <View style={styles.cards}>

        {/* <SvgBackground
        styles={{borderRadius:10}}
        seed={item.title}
        // patternIndex={1}
        // backgroundColor="#e5e6fa"
        // patternColor="#B8849B"
      /> */}

      <Text style={styles.scoreTitle}>
        Grade {item.grade} - {item.title}
        {item.date.getMinutes}
      </Text>

      <Text style={{ fontSize: 20 }}>
        {Math.floor((100 * item.score) / item.total)} %
      </Text>
      <Text style={{ fontSize: 15 }}>
        Score: {item.score} / {item.total}
      </Text>
      <Progress.Bar
        style={styles.historyProgress}
        progress={item.score / item.total}
        width={width*0.65}
        height={15}
        color={"black"}
      />
      <Text>{new Date(item.date).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <SvgBackground
        seed="zore"
        // patternIndex={1}
        backgroundColor="#e5e6fa"
        patternColor="#B8849B"
      /> */}
      <View>
      <Text style={styles.header}>Recent History</Text>
      <Text style={styles.subHeader}>Track your performance</Text>
            {renderFilterButtons()}

      <View style={styles.card}>
        {filteredData.length === 0 ? (
          <View style={styles.topPart}>
            <View>
              <Image
                style={styles.subjectImage}
                source={nohistory}
                width={width * 0.8}
                height={300}
              />

              <Text style={styles.emptyTextTitle}>No grades yet!</Text>
              <Text style={styles.emptyTextSentence}>
                Take some tests to start tracking
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.card}>

            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: width*0.4}} // <-- Adds space at the bottom
            />
          </View>
        )}
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
    borderRadius: 15,
    width: width * 0.75,
    marginVertical: 10,
    elevation: 3,
    alignItems: "left",
    padding: 20,
    borderColor: "black",
    backgroundColor: "white",
    marginRight:10,
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
  button: {
    bottom: 50,
    marginTop: 50,
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
    marginBottom: 16,
    flexWrap: "wrap",
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginRight: 4,
    marginBottom: 8,
  },
  buttonActive:{
    backgroundColor:"#333"
  },
    buttonTextActive:{
    color:"white",
  },
  card: {
    borderRadius: 5,
    width: width * 0.8,
    alignItems: "center",
    textAlign: "left",
    borderColor: "#333",
    borderWidth: 0,
    height: height * 0.95,
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
});
