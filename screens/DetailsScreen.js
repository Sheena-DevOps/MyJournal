import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetailsScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert('Details', 'Please give your Name and password');
    } else if (password.length != 4) {
      Alert.alert('Password', 'Enter a 4 digit password');
    }else {
      navigation.replace('MainTabs')}
};

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20,
        color: 'black',
        marginBottom:15,
        }}>What should we call you?
      </Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        maxLength={10}
      />
      <Text style={{fontSize: 20,
        color: 'black',
        marginBottom:15,
      }}>Set your digit Password
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
      <Text style={{fontSize: 15,
        color: 'black',
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: 'center',
      }}>You can make changes later
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

export default DetailsScreen;
