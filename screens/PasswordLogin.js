import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PasswordLogin = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');

  const checkPassword = async () => {
    const oldPin = await AsyncStorage.getItem('pin');
    if (password === '') {
      Alert.alert('Details', 'Please give your Name and password');
    } else if (oldPin === password) {
        navigation.navigate('MainTabs');
    } else {
        Alert.alert('Password', 'Password is Incorrect');
    }
    setPassword('');
  };
  
  return (
      <View style={styles.container}>
        
        <Text style={{fontSize: 20,
          color: 'black',
          marginBottom:15,
        }}>Enter Password
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
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
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
  });
  
  export default PasswordLogin;
  