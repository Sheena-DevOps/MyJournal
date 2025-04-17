import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CalendarPage = () => {
  const navigation = useNavigation();

  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState('');
  const [notes, setNotes] = useState([]);
  const [dayNotes, setDayNotes] = useState([]);

  useFocusEffect(
    useCallback(() => {
    loadNotes();
    }, [])
  );

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('calendarNotes');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      } else {
        setNotes([]);
      }
    } catch (e) {
      console.error('Failed to load notes', e);
    }
  };

  const handleDateSelect = (day) => {
    const date = day.dateString;
    setSelectedDate(date);
    // find the note for the selected date
    const notesForDate = notes.filter((n) => n.date.startsWith(date));
    setDayNotes(notesForDate);
  };

  const markedDates = notes.reduce((acc, noteItem) => {
    const dateKey = noteItem.date.split('T')[0];

    acc[dateKey] = {
      ...acc[dateKey],
      marked: true,
      dotColor: '#FFB6C1',
      selected: dateKey === selectedDate,
      selectedColor: '#FFB6C1',
    };
    return acc;
  }, {
    ...(selectedDate && !notes[selectedDate] ? {
      [selectedDate]: { selected: true, selectedColor: '#FFB6C1'},
    } : {}),
  });

  return (
    <View style = {styles.container}>
      <Calendar
       current={currentMonth.format('YYYY-MM-DD')}
       onMonthChange={(month) => {
         // month = { year: 2025, month: 4 }
         setCurrentMonth(moment(`${month.year}-${month.month}`, 'YYYY-M'));
       }}
       renderHeader={() => (
         <View>
           <Text style={styles.monthText}>
             {currentMonth.format('MMMM')}
           </Text>
         </View>
       )}
      theme={{
        calendarBackground: 'white',
        textSectionTitleColor: 'gray',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#b6c1cd',
      }}
      onDayPress={handleDateSelect}
      markedDates={markedDates}
      />

      <View style={{ padding: 20 }}>
        <Text style={{ fontWeight: 'bold', marginTop: 5, fontSize: 15 }}>{moment(selectedDate).format('MMM D')
        }</Text>
        {dayNotes.length === 0 && selectedDate !== '' ? (
          <Text style={{ color: 'gray' }}>No notes for this day.</Text>
        ) : (
          <FlatList
            data={dayNotes}
            keyExtractor={(item, index) => index.toString()}
            style={{ marginTop: 10 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: '#fefefe',
                  borderRadius: 6,
                  marginBottom: 10,
                  maxHeight: 100,
                }}
                onPress={() => navigation.navigate('Note', { selectedDate })}
              >
                <View style={{ justifyContent: 'center',}}>
                {item.title ? (
                  <Text style={{fontSize:20}}>{item.title}</Text>) : null}
                  <Text>{item.text}</Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>
                    {moment(item.date).format('h:mm A')
                    }
                  </Text>

                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

     <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Note', { selectedDate});}}>
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
    monthText: {
      fontSize: 20,
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
