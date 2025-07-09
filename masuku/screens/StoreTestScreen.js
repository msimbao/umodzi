// screens/MyScoresScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  Modal,
} from "react-native";

import { saveQuizzesToLocal } from "@/utils/QuizStore";
import { getLocalQuizzes } from "@/utils/QuizStore";
import * as Progress from "react-native-progress";
import { Picker } from "@react-native-picker/picker";

import { ThemedButton } from "react-native-really-awesome-button";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("window");

import BackButtons from "@/components/BackButtons";
const membership = require("@/assets/images/membership.png");
const downloaded = require("@/assets/images/downloaded.png");

const missing = require("@/assets/images/missing.png");

export default function StoreTestScreen({ route, navigation }) {
  const { grade, subject } = route.params;
  const [DATA, setDATA] = useState();
  const [downloadedQuiz, setDownloadedQuiz] = useState();
  const [selectedCost, setSelectedCost] = useState("All");
  
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [cost, setCost] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const costs=["All","Free","Premium"]

    const costFilteredData =
    selectedCost === "All"
      ? DATA
      : DATA.filter((item) => item.cost === selectedCost.toLowerCase());

  const [loaded, issue] = useFonts({
    Fredoka_400Regular,
    Jersey25_400Regular,
  });

  //   const filteredData = DATA.filter((item) =>
  //   item.title.toLowerCase().includes(search.toLowerCase())
  // );

  useEffect(() => {
    // const gradeStr = String(grade).toLowerCase();
    const gradeStr = String(grade);
    const subjectStr = String(subject);
    const baseUrl =
      "https://raw.githubusercontent.com/msimbao/umodziLibrary/refs/heads/main/tests/grade";
    const endUrl = "/list.json";

    const url = `${baseUrl}${gradeStr}${"/"}${subjectStr.replace(/ /g,'')}${endUrl}`;
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
    <View style={[styles.cards, (item.cost != "free") && styles.premiumCard]}>
      <Text style={styles.title}>{item.title}</Text>

      <View style={styles.footer}>
      <Text style={[
                      styles.cost,
                     (item.difficulty == "easy") && styles.easy,
                     (item.difficulty == "medium") && styles.medium,
                     (item.difficulty == "hard") && styles.hard,
                     ]}>{item.difficulty.toUpperCase()}</Text>
      <Text style={[styles.cost, (item.cost != "free") && styles.premiumText]}>{item.cost.toUpperCase()}</Text>
      <ThemedButton
        style={styles.button}
        name="bruce"
        type="secondary"
        height={50}
        width={width * 0.3}
        onPress={async (next) => {
          handleItemPress(item);
          setCost(item.cost);
          if (item.cost != "free") {
            setModalVisible(true);
          } else {
            fetch(item.link)
              .then((response) => response.json())
              .then((responseJson) => {
                saveQuizzesToLocal(responseJson);
                setDownloadedQuiz(responseJson);
              });
            // alert("Quizzes downloaded!");
          }
          next();
        }}
      >
        GET
      </ThemedButton>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Grade {grade}</Text>
        <Text style={styles.subHeader}>{subject} Tests</Text>
        <BackButtons />
                <Picker
                  selectedValue={selectedCost}
                  onValueChange={(value) => setSelectedCost(value)}
                  style={styles.picker}
                >
                  {costs.map((cost) => (
                    <Picker.Item label={cost} value={cost} key={cost} />
                  ))}
                </Picker>

        {loading ? (
          <View style={styles.topPart}>
            <View>
              <View style={{ alignSelf: "center" }}>
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
            {/* <TextInput
              placeholder="Search For Tests Here..."
              value={search}
              onChangeText={setSearch}
              style={styles.input}
            /> */}

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
                 <ThemedButton
                                style={styles.button}
                                name="bruce"
                                type="primary"
                                onPress={() => navigation.navigate("Main")}
                                width={width * 0.65}
                                height={50}
                                borderRadius={5}
                              >
                                GO HOME
                              </ThemedButton>
              </Text>
                             
            </View>
          </View>
        ) : (
          <FlatList
            data={costFilteredData}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            // contentContainerStyle={{ paddingBottom: width * 0.01 }} // <-- Adds space at the bottom
            contentContainerStyle={styles.listContainer}
            columnWrapperStyle={styles.row}
            numColumns={2} 
          />
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {cost == "free" ? (
                <View style={styles.modalContainer}>
                  <Image
                    style={styles.subjectImage}
                    source={downloaded}
                    width={300}
                    height={300}
                  />
                  {selectedItem && (
                    <>
                      <Text style={styles.modalTitle}>Test Downloaded!</Text>
                      <Text style={styles.modalText}>
                        Start the test or keep browsing!
                      </Text>
                      <ThemedButton
                        // style={styles.button}
                        name="bruce"
                        type="primary"
                        onPress={async () => {
                          const data = await getLocalQuizzes();
                          const filtered = data.filter(
                            (item) => item.id == selectedItem.id
                          );
                          const quiz = filtered[0]
                         navigation.navigate("Quiz", { quiz: downloadedQuiz })
                        
                        }}
                        width={width * 0.65}
                        height={50}
                        borderRadius={5}
                      >
                        GO TO TEST
                      </ThemedButton>
                    </>
                  )}
                </View>
              ) : (
                <View style={styles.modalContainer}>
                  <Image
                    style={styles.subjectImage}
                    source={membership}
                    width={300}
                    height={300}
                  />
                  <Text style={styles.modalTitle}>Membership Required</Text>
                  <Text style={styles.modalText}>
                    Get Access to this test and more to accelerate your education and success!
                  </Text>
                  <ThemedButton
                    // style={styles.button}
                    name="bruce"
                    type="primary"
                    onPress={() => setModalVisible(false)}
                    width={width * 0.65}
                    height={50}
                    borderRadius={5}
                  >
                    GET A MEMBERSHIP
                  </ThemedButton>
                </View>
              )}

              {/* <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            // </TouchableOpacity> */}
              <ThemedButton
                // style={styles.button}
                name="bruce"
                type="secondary"
                onPress={() => setModalVisible(false)}
                width={width * 0.65}
                height={50}
                borderRadius={5}
              >
                CONTINUE BROWSING
              </ThemedButton>
            </View>
          </View>
        </Modal>
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
    listContainer: {
    // paddingHorizontal: 0, // No outer padding
    width: width * 0.8,
    marginTop:5,
  },
  row: {
    justifyContent: 'space-between',
    // marginBottom: 10,
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
    alignSelf: "center",
  },
  headerImage: {
    top: -20,
    resizeMode: "contain",
  },
  input: {
    height: 70,
    width: width * 0.8,
    backgroundColor: "#fff",
    color: "#333",
    padding: 20,
    elevation: 5,
    borderRadius: 5,
    paddingLeft: 20,
    fontFamily: "Fredoka_400Regular",
    fontSize: 20,
    marginVertical: 10,
  },
  cards: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "left",
    justifyContent: "center",
    elevation: 5,
    width: width * 0.390,
    textAlign: "left",
    borderWidth: 0,
    marginBottom: 10,
    borderColor: "#333",
    // borderTopWidth: 5,
    borderRadius:5,
    
  },

  title: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: "center",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    fontWeight: 600,
    // width: 280,
    fontWeight: 600,
  },

    cost: {
    fontSize: 13,
    marginBottom: 0,
    textAlign: "center",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    fontWeight: "600",
    backgroundColor:"#333",
    color:"#fff",
    borderRadius:3,
    padding:5,
    marginVertical:5,
  },
    premiumCard:{
    backgroundColor:'#FFFFee',
    borderWidth:2,
    borderStyle:"dotted",
  },
    premiumText: {
      backgroundColor:"#F8C630",
      color:"#333",
      borderWidth:0,
      borderStyle:"solid",
    },
    easy: {
      backgroundColor:"#60bb08",
      color:"#fff",
      borderWidth:0,
    },
       medium: {
      backgroundColor:"lightblue",
      color:"#333",
      borderWidth:0,
    },
       hard: {
      backgroundColor:"#FF674D",
      color:"#fff"
    },
  button: {
    marginVertical: 20,
  },
  topPart: {
    width: width * 0.8,
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 5,
    padding: 20,
    marginVertical: 10,
    paddingTop: 50,
    alignContent: "center",
    justifyContent: "center",
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
    footer: {
    flex: 1,
    justifyContent: "flex-end",
    // justifyContent: "center",
    alignItems: "left",
  },

    picker: {
    height: 50,
    width: width * 0.8,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  //Modal ==================================================
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 5,
    marginHorizontal: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Jersey25_400Regular",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Fredoka_400Regular",
  },
  closeButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
