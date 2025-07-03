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

const store = require("@/assets/store.png");
const g7Image = require("@/assets/g7.png");
const g8Image = require("@/assets/g8.png");
const g9Image = require("@/assets/g9.png");
const g10Image = require("@/assets/g10.png");
const g11Image = require("@/assets/g11.png");
const g12Image = require("@/assets/g12.png");

export default function StoreScreen({ navigation }) {
  const [loaded, error] = useFonts({
    Fredoka_400Regular,
    Jersey25_400Regular,
  });
  // const [grade, setGrade] = useState([]);
  const [isConnected, setIsConnected] = useState(null);

  const DATA = [
    {
      id: "1",
      image: g7Image,
      title: "Grade 7",
      grade: 7,
    },
    // {
    //   id: "2",
    //   image: g8Image,
    //   title: "Grade 8",
    //   grade: 8,
    // },
    {
      id: "3",
      image: g9Image,
      title: "Grade 9",
      grade: 9,
    },
    // {
    //   id: "4",
    //   image: g10Image,
    //   title: "Grade 10",
    //   grade: 10,
    // },
    // {
    //   id: "5",
    //   image: g11Image,
    //   title: "Grade 11",
    //   grade: 11,
    // },
    {
      id: "6",
      image: g12Image,
      title: "Grade 12",
      grade: 12,
    },
  ];

  // useEffect(() => {
  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded, error]);

  // if (!loaded && !error) {
  //   return null;
  // }

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
    // setGrade(currentGra)
    navigation.navigate("StoreList", { grade });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
    onPress={() => goToGrade(item.grade)}
    style={styles.cards}
    >
      <Image
        style={styles.subjectImage}
        source={item.image}
        width={width * 0.5}
        height={height * 0.19}
      />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
            <View style={styles.footer}>
      
      <Text style={styles.header}>Umodzi Library</Text>
      <Text style={styles.subHeader}>Download Books and Quizzes</Text>
        <View style={styles.background}></View>

      <View style={styles.card}>
        
        <Image
          style={styles.subjectImage}
          source={store}
          width={width * 0.8}
          height={300}
        />

        <Text style={styles.header}>Umodzi Library</Text>
        <Text style={styles.subHeader}>Download Books and Quizzes</Text>

        {isConnected ? (
          <View style={{ width: width, height: height }}>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
          horizontal={true} // This prop makes the FlatList horizontal
          showsHorizontalScrollIndicator={true} // Optional: hides the horizontal scroll indicator
          contentContainerStyle={styles.listContainer} // Optional: styles for the content container
          // snapToAlignment="start"
          decelerationRate={"fast"}
          // snapToInterval={Dimensions.get("window").width}
            />
          </View>
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
    paddingLeft: 0,
    paddingTop: height * 0.08,
    alignItems: "center",
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
    bottom: 0,
    resizeMode: "contain",
    position: "absolute",
    right: width * 0.3,
  },
  card: {
    borderRadius: 5,
    width: width * 0.8,
    // elevation: 5,
    alignItems: "center",
    textAlign: "left",
    padding: 20,
    borderColor: "#333",
    borderWidth: 0,
    // backgroundColor: "white",
    top: 20,
    height: height * 0.77,
    zIndex:2,
  },
  background:{
    width:width * 0.8,
    height:height*0.5,
    position:'absolute',
    top:height*0.11,
    backgroundColor:'white',
    elevation:5,
    zIndex:1,
    borderRadius:5,

  },
  cards: {
    borderRadius: 5,
    width: width * 0.5,
    elevation: 5,
    alignItems: "center",
    textAlign: "left",
    padding: 5,
    margin: 10,
    backgroundColor: "#fff",
    height: height * 0.25,
    zIndex:3,
  },
    listContainer: {
    paddingHorizontal: 10, // Add padding to the sides of the list
    marginLeft:10,
  },
  title: {
    fontSize: 30,
    textAlign: "left",
    color: "black",
    fontFamily: "Jersey25_400Regular",
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
  footer: {
    flex: 1,
    // justifyContent: "flex-end",
    alignItems: "left",
  },
});
