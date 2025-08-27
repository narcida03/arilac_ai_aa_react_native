import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function LessonScreen({ route, navigation }) {
  const { lesson } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.desc}>{lesson.description}</Text>
      <View style={{ flex: 1, marginVertical: 10 }}>
        <WebView
          source={{ html: `
            <html>
              <body style="margin:0;padding:0;">
                <model-viewer src="https://modelviewer.dev/shared-assets/models/Astronaut.glb" ar auto-rotate camera-controls style="width:100%; height:100%;"></model-viewer>
                <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.1/model-viewer.min.js"></script>
              </body>
            </html>
          ` }}
        />
      </View>
      <Button title="Start Quiz" onPress={() => navigation.navigate('Quiz', { lesson })} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: 'bold', margin: 10 },
  desc: { marginHorizontal: 10, marginBottom: 10 }
});
