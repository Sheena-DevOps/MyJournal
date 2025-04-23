import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

import WelcomePage from './screens/WelcomePage';
import DetailsScreen from './screens/DetailsScreen';
import PasswordLogin from './screens/PasswordLogin';
import Home from './screens/Home';
import CalendarPage from './screens/CalendarPage';
import NoteEntry from './screens/NoteEntry';
import SettingsPage from './screens/SettingsPage';
import DeleteDataScreen from './screens/DeleteDataScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomePage}/>
        <Stack.Screen name="Details" component={DetailsScreen}/>
        <Stack.Screen name="PasswordLogin" component={PasswordLogin}/>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="Note" component={NoteEntry}/>
        <Stack.Screen name="DeleteData" component={DeleteDataScreen} />
      </Stack.Navigator>
  );
};
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Home: 'home',
            Calendar: 'calendar',
            Settings: 'settings',
          };

          const iconBase = icons[route.name] || 'ellipse';
          const iconName = focused ? iconBase : `${iconBase}-outline`;

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFB6C1',
        tabBarInactiveTintColor: 'gray',
      })}
    >
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Calendar" component={CalendarPage}/>
        <Tab.Screen name="Settings" component={SettingsPage}/>
      </Tab.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
