// components/ExpandableList.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { ThemedButton } from "react-native-really-awesome-button";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import { Jersey25_400Regular } from "@expo-google-fonts/jersey-25";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const ExpandableItem = ({ item, isExpanded, onToggle }) => {
  const navigation = useNavigation();

  const [loaded, error] = useFonts({
    Fredoka_400Regular,
    Jersey25_400Regular,
  });

  const height = useSharedValue(isExpanded ? 100 : 0);
  const opacity = useSharedValue(isExpanded ? 1 : 0);

  React.useEffect(() => {
    height.value = withTiming(isExpanded ? 150 : 0, { duration: 300 });
    opacity.value = withTiming(isExpanded ? 1 : 0, { duration: 200 });
  }, [isExpanded]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
    overflow: "hidden",
  }));

  return (
    <TouchableOpacity onPress={onToggle}>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Animated.View style={[styles.expandedContainer, animatedStyle]}>
          <Text style={styles.subjectName}>
            Total Questions: {item.questions.length}
          </Text>
          <Text style={styles.subjectName}>
            Duration: {item.questions.length * 1.5} Minutes
          </Text>
          <Text style={styles.details}>{item.details}</Text>

          <ThemedButton
            style={styles.button}
            name="bruce"
            type="primary"
            onPress={() => navigation.navigate("Quiz", { quiz: item })}
            width={width * 0.6}
            height={50}
            borderRadius={5}
          >
            START
          </ThemedButton>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default function ExpandableList({ data }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleItem = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderItem = ({ item }) => (
    <ExpandableItem
      item={item}
      isExpanded={item.id === expandedId}
      onToggle={() => toggleItem(item.id)}
    />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: width * 0.01 }} // <-- Adds space at the bottom
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#eee",
    marginBottom: 10,
    padding: 16,
    borderRadius: 5,
    elevation: 5,
    alignContent: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "left",
    color: "black",
    fontFamily: "Fredoka_400Regular",
    width: 300,
    fontWeight: 600,
  },
  expandedContainer: {
    // marginTop: 10,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    alignContent: "center",
    justifyContent: "center",
  },
  details: {
    fontSize: 16,
    marginBottom: 10,
  },
});
