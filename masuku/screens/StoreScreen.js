import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { saveQuizzesToLocal } from "@/utils/QuizStore";
import quizzesData from "@/data/quizzes.json"; // Adjust if importing fails in Expo
import { Ionicons } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";

const { width, height } = Dimensions.get("window");
import { ThemedButton } from "react-native-really-awesome-button";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { getNavOptions } from "expo-router/build/views/Sitemap";

import SvgBackground from "@/components/SvgBackground";

const store = require("@/assets/images/30.png");

export default function StoreScreen({ navigation }) {
  const [loaded, error] = useFonts({
    Fredoka_400Regular,
    Jersey25_400Regular,
  });
  const [isConnected, setIsConnected] = useState(null);

  const DATA = [
    {
      id: "1",
      title: "Grade 7",
      grade: 7,
      iconName: "telescope",
    },
    // {
    //   id: "2",
    //   title: "Grade 8",
    //   grade: 8,
    // },
    {
      id: "3",
      title: "Grade 9",
      grade: 9,
      iconName: "sparkles",
    },
    // {
    //   id: "4",
    //   title: "Grade 10",
    //   grade: 10,
    // },
    // {
    //   id: "5",
    //   title: "Grade 11",
    //   grade: 11,
    // },
    {
      id: "6",
      title: "Grade 12",
      grade: 12,
      iconName: "rocket",
    },
  ];

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe(); // Unsubscribe when component unmounts
    };
  }, []);

  const downloadQuizzes = async () => {
    await saveQuizzesToLocal(quizzesData);
    alert("Quizzes downloaded!");
  };

  const goToGrade = (grade) => {
    navigation.navigate("StoreList", { grade });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => goToGrade(item.grade)}
      style={styles.cards}
    >
      <Text style={styles.title}>{item.title}</Text>

      <Ionicons name={item.iconName} size={30} color={"#333"} />
    </TouchableOpacity>
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
        <Text style={styles.header}>Umodzi Library</Text>
        <Text style={styles.subHeader}>Download Books and Quizzes</Text>

        <View style={styles.card}>
          <View style={styles.topPart}>
            <Image
              style={styles.storeImage}
              source={store}
              width={width}
              height={280}
            />

            <Text style={styles.header}>Get Started</Text>
            <Text style={styles.subHeader}>
              Select your grade and start exploring.
            </Text>
          </View>

          {isConnected ? (
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: width * 0.01 }} // <-- Adds space at the bottom
            />
          ) : (
            <View>
              <Text style={styles.emptyText}>No grades posted yet!</Text>
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
  storeImage: {
    bottom: 0,
    resizeMode: "contain",
    alignSelf: "center",
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
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 5,
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
  subjects: {
    fontSize: 14,
    color: "#000",
    textAlign: "left",
    marginBottom: 20,
    width: width * 0.45,
    fontFamily: "Fredoka_400Regular",
    fontWeight: 600,
  },
  button: {
    bottom: 50,
    marginTop: 50,
  },
});
