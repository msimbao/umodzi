import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedButton } from "react-native-really-awesome-button";

import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import * as SplashScreen from "expo-splash-screen";
import SvgBackground from "@/components/SvgBackground";

import { useFonts } from "expo-font";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

const imagePath1 = require("@/assets/images/4.png");
const imagePath2 = require("@/assets/images/2.png");
const imagePath3 = require("@/assets/images/3.png");

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
    seed: "zore",
  },
  {
    key: "two",
    iconName: "checkmark-outline",
    image: imagePath2,
    title: "STUDY CORRECTLY",
    description:
      "Take tests & quizzes, get graded immediately, and understand your mistakes through instant corrections",
    backgroundColor: "#d8bfd8",
    seed: "ase",
  },
  {
    key: "three",
    iconName: "checkmark-done-outline",
    image: imagePath3,
    title: "STUDY BEYOND",
    description:
      "Explore topics that take you further than your classes - a bright future is about more than passing tests.",
    backgroundColor: "#fddab8",
    seed: "eleven",
  },
];

export default function IntroScreen({ navigation }) {
    const [index, setIndex] = useState(0);
  const [loaded, error] = useFonts({
    Fredoka_400Regular,
    Jersey25_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const handleContinue = async () => {
    await AsyncStorage.setItem("hasSeenIntro", "true");
    navigation.replace("Main");
  };

  const flatListRef = useRef();

  const handleNext = () => {
    if (flatListRef.current && index < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: index + 1 });
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.slideContainer]}>

          <SvgBackground
          seed={item.seed}
          backgroundColor={"#CFBCDF"}
          patternColor={"#6A3BCE"}
        />

        <View style={[styles.card]}>
          <View style={styles.background}></View>

          <Image style={styles.image} source={item.image} />

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
              >
                START!
              </ThemedButton>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={slides}
      horizontal
      pagingEnabled
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={100}
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
    borderRadius: 10,
    width: width * 0.9,
    elevation: 10,
    alignItems: "center",
    height: height * 0.75,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    zIndex: 0,
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
    // width: 300,
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
    width: 390,
    height: null,
    resizeMode: "contain",
    // backgroundColor: '#0553',
  },
});
