import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import BackButtons from "@/components/BackButtons"

const { width, height } = Dimensions.get("window");

export default function StoreGradeScreen({ navigation }) {
  const [quizzes, setQuizzes] = useState([]);

  const [loaded, error] = useFonts({
    Fredoka_400Regular,
    Jersey25_400Regular,
  });


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cards}
      onPress={() => navigation.navigate("StoreList", { grade:item })}
    >
      <Text style={styles.title}>Grade {item}</Text>
      <Ionicons name={gradesIcons[item]} size={30} color={"#333"} />
      {/* <Text style={styles.subjects}>Mathematics, English, Science, Social Studies, Special Paper 1, Special Paper 2</Text> */}
    </TouchableOpacity>
  );


  const grades = [7, 8, 9, 10, 11, 12];

  const gradesIcons = {
    7: "telescope",
    8: "school",
    9: "sparkles",
    10: "sunny",
    11: "aperture",
    12: "rocket",
  };

  return (
    <View style={styles.container}>

      <View>
        <Text style={styles.header}>Test Library</Text>
        <Text style={styles.subHeader}>Select a grade to find tests</Text>
    <BackButtons />

        <FlatList
          data={grades}
          renderItem={renderItem}
        />

 
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
    // marginBottom: 10,
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
  cards: {
    borderRadius: 5,
    width: width * 0.8,
    elevation: 5,
    padding: 19,
    // paddingHorizontal:20,
    backgroundColor: "#fff",
    height: height * 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
    marginVertical: 5,
  },
  title: {
    fontSize: 18,
    textAlign: "left",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    fontWeight: 600,
  },
});
