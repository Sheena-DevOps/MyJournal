import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const Home = () => {
  const navigation = useNavigation();
  const user = AsyncStorage.getItem('name');

  const [sections, setSections] = useState([]);

  useFocusEffect(
      useCallback(() => {
        fetchNotes();
      }, [])
    );

    const fetchNotes = async () => {
      const storedNotes = await AsyncStorage.getItem('calendarNotes');
      const notes = storedNotes ? JSON.parse(storedNotes) : [];

      const today = new Date();
      const past7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(today.getDate() - i);
        return d.toISOString().split('T')[0]; // 'YYYY-MM-DD'
      });

      const grouped = past7Days.map(date => {
        const filteredNotes = notes.filter(note => {
          const noteDate = note.date.split('T')[0]; 
          return noteDate === date;
        });

        if (filteredNotes.length > 0) {
          return {
            title: moment(date).format('dddd, MMM D'), // Section header
            data: filteredNotes,
          };
        }

        return null;
      }).filter(Boolean); // Remove nulls

      setSections(grouped);
    };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, 
        color: 'black', padding:25,
      }}>Hi {user} </Text>
      
      <TouchableOpacity
              style={styles.add}
              onPress={() => navigation.navigate('Note')}>
              <Text style={styles.buttonText}>
                Write your thoughts and reflect on your day.</Text>
      </TouchableOpacity>
      <View style={styles.list}>
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.noteCard}
              onPress={() =>
                navigation.navigate('Note', {
                  selectedDate: item.date,
                  dayNotes: item,
                })
              }
            >
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text style={styles.noteText} numberOfLines={2}>{item.text}</Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Note')}}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor:'#ffe6f0',
  },
  list: {
    marginTop:'40%',
    marginBottom: 70,
    padding: 20,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: '#FFB6C1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    right: '10%',
    bottom: '15%',
  },
  add: {
    width: '80%',
    height: '15%',
    backgroundColor: '#FFB6C1',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    position: 'absolute',
    right: 0,
    top: '15%',
    padding: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 24,
    marginBottom: 8,
  },
  noteCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  noteText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});

export default Home;
