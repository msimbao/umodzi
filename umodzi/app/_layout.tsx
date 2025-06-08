import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GradeSelectionScreen from '@/screens/GradeSelectionScreen';
import QuizListScreen from '@/screens/QuizListScreen';
import QuizScreen from '@/screens/QuizScreen';
import ResultScreen from '@/screens/ResultScreen';
import MyScoresScreen from '@/screens/MyScoresScreen';
import QuizStoreScreen from '@/screens/QuizStoreScreen';
import { saveQuizzesToLocal } from '@/utils/quizStore';
import SubjectSelectionScreen from '@/screens/SubjectSelectionScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="GradeSelection">
        <Stack.Screen name="GradeSelection" component={GradeSelectionScreen} />
        <Stack.Screen name="QuizList" component={QuizListScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="MyScores" component={MyScoresScreen} />
        <Stack.Screen name="Store" component={QuizStoreScreen} />
        <Stack.Screen name="SubjectSelection" component={SubjectSelectionScreen} />
      </Stack.Navigator>
  );
}