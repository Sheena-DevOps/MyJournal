import React, { useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomePage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    loginStatus();
  }, []);

  const loginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('isLogged');
      if (value && value === 'true'){
        // navigation.navigate('MainTabs');
        navigation.navigate('PasswordLogin');
      }
    } catch (e) {
      console.error('Reading error:', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcome}>Welcome to</Text>
      <Text style={styles.appName}>My Journal!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Details')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  welcome: {
    fontSize: 25,
    color: 'black',
  },
  appName: {
      fontSize: 30,
      color: 'black',
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
