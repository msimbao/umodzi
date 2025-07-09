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

const { width, height } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";

import BackButtons from "@/components/BackButtons"

export default function StoreListScreen({ route, navigation }) {
  const { grade } = route.params;

  const subjects = {
    7: [
      "Science",
      "English",
      "Special Paper 1",
      "Special Paper 2",
      "Mathematics",
      "Social Studies",
    ],
    8: [
      "Science",
      "English",
      "History",
      "Social Studies",
      "Geography",
      "Mathematics",
      "Civics",
      "Religious Education",
      "French",
    ],
    9: [
      "Science",
      "English",
      "History",
      "Social Studies",
      "Geography",
      "Mathematics",
      "Civics",
      "Religious Education",
      "French",
    ],
    10: [
      "Science",
      "English",
      "Biology",
      "Chemistry",
      "Physics",
      "Civic Education",
      "Geography",
      "History",
      "Commerce",
      "Mathematics",
      "Additional Math",
    ],
    11: [
      "Science",
      "English",
      "Biology",
      "Chemistry",
      "Physics",
      "Civic Education",
      "Geography",
      "History",
      "Commerce",
      "Mathematics",
      "Additional Math",
    ],
    12: [
      "Science",
      "English",
      "Biology",
      "Chemistry",
      "Physics",
      "Civic Education",
      "Geography",
      "History",
      "Commerce",
      "Mathematics",
      "Additional Math",
    ],
  };

  const subjectIcons = {
    "Science": "planet",
    "Biology": "leaf",
    "Chemistry": "bonfire",
    "Physics": "speedometer",
    "Mathematics": "calculator",
    "English": "chatbox-ellipses",
    "History": "book",
    "Commerce": "cash",
    "Civic Education": "business",
    "Geography": "earth",
    "Social Studies": "people",
    "Religious Education": "rose",
    "Special Paper 2": "medical",
    "Special Paper 1": "apps",
    "Additional Math": "bar-chart",
  };

  useEffect(() => {}, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cards}
      onPress={() =>
        navigation.navigate("Quizzes", { grade: grade, subject: item })
      }
    >
      <Text style={styles.title}>{item}</Text>
      <Ionicons name={subjectIcons[item]} size={30} color={"#333"} />
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
          // columnWrapperStyle={style.row}
          //   keyExtractor={(subjects)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: width*0.01}} // <-- Adds space at the bottom
          // contentContainerStyle={styles.listContainer} // Optional: styles for the content container
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
    borderRadius: 3,
    width: width * 0.8,
    marginVertical: 5,
    elevation: 3,
    padding: 20,
    backgroundColor: "white",
    top: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    fontWeight: 600,
  },
});
