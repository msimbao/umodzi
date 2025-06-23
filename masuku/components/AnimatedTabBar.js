import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/SubjectsScreen';
import StoreScreen from '../screens/StoreScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createMaterialTopTabNavigator();
const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 5;

export default function MainTabs() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBar={(props) => <PlainTabBar {...props} />}
      swipeEnabled={true}
      screenOptions={{
        tabBarShowLabel: false,
        swipeEnabled: true,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Details" component={DetailsScreen} />
      <Tab.Screen name="Store" component={StoreScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function PlainTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const iconName = {
          Home: 'home-outline',
          Details: 'document-text-outline',
          Store: 'cart-outline',
          History: 'time-outline',
          Settings: 'settings-outline',
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
                size={24}
                color={isFocused ? '#2196F3' : 'gray'}
              />
              <Text style={[styles.label, { color: isFocused ? '#2196F3' : 'gray' }]}> 
                {route.name}
              </Text>
            </Animated.View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 70,
    borderTopColor: '#eee',
    borderTopWidth: 1,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBackground: {
    position: 'absolute',
    top: -5,
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    zIndex: -1,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});
