import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, TextInput, Button, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const NoteEntry = () => {
  const navigation = useNavigation();

 const route = useRoute();
  const {
    selectedDate = new Date().toISOString().split('T')[0], 
    dayNotes = null
  } = route.params || {};

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [savedTitle, setSavedTitle] = useState('');
  const [savedText, setSavedText] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [savedNoteId, setSavedNoteId] = useState(null);

    useEffect(() => {
      if (dayNotes) {
        setTitle(dayNotes.title);
        setText(dayNotes.text);
        setSavedTitle(dayNotes.title);
        setSavedText(dayNotes.text);
        setSavedNoteId(dayNotes.id);
        setIsSaved(true);
      }
    }, [dayNotes]);

  const saveNote = async () => {
    try {
      if (!text.trim()){
        Alert.alert('your entry is empty.');
      } else{
        const now = new Date();
        const timeString = now.toTimeString().split(' ')[0]; // "HH:MM:SS"
        const dateTime = `${selectedDate}T${timeString}`;    // e.g. "2025-04-17T13:45:00"
        const note = {
          id: savedNoteId || Date.now().toString(),
          title,
          text,
          date: dateTime,
        };
        const existing = await AsyncStorage.getItem('calendarNotes');
        const notes = existing ? JSON.parse(existing) : [];
        const noteIndex = notes.findIndex(n => n.id === note.id);

        if (noteIndex > -1) {
          notes[noteIndex] = note;
        } else {
          notes.push(note);
        }

        await AsyncStorage.setItem('calendarNotes', JSON.stringify(notes));
        Alert.alert('Note saved!');
        setSavedTitle(title);
        setSavedText(text);
        setIsSaved(true);
        setSavedNoteId(note.id);
        navigation.goBack();
      }
    } catch (e) {
       console.error('Failed to save the note.', e);
    }
  };
  const handleDelete = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const existing = await AsyncStorage.getItem('calendarNotes');
              const notes = existing ? JSON.parse(existing) : [];

              const updatedNotes = notes.filter(note => note.id !== savedNoteId);

              await AsyncStorage.setItem('calendarNotes', JSON.stringify(updatedNotes));

              setText('');
              setTitle('');
              setIsSaved(false);
              Alert.alert('Note Deleted');
              navigation.goBack();
            } catch (e) {
              console.error('Failed to delete the note.', e);
            }
          },
        },
      ]
    );
  };
  useEffect(() => {
    if (isSaved && (title !== savedTitle || text !== savedText)) {
      setIsSaved(false);
    }
  }, [title, text, savedTitle, savedText, isSaved]);  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dateToday}>
          {moment(selectedDate).format('MMM D')}
        </Text>
        {!isSaved ? (
          <Button onPress={saveNote} color={'#FFB6C1'} title= "Save" />
          ) : (<Button onPress={handleDelete} color={'#FFB6C1'} title= "Delete" />
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <TextInput
        style={styles.headline}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Your entry"
        multiline
        value={text}
        onChangeText={setText}
      />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    padding:20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headline: {
    fontSize: 25,
    minHeight: 50,
    textAlignVertical: 'top',
  },
  input: {
    fontSize: 18,
  },
  dateToday: {
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 15,
  },
});

export default NoteEntry;
