import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import lessons from '../data/lessons.json';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(lessons);
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Parent Dashboard" onPress={() => navigation.navigate('ParentDashboard')} />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Lesson', { lesson: item })}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { padding: 16, marginBottom: 12, backgroundColor: '#f0f0f0', borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold' }
});
