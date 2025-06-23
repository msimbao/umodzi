import AsyncStorage from '@react-native-async-storage/async-storage';

// Save quizzes locally
export async function saveQuizzesToLocal(quizzes) {
  await AsyncStorage.setItem('quizzes', JSON.stringify(quizzes));
}

// Load quizzes from local storage
export async function getLocalQuizzes() {
  const data = await AsyncStorage.getItem('quizzes');
  return data ? JSON.parse(data) : [];
}