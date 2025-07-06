// components/BackButtons.js or .tsx
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedButton } from "react-native-really-awesome-button";

export default function BackButtons() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <View style={styles.backButtons}> */}
      <ThemedButton
        // style={styles.button}
        name="bruce"
        type="primary"
        onPress={() => navigation.goBack()}
        width={100}
        height={40}
        raiseLevel={5}
        borderRadius={5}
      >
        <Ionicons name={"arrow-back"} size={20} color={"#fff"} />
        {/* BACK */}
      </ThemedButton>
      <ThemedButton
        // style={styles.button}
        name="bruce"
        type="primary"
        onPress={() => navigation.popToTop()}
        width={100}
        height={40}
        raiseLevel={5}
        borderRadius={5}
      >
        <Ionicons name={"home"} size={20} color={"#fff"} />
        {/* BACK */}
      </ThemedButton>
      <ThemedButton
        // style={styles.button}
        name="bruce"
        type="primary"
        onPress={() => navigation.navigate("Main", { screen: "Settings" })}
        width={100}
        height={40}
        raiseLevel={5}
        borderRadius={5}
      >
        <Ionicons name={"settings"} size={20} color={"#fff"} />
        {/* BACK */}
      </ThemedButton>
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});
