// screens/MyScoresScreen.js
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { ThemedButton } from "react-native-really-awesome-button";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";
import BackButtons from "@/components/BackButtons"
import SubjectThemes from "@/components/subjectThemes"


export default function SubjectListScreen({route, navigation}) {
  const { grade } = route.params;
  // const grade = item;

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
    // console.log((item))
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.cards}
     onPress={() => navigation.navigate("Quizzes", {grade:grade, subject:item})
     }>
      
      <Text style={styles.title}>
        {item}
      </Text>
               <Ionicons name={SubjectThemes[item].icon} size={30} color={"#333"} />
    
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      <View>
      <Text style={styles.header}>Subjects</Text>
      <Text style={styles.subHeader}>Select a Subject</Text>
        <BackButtons />

        <FlatList
          data={subjects[grade]}
        //   keyExtractor={(item)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: width*0.01}} // <-- Adds space at the bottom
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

  cards: {
    borderRadius: 5,
    width: width * 0.8,
    marginVertical: 5,
    elevation: 3,
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "left",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    fontWeight: 600,
  },
});
