import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation = useNavigation();
  const user = AsyncStorage.getItem('name');

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, 
        color: 'black', padding:25,
      }}>Hi {user} </Text>
      
      <TouchableOpacity
              style={styles.add}
              onPress={() => navigation.navigate('Note')}>
              <Text style={styles.buttonText}>Write your thoughts and reflect on your day.</Text>
      </TouchableOpacity>
     
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
});

export default Home;
