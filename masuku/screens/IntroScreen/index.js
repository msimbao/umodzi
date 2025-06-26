import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  FlatList,
  Animated,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { ThemedButton } from "react-native-really-awesome-button";

import { Fredoka_400Regular } from '@expo-google-fonts/fredoka';
import { Jersey25_400Regular } from '@expo-google-fonts/jersey-25';
import * as SplashScreen from 'expo-splash-screen';

import { useFonts } from "expo-font";

const imagePath1 = require("@/assets/1.png");
const imagePath2 = require("@/assets/images/NeoStickers/6.png");
const imagePath3 = require("@/assets/images/NeoStickers/11.png");

const { width, height } = Dimensions.get("window");

const slides = [
  {
    key: "one",
    iconName: "arrow-forward-outline",
    image: imagePath1,
    title: "BECOME TOP OF YOUR CLASS!",
    description:
      "Explore engaging quizzes crafted for African learners with rich visuals and local flair.",
    backgroundColor: "#D0F0C0",
  },
  {
    key: "two",
    iconName: "checkmark-outline",
    image: imagePath2,
    title: "Learn & Earn",
    description:
      "Unlock diorama rewards and cute characters as you complete lessons and challenges.",
    backgroundColor: "#B0E0E6",
  },
  {
    key: "three",
    iconName: "checkmark-done-outline",
    image: imagePath3,
    title: "Track Your Growth",
    description:
      "View your progress and revisit lessons anytime in your personalized dashboard.",
    backgroundColor: "#FFDAB9",
  },
];

export default function IntroScreen({ navigation }) {


    const [loaded, error] = useFonts({
    Fredoka_400Regular,
    Jersey25_400Regular,
  });

  // useEffect(() => {
  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded, error]);

  // if (!loaded && !error) {
  //   return null;
  // }

  const handleContinue = async () => {
    await AsyncStorage.setItem("hasSeenIntro", "true");
    navigation.replace("Main");
  };

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (flatListRef.current && index < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: index + 1 });
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          styles.slideContainer,
          { backgroundColor: item.backgroundColor },
        ]}
      >
        <Animated.View style={[styles.card]}>
          {/* <Ionicons name={item.iconName} size={100} color={"white"} /> */}
          <Image
            style={styles.image}
            source={item.image}
          />

          <View style={styles.footer}>
            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.description}>{item.description}</Text>
            {item.key === "one" && (
              <ThemedButton
                style={styles.button}
                onPress={handleNext}
                name="bruce"
                type="primary"
              >
                NEXT
              </ThemedButton>
              // <AwesomeButton onPress={handleNext}>Next</AwesomeButton>
            )}
            {item.key === "two" && (
              // <Pressable style={styles.button} onPress={handleNext}>
              //   <Text style={styles.buttonText}>
              //     <Ionicons name={item.iconName} size={40} color={"black"} />
              //   </Text>
              // </Pressable>
                       <ThemedButton
                style={styles.button}
                onPress={handleNext}
                name="bruce"
                type="primary"
              >
                NEXT
              </ThemedButton>
            )}
            {item.key === "three" && (
              // <Pressable style={styles.button} onPress={handleContinue}>
              //   <Text style={styles.buttonText}>
              //     <Ionicons name={item.iconName} size={40} color={"black"} />
              //   </Text>
              // </Pressable>
                    <ThemedButton
                style={styles.button}
                onPress={handleContinue}
                name="bruce"
                type="primary"
              >
                START!
              </ThemedButton>
            )}
          </View>
        </Animated.View>
      </View>
    );
  };

  return (
    <Animated.FlatList
      ref={flatListRef}
      data={slides}
      horizontal
      pagingEnabled
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={100}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
      )}
      onMomentumScrollEnd={(event) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        setIndex(newIndex);
      }}
    />
  );
}

const styles = StyleSheet.create({
  slideContainer: {
    backgroundColor: "salmon",
    width,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
  card: {
    borderRadius: 20,
    // padding: 30,
    width: width * 0.9,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 20,
    elevation: 10,
    alignItems: "center",
    height: height * 0.9,
    borderColor: "white",
    borderWidth: 0,
    backgroundColor: "white",
    // backgroundColor: "#fff",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    // justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
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
    textAlign: "center",
    marginBottom: 20,
    width: 300,
    fontFamily: "Fredoka_400Regular",
    fontWeight: 600,
  },
  button: {
    // backgroundColor: "",
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 10,
    bottom: 50,
    marginTop: 50,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
  },

  image: {
    flex: 1,
    top: 50,
    width: 400,
    height: null,
    resizeMode: "contain",
    // backgroundColor: '#0553',
  },
});
