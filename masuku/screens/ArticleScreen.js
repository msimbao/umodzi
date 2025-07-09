import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { saveArticlesToLocal } from "@/utils/QuizStore";

import BackButtons from "@/components/BackButtons";

const { width, height } = Dimensions.get("window");
import { ThemedButton } from "react-native-really-awesome-button";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import { useFonts } from "expo-font";
import SpeechPlayer from '@/components/SpeechPlayer';

const downloaded = require("@/assets/images/downloaded.png");


export default function ArticleScreen({ route, navigation }) {
  const [loaded, error] = useFonts({
    Fredoka_400Regular,
    Jersey25_400Regular,
  });

  const { article } = route.params;
  const [isConnected, setIsConnected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
 
      <View>
        <Text style={styles.header}>Stories</Text>
        <Text style={styles.subHeader}>Articles to Read, Learn and Share</Text>
        <BackButtons />

        <ScrollView showsVerticalScrollIndicator={false}>
            
          <View style={styles.card}>
            <Image
              style={styles.storeImage}
              source={article.image}
              width={width}
              height={230}
            />

            <Text style={styles.title}>{article.title}</Text>
            <Text style={styles.subtitle}>{article.subtitle}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.article}>{article.article}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.call_to_action}>{article.call_to_action}</Text>

            <ThemedButton
              style={styles.button}
              onPress={() => {
                setModalVisible(true)
                saveArticlesToLocal(article)}
            }
              name="bruce"
              type="primary"
              height={40}
              width={width * 0.65}
              borderRadius={5}
            >
              SAVE ARTICLE
            </ThemedButton>
            <ThemedButton
              style={styles.button}
              onPress={() => navigation.navigate("Main")}
              name="bruce"
              type="secondary"
              height={40}
              width={width * 0.65}
              borderRadius={5}
            >
              RETURN HOME
            </ThemedButton>
          </View>
        </ScrollView>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            
              <View style={styles.modalContainer}>
                <Image
                  style={styles.subjectImage}
                  source={downloaded}
                  width={300}
                  height={300}
                />
               
                  <>
                    <Text style={styles.modalTitle}>Article Saved!</Text>
                    <Text style={styles.modalText}>
                      Keep Reading or Check out your other articles!
                    </Text>
                    <ThemedButton
                      name="bruce"
                      type="primary"
                      onPress={async () => {    
                        navigation.navigate("ArticleList");
                      }}
                      width={width * 0.65}
                      height={50}
                      borderRadius={5}
                    >
                      GO TO ARTICLES
                    </ThemedButton>
                  </>
               
              </View>

            <ThemedButton
              // style={styles.button}
              name="bruce"
              type="secondary"
              onPress={() => setModalVisible(false)}
              width={width * 0.65}
              height={50}
              borderRadius={5}
            >
              CONTINUE READING
            </ThemedButton>
          </View>
        </View>
      </Modal>
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
    // borderRadius: 5,
    borderBottomWidth:5,
    width: width * 0.8,
    marginVertical: 5,
    elevation: 5,
    alignItems: "left",
    padding: 30,
    backgroundColor: "#fff",
    top: 0,
    // borderWidth: 0,
  },

  title: {
    fontSize: 35,
    justifyContent: "left",
    alignContent: "left",
    color: "black",
    fontFamily: "Jersey25_400Regular",
    fontWeight: 600,
  },
  subtitle: {
    fontSize: 14,
    color: "#000",
    textAlign: "left",
    fontFamily: "Fredoka_400Regular",
    fontWeight: 600,
  },
  button: {
    // bottom: 50,
    marginTop: 10,
  },
  article: {
    fontSize: 20,
    fontFamily: "Fredoka_400Regular",
    fontWeight: 600,
    color: "#333",
  },
  call_to_action: {
    fontSize: 20,
    fontFamily: "Jersey25_400Regular",
    fontWeight: 600,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
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
