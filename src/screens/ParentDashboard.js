import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ParentDashboard() {
  const [progress, setProgress] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    async function load() {
      const raw = await AsyncStorage.getItem('progress');
      if (raw) setProgress(JSON.parse(raw));
    }
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parent Dashboard</Text>
      <Text>Questions answered: {progress.total}</Text>
      <Text>Correct: {progress.correct}</Text>
      <Text>Accuracy: {progress.total === 0 ? 0 : Math.round((progress.correct/progress.total)*100)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 }
});
