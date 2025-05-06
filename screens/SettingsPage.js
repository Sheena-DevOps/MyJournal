import React, { useState } from 'react';
import { View, Text, TouchableOpacity,TextInput, StyleSheet, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsPage = () => {
    const [nameModalVisible, setNameModalVisible] = useState(false);
    const [pinModalVisible, setPinModalVisible] = useState(false);
    const [isOldVerified, setIsOldVerified] = useState(false);
    const [DeleteModalVisible, setDeleteModalVisible] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const saveUsername = () => {
      if (username === ''){
        Alert.alert('Name', 'Please enter your Name');
      } else{
      AsyncStorage.setItem('name', username);
      setNameModalVisible(false);
      setUsername('');
      }
    };

    const checkPassword = async () => {
      const oldPin = await AsyncStorage.getItem('pin');
      if (oldPin === password) {
        setIsOldVerified(true);
        setPassword('');
      }else{
         Alert.alert('Password', 'Password is Incorrect');
      }
      setNameModalVisible(false);
      setPassword('');
    };
    const deleteData = async () => {
      try {
        await AsyncStorage.removeItem('calendarNotes');
        setDeleteModalVisible(false);
        Alert.alert('Data', 'Data deleted successfully');
    } catch (error) {
        console.error('Error removing PIN:', error);
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings
      </Text>

      <TouchableOpacity onPress={() => setNameModalVisible(true)}>
        <Text style={[styles.option,{marginTop:20}]}>Edit Your Name</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setPinModalVisible(true)}>
        <Text style={styles.option}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
        <Text style={styles.option}>Delete My Data</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={nameModalVisible}
        onRequestClose={() => setNameModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Your Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={username}
              maxLength={10}
              onChangeText={setUsername}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                  style={styles.buttonCancel}
                  onPress={() => {setNameModalVisible(false); setUsername('');}}>
                 <Text style={styles.textCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={styles.buttonSave}
                  onPress={() => saveUsername()}>
                 <Text style={styles.textSave}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={pinModalVisible}
        onRequestClose={() => setPinModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Change Password</Text>
            {!isOldVerified ? (
              <>
              <TextInput
                style={styles.input}
                placeholder="Old Password"
                value={password}
                keyboardType={'numeric'}
                onChangeText={setPassword}
                secureTextEntry={true}
                maxLength={4}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                    style={styles.buttonCancel}
                    onPress={() => {setPinModalVisible(false); setPassword('');}}>
                  <Text style={styles.textCancel}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonSave}
                    onPress={() => checkPassword()}>
                  <Text style={styles.textSave}>Continue</Text>
                </TouchableOpacity>
              </View>
              </>) : (
                <>
              <TextInput
                placeholder="New Password"
                secureTextEntry={true}
                keyboardType={'numeric'}
                maxLength={4}
                value={password}
                onChangeText={setPassword}
                style={styles.input}
              />
              <TextInput
                placeholder="Confirm New Password"
                secureTextEntry={true}
                keyboardType={'numeric'}
                maxLength={4}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                    style={styles.buttonCancel}
                    onPress={() => {setPinModalVisible(false);
                    setIsOldVerified(false);
                    setPassword('');
                    setConfirmPassword(''); }}>
                  <Text style={styles.textCancel}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonSave}
                    onPress={() => {
                      if (password === '' || confirmPassword === '') {
                        Alert.alert('Password', 'Please enter both new password and confirm password');
                      }
                      else if (password.length !== 4) {
                        Alert.alert('Password', 'Enter a 4 digit password');
                      }
                      else if (password !== confirmPassword) {
                        Alert.alert("Passwords don't match");
                        return;
                      } else {
                      AsyncStorage.setItem('pin', password);
                      Alert.alert('Password updated!');
                      setPinModalVisible(false);
                      setIsOldVerified(false);
                      setPassword('');
                      setConfirmPassword('');
                      }
                    }}>

                  <Text style={styles.textSave}>Save</Text>
                </TouchableOpacity>
              </View>
              </>)
            }
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={DeleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Are you sure?</Text>
            <Text style={styles.note}>This will permanently delete your data.</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                  style={styles.buttonCancel}
                  onPress={() => {setDeleteModalVisible(false);}}>
                 <Text style={styles.textCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={styles.buttonSave}
                  onPress={() => deleteData()}>
                 <Text style={styles.textSave}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { padding: 20 },
  header: {
    fontSize: 20,
    color: 'black',
  },
  option: {
    fontSize: 18,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: { fontSize: 20, marginBottom: 20 },
  input: {
    height: 38,
    borderColor: '#aaa',
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    fontSize: 16,
    marginBottom: 20,
    padding: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonCancel: {
    width: '30%',
    height: 35,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonSave: {
    width: '30%',
    height: 35,
    backgroundColor: '#FFB6C1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  textCancel: {
    color:'black',
    fontSize:16,
  },
  textSave: {
    color:'white',
    fontSize:16,
  },
  note: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default SettingsPage;
