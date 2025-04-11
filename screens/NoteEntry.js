import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NoteEntry = () => {
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, 
        color: 'black', padding:25,
      }}>Hi </Text>
      
      <TouchableOpacity
              style={styles.add}
              onPress={() => navigation.navigate('Home')}>
              <Text style={styles.buttonText}>Write your thoughts and reflect on your day.</Text>
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
  add: {
    width: '80%',
    height: '15%',
    backgroundColor: 'green',
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
  },
});

export default NoteEntry;
