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

import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import * as SplashScreen from "expo-splash-screen";

import { useFonts } from "expo-font";

const imagePath1 = require("@/assets/1.png");
const imagePath2 = require("@/assets/2.png");
const imagePath3 = require("@/assets/3.png");

const { width, height } = Dimensions.get("window");

const slides = [
  {
    key: "one",
    iconName: "arrow-forward-outline",
    image: imagePath1,
    title: "STUDY SMARTER",
    description:
      "Access thousands of digital resources to learn, revise, and practice—wherever you are, whenever you need.",
    backgroundColor: "#e5e6fa",
  },
  {
    key: "two",
    iconName: "checkmark-outline",
    image: imagePath2,
    title: "STUDY CORRECTLY",
    description:
      "Take tests & quizzes, get graded immediately, and understand your mistakes through instant corrections",
    backgroundColor: "#d8bfd8",
  },
  {
    key: "three",
    iconName: "checkmark-done-outline",
    image: imagePath3,
    title: "STUDY BEYOND",
    description:
      "Explore topics like saving, investing, and building a future—because education is more than passing tests.",
    backgroundColor: "#fddab8",
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
          <Image style={styles.image} source={item.image} />

          <View style={styles.background}></View>

          <View style={styles.footer}>
            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.description}>{item.description}</Text>
            {item.key === "one" && (
              <ThemedButton
                style={styles.button}
                onPress={handleNext}
                name="bruce"
                type="primary"
                height={50}
                // borderRadius={0}
              >
                NEXT
              </ThemedButton>
            )}
            {item.key === "two" && (
              <ThemedButton
                style={styles.button}
                onPress={handleNext}
                name="bruce"
                type="primary"
                height={50}
                // borderRadius={0}
              >
                NEXT
              </ThemedButton>
            )}
            {item.key === "three" && (
              <ThemedButton
                style={styles.button}
                onPress={handleContinue}
                name="bruce"
                type="primary"
                height={50}
                // borderRadius={0}
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
    width: width * 0.9,
    alignItems: "center",
    height: height * 0.9,
    bottom: 50,
  },
  background: {
    borderRadius:10,
    width: width * 0.9,
    elevation: 10,
    alignItems: "center",
    height: height * 0.75,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    zIndex: -1,
    borderWidth: 0,
  },
  introHeader: {
    fontSize: 40,
    marginBottom: 0,
    textAlign: "center",
    color: "black",
    fontFamily: "Jersey25_400Regular",
    width: 300,
    fontWeight: 600,
    position: "absolute",
    top: 100,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    // justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    marginBottom: 0,
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
    marginBottom: 20,
    width: 250,
    fontFamily: "Fredoka_400Regular",
    fontWeight: 600,
  },
  button: {
    bottom: 50,
    marginTop: 50,
  },
  image: {
    flex: 1,
    top: height * 0.15,
    width: 500,
    height: null,
    resizeMode: "contain",
    // backgroundColor: '#0553',
  },
});
