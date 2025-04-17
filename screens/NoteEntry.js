import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoteEntry = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const route = useRoute();
  const { selectedDate } = route.params || new Date().toISOString().split('T')[0];

  const saveNote = async () => {
    try {
      if (!text.trim()) {
        Alert.alert('Please enter some text');
        return;
      }
      const now = new Date();
      const timeString = now.toTimeString().split(' ')[0]; // "HH:MM:SS"
      const dateTime = `${selectedDate}T${timeString}`;    // e.g. "2025-04-17T13:45:00"
      const note = {
        title,
        text,
        date: dateTime,
      };
      const existing = await AsyncStorage.getItem('calendarNotes');
      const notes = existing ? JSON.parse(existing) : [];

      notes.push(note);

      await AsyncStorage.setItem('calendarNotes', JSON.stringify(notes));
      Alert.alert('Note saved!');
      // setText('');
    } catch (e) {
      console.error('Failed to save the note.', e);
    }
  };
  return (
    <View style={styles.container}>
      <Text> {selectedDate}</Text>
      <TextInput
        style={styles.headline}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Your entry"
        value={text}
        onChangeText={setText}
      />
      <Button title="Save Note" onPress={saveNote} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    padding:20,
  },
  headline: {
    fontSize: 25,
    minHeight: 50,
    textAlignVertical: 'top',
  },
  input: {
    fontSize: 18,
  },
});

export default NoteEntry;
