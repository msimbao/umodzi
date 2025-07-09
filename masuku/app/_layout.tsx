import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IntroScreen from '@/screens/IntroScreen';
import MainTabs from '@/components/AnimatedTabBar';
import QuizListScreen from '@/screens/QuizListScreen'
import QuizScreen from '@/screens/QuizScreen'
import ResultScreen from '@/screens/ResultScreen'
import HistoryListScreen from '@/screens/HistoryListScreen'
import StoreGradeScreen from '@/screens/StoreGradeScreen'
import StoreListScreen from '@/screens/StoreListScreen'
import StoreTestScreen from '@/screens/StoreTestScreen'
import SubjectListScreen from '@/screens/SubjectListScreen'
import ArticleScreen from '@/screens/ArticleScreen'
import ArticleListScreen from '@/screens/ArticleListScreen'
import SubjectsScreen from "../screens/SubjectsScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Intro');

  useEffect(() => {
    const checkIntroSeen = async () => {
      const value = await AsyncStorage.getItem('hasSeenIntro');
      setInitialRoute(value ? 'Main' : 'Intro');
      setIsLoading(false);
    };
    checkIntroSeen();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Quizzes" component={QuizListScreen} />
        <Stack.Screen name="Article" component={ArticleScreen} />
        <Stack.Screen name="ArticleList" component={ArticleListScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="HistoryList" component={HistoryListScreen} />
        <Stack.Screen name="StoreList" component={StoreListScreen} />
        <Stack.Screen name="StoreGrade" component={StoreGradeScreen} />
        <Stack.Screen name="StoreTest" component={StoreTestScreen} />
        <Stack.Screen name="Subjects" component={SubjectsScreen} />
        <Stack.Screen name="SubjectList" component={SubjectListScreen} />

      </Stack.Navigator>
    </>
  );
}
