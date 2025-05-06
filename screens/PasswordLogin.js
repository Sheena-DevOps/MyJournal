import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native';

const PasswordLogin = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');

  const checkPassword = async () => {
    const oldPin = await AsyncStorage.getItem('pin');
    if (password === '') {
      Alert.alert('Details', 'Please enter the password');
    } else if (oldPin === password) {
        navigation.navigate('MainTabs');
    } else {
        Alert.alert('Password', 'Password is Incorrect');
    }
    setPassword('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Enter Password
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
        onPress={checkPassword}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#ffe6f0',
      padding:50,
    },
    button: {
      width: '70%',
      height: 50,
      backgroundColor: '#ff66b2',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginHorizontal:50,
      marginTop:'60%',
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
    text: {
      fontSize: 20,
      color: 'black',
      marginTop: '40%',
      marginBottom:15,
    },
  });

  export default PasswordLogin;
