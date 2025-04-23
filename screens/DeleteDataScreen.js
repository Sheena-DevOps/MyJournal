import React from 'react';
import { View, Button, Alert } from 'react-native';

export default function DeleteDataScreen({ navigation }) {
  const confirmDelete = () => {
    Alert.alert(
      "Are you sure?",
      "This will permanently delete your data.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            console.log("Data deleted");
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Delete My Data" color="red" onPress={confirmDelete} />
    </View>
  );
}
