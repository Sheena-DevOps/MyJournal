import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';

const CalendarPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
<Calendar
      style={{
        height: 150,
      }}
      theme={{
        calendarBackground: 'white',
        textSectionTitleColor: '#dd99ee',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#b6c1cd',
      }}
      onDayPress={day => {
      console.log('selected day', day);
      }}
    />
     <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home', { screen: 'Note' })}>
        <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
    </View>
  );
};
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
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
