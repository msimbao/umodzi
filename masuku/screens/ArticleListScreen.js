import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { getLocalArticles } from "@/utils/QuizStore";

import { ThemedButton } from "react-native-really-awesome-button";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("window");
import ExpandableList from '@/components/ExpandableList'; // Adjust path as needed

import BackButtons from "@/components/BackButtons";
const nohistory = require("@/assets/images/empty.png");

export default function ArticleListScreen({ navigation }) {
  const [quizzes, setQuizzes] = useState([]);
  const [search, setSearch] = useState("");

  const filteredData = quizzes.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    (async () => {
      const data = await getLocalArticles();
      setQuizzes(data);
    })();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.cards}>
      <Text style={styles.title}>{item.title} </Text>
      <Text style={styles.subTitle}>
        Total Words: {item.article.split(" ").length}
      </Text>
      <Text style={styles.subTitle}>
       Duration: {(item.article.split(" ").length)/100} Minutes
      </Text>

      <ThemedButton
        style={styles.button}
        onPress={() => navigation.navigate("Article", { article: item })}
        name="bruce"
        type="primary"
        height={40}
        width={width * 0.7}
      >
        OPEN ARTICLE
      </ThemedButton>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Articles </Text>
        <Text style={styles.subHeader}>Review Saved Articles</Text>
        <BackButtons />

        <TextInput
          placeholder="Search For Articles Here..."
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />

        {quizzes.length === 0 ? (
          <View style={styles.topPart}>
            <View>
              <Image
                style={styles.subjectImage}
                source={nohistory}
                width={width * 0.7}
                height={250}
              />

              <Text style={styles.emptyTextTitle}>No Articles Yet!</Text>
              <Text style={styles.emptyTextSentence}>
                Get Some from the Library!
                <ThemedButton
                  style={styles.button}
                  name="bruce"
                  type="primary"
                  onPress={() => navigation.navigate("Main")}
                  width={width * 0.65}
                  height={50}
                  borderRadius={5}
                >
                  GO TO LIBRARY
                </ThemedButton>
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={filteredData}
            renderItem={renderItem}
                showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: width*0.3}} // <-- Adds space at the bottom
          />
                // <ExpandableList data={filteredData} />
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
  input: {
    height: 70,
    width: width * 0.80,
    backgroundColor: "#fff",
    color: "#333",
    padding: 20,
    elevation: 5,
    borderRadius: 3,
    paddingLeft: 20,
    fontFamily: "Fredoka_400Regular",
    fontSize: 20,
    marginVertical: 10,
    // borderWidth:2,
  },
  cards: {
    backgroundColor: "#fff",
    padding: 20,
    paddingBottom: 0,
    paddingHorizontal:30,
    alignItems: "center",
    justifyContent: "center",
    // elevation: 2,
    width: width * 0.80,
    textAlign: "left",
    borderWidth: 0,
    marginBottom:10,
    borderColor:'#333',
    borderTopWidth:10,
    borderBottomEndRadius:10,
    borderBottomStartRadius:10,
  },

  title: {
    fontSize: 25,
    marginBottom: 10,
    textAlign: "left",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    fontWeight: 600,
    width: 280,
    fontWeight: 600,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 0,
    textAlign: "left",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    width: 280,
    fontWeight: "600",
  },
  button: {
    marginVertical: 20,
  },
  topPart: {
    width: width * 0.80,
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 5,
    padding: 20,
    marginBottom: 5,
  },
  storeImage: {
    bottom: 0,
    resizeMode: "contain",
    alignSelf: "center",
  },
  emptyTextTitle: {
    marginVertical: 20,
    marginBottom: 5,
    textAlign: "center",
    fontFamily: "Jersey25_400Regular",
    fontSize: 40,
  },
  emptyTextSentence: {
    marginVertical: 5,
    textAlign: "center",
    fontFamily: "Fredoka_400Regular",
    fontSize: 15,
  },
  storeImage: {
    bottom: 0,
    resizeMode: "contain",
    alignSelf: "center",
  },
});
