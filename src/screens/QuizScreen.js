import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AdaptiveEngine from '../services/adaptiveEngine';

const engine = new AdaptiveEngine();

export default function QuizScreen({ route }) {
  const { lesson } = route.params;
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [total, setTotal] = useState(0);

  const questions = lesson.questions;

  const handleAnswer = (choice, answer) => {
    const correct = choice === answer;
    if (correct) setCorrectCount(c => c + 1);
    setTotal(t => t + 1);
    engine.recordResult(correct);
    setIndex(i => (i+1) % questions.length);
  };

  const q = questions[index];

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{q.prompt}</Text>
      {q.choices.map((c, i) => (
        <TouchableOpacity key={i} style={styles.choice} onPress={() => handleAnswer(c, q.answer)}>
          <Text>{c}</Text>
        </TouchableOpacity>
      ))}
      <Text>Accuracy: {total === 0 ? 0 : Math.round((correctCount/total)*100)}%</Text>
      <Text>Recommended difficulty: {engine.recommendedLabel()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  prompt: { fontSize: 18, marginBottom: 12 },
  choice: { padding: 12, backgroundColor: '#e0e0e0', borderRadius: 6, marginBottom: 8 }
});
