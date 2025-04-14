import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomePage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    console.warn("starting")
    loginStatus();
  }, []);

  const loginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('isLogged');
      if (value && value === 'true'){
        navigation.navigate('MainTabs');
      }
    } catch (e) {
      console.error('Reading error:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25, 
        color: 'black',
      }}>Welcome to</Text>
      <Text style={{
        fontSize: 30,
        color: 'black',
      }}>My Journal!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Details')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe6f0',
  },
  button: {
    width: '70%',
    height: 50,
    backgroundColor: '#ff66b2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin:40,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default WelcomePage;
