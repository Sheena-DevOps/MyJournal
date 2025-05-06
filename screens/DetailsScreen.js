import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (value) => {
    try {
      await AsyncStorage.setItem('isLogged', value);
    } catch (e) {
      console.error('Saving error:', e);
    }
  };
  AsyncStorage.setItem('name', username);
  AsyncStorage.setItem('pin', password);

  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert('Details', 'Please give your Name and password');
    } else if (password.length !== 4) {
      Alert.alert('Password', 'Enter a 4 digit password');
    }else {
      login('true');
      navigation.navigate('MainTabs');}
      // navigation.replace('MainTabs');}

  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>What should we call you?
      </Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        maxLength={10}
      />
      <Text style={styles.text}>Set your Password
      </Text>
      <TextInput
        style={styles.input}
        value={password}
        keyboardType={'numeric'}
        onChangeText={setPassword}
        secureTextEntry={true}
        maxLength={4}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <Text style={styles.note}>You can make changes later
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#ffe6f0',
    padding:50,
  },
  text:{
    fontSize: 20,
    color: 'black',
    marginBottom:15,
    },
  button: {
    width: '70%',
    height: 50,
    backgroundColor: '#ff66b2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal:50,
    marginTop:50,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  input: {
    fontSize: 20,
    height: 40,
    width: '80%',
    marginBottom:20,
    backgroundColor:'white',
    borderRadius: 10,
    padding: 10,
  },
  note: {
    fontSize: 15,
    color: 'black',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
});

export default DetailsScreen;
