import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NoteEntry = () => {

  return (
    <View style={styles.container}>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

});

export default NoteEntry;

//   const [selectedDate, setSelectedDate] = useState('');
//   const [note, setNote] = useState('');
//   const [notes, setNotes] = useState({});

//   

//     const updatedNotes = {
//       ...notes,
//       [selectedDate]: note,
//     };

//     try {
//       await AsyncStorage.setItem('calendarNotes', JSON.stringify(updatedNotes));
//       setNotes(updatedNotes);
//     } catch (e) {
//       console.error('Failed to save note', e);
//     }
//   };