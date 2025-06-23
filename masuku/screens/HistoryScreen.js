// screens/MyScoresScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getScores } from '@/utils/ScoreTracker';

export default function HistoryScreen() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const data = await getScores();
      setScores(data.reverse()); // show most recent first
    };
    fetchScores();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.scoreCard}>
      <Text style={styles.title}>Grade {item.grade} - Quiz {item.quizId}</Text>
      <Text>Score: {item.score} / {item.total}</Text>
      <Text>Date: {new Date(item.date).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Scores</Text>
      {scores.length === 0 ? (
        <Text style={styles.emptyText}>No scores yet. Try a quiz!</Text>
      ) : (
        <FlatList
          data={scores}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  scoreCard: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  title: { fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16 }
});
