import AsyncStorage from '@react-native-async-storage/async-storage';

// Save quizzes locally
export async function saveQuizzesToLocal(newQuiz) {
  try {
    const json = await AsyncStorage.getItem('quizzes');
    let quizzes = json ? JSON.parse(json) : [];

    // Check if quiz with same id already exists
    const exists = quizzes.some(quiz => quiz.id === newQuiz.id);
    if (exists) return; // Don't add duplicate

    quizzes.push(newQuiz);
    await AsyncStorage.setItem('quizzes', JSON.stringify(quizzes));
  } catch (error) {
    console.error('Error adding quiz:', error);
  }

  // await AsyncStorage.setItem('quizzes', JSON.stringify(quizzes));
}

// Load quizzes from local storage
export async function getLocalQuizzes() {
  const data = await AsyncStorage.getItem('quizzes');
  return data ? JSON.parse(data) : [];
}