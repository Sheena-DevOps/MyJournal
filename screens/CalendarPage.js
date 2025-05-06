import React, {useCallback, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalendarPage = () => {
  const navigation = useNavigation();

  const [currentMonth, setCurrentMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [notes, setNotes] = useState([]);
  const [dayNotes, setDayNotes] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, []),
  );

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('calendarNotes');
      if (storedNotes) {
        const fetchedNotes = JSON.parse(storedNotes);
        setNotes(fetchedNotes);

        const today = moment().format('YYYY-MM-DD');
        setSelectedDate(today);
        const notesForDate = fetchedNotes.filter(n => n.date.startsWith(today));
        setDayNotes(notesForDate);
      } else {
        setNotes([]);
      }
    } catch (e) {
      console.error('Failed to load notes', e);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      const notesForDate = notes.filter(n => n.date.startsWith(selectedDate));
      setDayNotes(notesForDate);
    }
  }, [notes, selectedDate]);

  const handleDateSelect = day => {
    const date = day.dateString;
    setSelectedDate(date);
    const notesForDate = notes.filter(n => n.date.startsWith(date));
    setDayNotes(notesForDate);
  };

  const markedDates = notes.reduce(
    (acc, noteItem) => {
      const dateKey = noteItem.date.split('T')[0];

      acc[dateKey] = {
        ...acc[dateKey],
        marked: true,
        dotColor: '#FFB6C1',
        selected: dateKey === selectedDate,
        selectedColor: '#FFB6C1',
      };
      return acc;
    },
    {
      ...(selectedDate && !notes[selectedDate]
        ? {
            [selectedDate]: {selected: true, selectedColor: '#FFB6C1'},
          }
        : {}),
    },
  );

  return (
    <View style={styles.container}>
      <Calendar
        current={
          currentMonth
            ? currentMonth.format('YYYY-MM-DD')
            : moment().format('YYYY-MM-DD')
        }
        onMonthChange={month => {
          setCurrentMonth(moment(`${month.year}-${month.month}`, 'YYYY-M'));
        }}
        renderHeader={() => (
          <Text style={styles.monthText}>
            {currentMonth
              ? currentMonth.format('MMMM')
              : moment().format('MMMM')}
          </Text>
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

      <View style={{padding: 20, marginBottom: '80%'}}>
        {selectedDate ? (
          <Text style={{fontWeight: 'bold', marginTop: 5, fontSize: 15}}>
            {moment(selectedDate).format('MMM D')}
          </Text>
        ) : null}

        {dayNotes.length === 0 && selectedDate !== '' ? (
          <Text style={{color: 'gray'}}>No notes for this day.</Text>
        ) : (
          <FlatList
            data={dayNotes}
            keyExtractor={(item, index) => index.toString()}
            style={{marginTop: 10}}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: '#fefefe',
                  borderRadius: 6,
                  marginBottom: 10,
                  maxHeight: 100,
                }}
                onPress={() =>
                  navigation.navigate('Note', {
                    selectedDate,
                    dayNotes: item,
                  })
                }>
                <View style={{justifyContent: 'center'}}>
                  {item.title ? (
                    <Text style={{fontSize: 20}}>{item.title}</Text>
                  ) : null}
                  <Text numberOfLines={2}>{item.text}</Text>
                  <Text style={{fontSize: 12, color: 'gray'}}>
                    {moment(item.date).format('h:mm A')}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Note', {selectedDate});
        }}>
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
