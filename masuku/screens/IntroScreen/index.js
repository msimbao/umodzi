import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  FlatList,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import Autumn from "@/assets/svg/autumn.svg"

const { width, height } = Dimensions.get("window");

const slides = [
  {
    key: "one",
    iconName: "checkmark-outline",
    title: "Welcome to EduSavanna!",
    description:
      "Explore engaging quizzes crafted for African learners with rich visuals and local flair.",
  },
  {
    key: "two",
    iconName: "checkmark-outline",
    title: "Learn & Earn",
    description:
      "Unlock diorama rewards and cute characters as you complete lessons and challenges.",
  },
  {
    key: "three",
    iconName: "checkmark-done-outline",
    title: "Track Your Growth",
    description:
      "View your progress and revisit lessons anytime in your personalized dashboard.",
  },
];

export default function IntroScreen({ navigation }) {
  useEffect(() => {
    // Optionally trigger animations here if needed
  }, []);

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
      <View style={styles.slideContainer}>
        <Animated.View style={[styles.card]}>
          {/* <Ionicons name={item.iconName} size={100} color={"white"} /> */}

          <View style={styles.footer}>
            {/* <Text style={styles.title}>{item.title}</Text> */}
            <Text style={styles.description}>{item.description}</Text>
            {item.key === "one" && (
              <Pressable style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>
                            <Ionicons name={item.iconName} size={50} color={"black"} />
                </Text>
              </Pressable>
            )}
            {item.key === "two" && (
              <Pressable style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>
                                              <Ionicons name={item.iconName} size={50} color={"black"} />
                </Text>
              </Pressable>
            )}
            {item.key === "three" && (
              <Pressable style={styles.button} onPress={handleContinue}>
                <Text style={styles.buttonText}>
                                              <Ionicons name={item.iconName} size={50} color={"black"} />

                </Text>
              </Pressable>
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
      scrollEventThrottle={16}
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
    backgroundColor: "#000",
    width,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
  card: {
    borderRadius: 20,
    padding: 30,
    width: width * 0.9,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    alignItems: "center",
    height: height * 0.9,
    borderColor: "white",
    borderWidth:1,
    backgroundColor: "#222431",
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    // justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
    color: "white",
  },
  description: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 10,
    bottom: 20,
    marginTop:50,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize:20,
  },
});
