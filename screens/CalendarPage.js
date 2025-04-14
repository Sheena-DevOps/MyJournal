import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CalendarPage = () => {
  const navigation = useNavigation();
  
  const [selectedDate, setSelectedDate] = useState('');
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState({});

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('calendarNotes');
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (e) {
        console.error('Failed to load notes', e);
      }
    };
    loadNotes();
  }, []);

  // When a date is pressed
  const handleDateSelect = (day) => {
    const date = day.dateString;
    setSelectedDate(date);
    setNote(notes[date] || '');
    navigation.navigate('Note', { date });
  };

  // Add markers for dates with notes
  const markedDates = Object.keys(notes).reduce((acc, date) => {
    acc[date] = {
      marked: true,
      dotColor: '#FFB6C1',
      selected: date === selectedDate,
      selectedColor: '#FFB6C1',
    };
    return acc;
  }, {
    ...(selectedDate && !notes[selectedDate] ? {
      [selectedDate]: { selected: true, selectedColor: '#FFB6C1' }
    } : {})
  });

  return (
    <View style={styles.container}>
      <Calendar
      theme={{
        calendarBackground: 'white',
        textSectionTitleColor: 'gray',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#b6c1cd',
      }}
      onDayPress={handleDateSelect}
      markedDates={markedDates}/>

      <View style={{padding:20}}>
        <Text style={{fontWeight: 'bold', marginTop: 15}}> {selectedDate}</Text>
        <Text>{note}</Text>
      </View>

     <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Note')}>
        <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
    </View>
  );
};
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
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
    buttonText: {
      color: 'black',
      fontSize: 18,
      textAlign: 'center',
    },
  });

export default CalendarPage;
