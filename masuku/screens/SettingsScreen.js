import React, { useEffect, useState, useRef } from "react";
import { View, Text, Button, Alert, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedButton } from "react-native-really-awesome-button";
import { Fredoka_400Regular } from '@expo-google-fonts/fredoka';
import { Jersey25_400Regular } from '@expo-google-fonts/jersey-25';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";

const { width, height } = Dimensions.get("window");

export default function SettingsScreen({ navigation }) {

      const [loaded, error] = useFonts({
      Fredoka_400Regular,
      Jersey25_400Regular,
    });


  const resetIntro = async () => {
    await AsyncStorage.removeItem('hasSeenIntro');
    Alert.alert('Intro Reset', 'The intro will be shown again next time.');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Intro' }],
    });
  };


  const resetAll = async () => {
    await AsyncStorage.clear(); 
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Settings</Text>
          <Text style={{ fontSize: 24, marginBottom: 20 }}>Nothing here yet</Text>
                  <Text style={{ fontSize: 24, marginBottom: 20 }}>(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧</Text>

               <ThemedButton
                      style={styles.button}
                      onPress={resetIntro}
                      name="bruce"
                      type="primary"
                    >
                      RESET INTRO
                    </ThemedButton>

    <ThemedButton
                      style={styles.button}
                      onPress={resetAll}
                      name="bruce"
                      type="primary"
                    >
                      RESET ALL MEMORY
                    </ThemedButton>
      {/* <Button title="Reset Intro" onPress={resetIntro} /> */}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:0,
    paddingLeft:0,
    paddingTop:height * 0.08,
    alignItems: 'center',
    backgroundColor: '#f4f3ee'
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
    listContainer: {
    paddingHorizontal: 10, // Add padding to the sides of the list
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    width:width*0.8,
    top:10,
    height:600,
  },
    subjectImage: {
    top: 0,
    resizeMode: "contain",
  },
    title: {
    fontSize: 40,
    marginBottom: 10,
    textAlign: "center",
    color: "black",
    fontFamily: "Jersey25_400Regular",
    width: 300,
    fontWeight: 600,
  },
  description: {
    fontSize: 20,
    color: "#000",
    textAlign: "justify",
    marginBottom: 10,
    width: 250,
    fontFamily: "Fredoka_400Regular",
    fontWeight: 600,
  },
    footer: {
    flex: 1,
    justifyContent: "flex-end",
    // justifyContent: "center",
    alignItems: "center",
  },
    button: {
    bottom: 20,
    marginTop: 50,
  },
});

