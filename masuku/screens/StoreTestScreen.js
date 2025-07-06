// screens/MyScoresScreen.js
import React, { useEffect, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
} from "react-native";

import { saveQuizzesToLocal } from "@/utils/QuizStore";
import { getLocalQuizzes } from "@/utils/QuizStore";
import * as Progress from "react-native-progress";


import { ThemedButton } from "react-native-really-awesome-button";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("window");

import BackButtons from "@/components/BackButtons";
const missing = require("@/assets/images/missing.png");

export default function StoreTestScreen({ route, navigation }) {
  const { grade, subject } = route.params;
  const [DATA, setDATA] = useState();
  // const [testsExist, setTestsExist] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    // const gradeStr = String(grade).toLowerCase();
    const gradeStr = String(grade);
    const subjectStr = String(subject);
    const baseUrl =
      "https://raw.githubusercontent.com/msimbao/umodziLibrary/refs/heads/main/tests/grade";
    const endUrl = "/list.json";

    const url = `${baseUrl}${gradeStr}${"/"}${subjectStr}${endUrl}`;
    getList(url);
  }, []);

  const getList = (url) =>
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setDATA(responseJson);
        setError(false);
        // this.setState({ result: responseJson.Cat });
      })
      .catch((error) => {
        // console.error(error);
        setError(true);
      })
      .finally(() => setLoading(false));

  const renderItem = ({ item }) => (
    <View style={styles.cards}>
      <Text style={styles.title}>{item.title}</Text>
      <ThemedButton
        style={styles.button}
        name="bruce"
        type="primary"
        // progress
        onPress={async (next) => {
          fetch(item.link)
            .then((response) => response.json())
            .then((responseJson) => {
              saveQuizzesToLocal(responseJson);
            });
          alert("Quizzes downloaded!");

          next();
        }}
      >
        CONTINUE
      </ThemedButton>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Subjects</Text>
        <Text style={styles.subHeader}>Select a Subject</Text>
        <BackButtons />
        {loading ? (
           <View style={styles.topPart}>
            <View>
                  <View style={{alignSelf:'center'}}>
                  <Progress.Bar
                    size={50}
                    height={20}
                    indeterminate={true}
                    color="#333" // Purple
                    borderRadius={0}
                    borderWidth={2}
                  />
                  </View>
                 <Text style={styles.emptyTextTitle}>Loading</Text>
                       <Text style={styles.emptyTextSentence}>
                         Tests will be found soon!
                       </Text>
                    </View>
          </View>
        ) : error ? (
            <View style={styles.topPart}>
                     <View>
                       <Image
                         style={styles.missingImage}
                         source={missing}
                         width={width * 0.6}
                         height={250}
                       />
         
                       <Text style={styles.emptyTextTitle}>No Tests Found!</Text>
                       <Text style={styles.emptyTextSentence}>
                         There is a problem with the internet
                       </Text>
                     </View>
                   </View>
        ) : (
          <FlatList
            data={DATA}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: width*0.01}} // <-- Adds space at the bottom

          />
        )}
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
    // width: width * 0.8,
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
  missingImage: {
    alignSelf:'center'
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
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "black",
    fontFamily: "Jersey25_400Regular",
    width: 300,
    fontWeight: 600,
  },
  topPart: {
    width: width * 0.8,
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 5,
    padding: 20,
    marginVertical:10,
    paddingTop: 50,
    alignContent:'center',
    justifyContent:'center',
  },
  emptyTextTitle: {
    marginTop: 10,
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
