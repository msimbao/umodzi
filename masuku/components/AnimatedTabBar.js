import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import SubjectsScreen from "../screens/SubjectsScreen";
import StoreScreen from "../screens/StoreScreen";
import HistoryScreen from "../screens/HistoryScreen";
import HistoryListScreen from "../screens/HistoryListScreen";

import SettingsScreen from "../screens/SettingsScreen";

const Tab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get("window");
const TAB_WIDTH = width / 5;

export default function MainTabs() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBar={(props) => <PlainTabBar {...props} />}
      swipeEnabled={false}
      screenOptions={{
        tabBarShowLabel: false,
        swipeEnabled: true,
      }}
    >
      {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
      <Tab.Screen name="Store" component={StoreScreen} />
      <Tab.Screen name="Subjects" component={SubjectsScreen} />
      <Tab.Screen name="History" component={HistoryListScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function PlainTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.background}></View>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const iconName = {
          // Home: 'home',
          Subjects: "document-text",
          Store: "library",
          History: "time",
          Settings: "settings-outline",
        }[route.name];

        const scale = useSharedValue(isFocused ? 1.2 : 1);
        const bgScale = useSharedValue(isFocused ? 1 : 0);

        React.useEffect(() => {
          scale.value = withTiming(isFocused ? 1.2 : 1, {
            duration: 300,
            easing: Easing.out(Easing.exp),
          });
          bgScale.value = withTiming(isFocused ? 1 : 0, {
            duration: 300,
            easing: Easing.out(Easing.exp),
          });
        }, [isFocused]);

        const animatedStyle = useAnimatedStyle(() => ({
          transform: [{ scale: scale.value }],
        }));

        const bgAnimatedStyle = useAnimatedStyle(() => ({
          transform: [{ scale: bgScale.value }],
          opacity: bgScale.value,
        }));

        const onPress = () => {
          if (!isFocused) navigation.navigate(route.name);
        };

        return (
          <Pressable key={route.key} onPress={onPress} style={styles.tabButton}>
            <Animated.View style={[styles.iconWrapper, animatedStyle]}>
              <Animated.View style={[styles.iconBackground, bgAnimatedStyle]} />
              <Ionicons
                name={iconName}
                size={32}
                color={isFocused ? "#fff" : "#ccc"}
              />
              {/* <Text style={[styles.label, { color: isFocused ? '#2196F3' : 'gray' }]}> 
                {route.name}
              </Text> */}
            </Animated.View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // backgroundColor: "#fff",
    height: 70,
    position:'absolute',
    padding: width * 0.05,
    width:width*1,
    alignSelf: "flex-end",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    left:width*0.01,
    bottom:height*0.02,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    top: -10,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    elevation: 0,
    borderRadius: 5,
  },
  iconBackground: {
    position: "absolute",
    top: 0,
    width: 80,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#333",
    elevation: 3,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
  background: {
    borderRadius: 10,
    width: width * 0.9,
    elevation: 10,
    height: 50,
    backgroundColor: "white",
    position: "absolute",
    left: width * 0.05,
    borderWidth: 0,
    borderColor: "#333",
  },
});
