// screens/MyScoresScreen.js
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import { getScores } from '@/utils/ScoreTracker';
import * as Progress from 'react-native-progress';

import { ThemedButton } from "react-native-really-awesome-button";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("window");

export default function HistoryScreen() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const data = await getScores();
      setScores(data.reverse()); // show most recent first
    };
    fetchScores();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.cards}>
      <Text style={styles.scoreTitle}>Grade {item.grade} - {item.title}</Text>
      <Text>Score: {item.score} / {item.total}</Text>
        <Progress.Bar style={styles.historyProgress} progress={item.score/item.total} width={200} height={20} color={'black'} />
      <Text>{new Date(item.date).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

           <Text style={styles.header}>Recent History</Text>
            <Text style={styles.subHeader}>Track your performance</Text>
      
      
      {scores.length === 0 ? (
        <Text style={styles.emptyText}>No scores yet. Try a quiz!</Text>
      ) : (
        <FlatList
          data={scores}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    paddingLeft:30,
    paddingTop:height * 0.08,
    alignItems: 'left',
    backgroundColor: '#e5e6fa'
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
    borderRadius: 5,
    width: width * 0.8,
    marginVertical:10,
    elevation: 3,
    alignItems: "center",
    padding:20,
    borderColor: "white",
    borderWidth: 0,
    backgroundColor: "white",
    top:20,
  },
    scoreTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
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
    borderRadius:2,
    marginVertical:10,
    borderWidth:0,
    backgroundColor:'#ccc',
    // height:100,
  }
});
