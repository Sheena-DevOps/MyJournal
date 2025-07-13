import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import WelcomePage from './screens/WelcomePage';
import DetailsScreen from './screens/DetailsScreen';
import PasswordLogin from './screens/PasswordLogin';
import Home from './screens/Home';
import CalendarPage from './screens/CalendarPage';
import NoteEntry from './screens/NoteEntry';
import SettingsPage from './screens/SettingsPage';

import messaging from '@react-native-firebase/messaging';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const icons = {
  Home: 'home',
  Calendar: 'calendar',
  Settings: 'settings',
};

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={WelcomePage} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="PasswordLogin" component={PasswordLogin} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="Note" component={NoteEntry} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          const iconBase = icons[route.name] || 'ellipse';
          const iconName = focused ? iconBase : `${iconBase}-outline`;

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFB6C1',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Calendar" component={CalendarPage} />
      <Tab.Screen name="Settings" component={SettingsPage} />
    </Tab.Navigator>
  );
};

export default function App() {
  useEffect(() => {

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      // Optionally perform background logic here, like saving to AsyncStorage
    });
    
    getToken();
    
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
    });

    const unsubscribe1 = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification background:',
        remoteMessage.notification,
      );
    });

    requestUserPermission();

    return () => { 
      unsubscribe;
      unsubscribe1;
    };
  }, []);


  const getToken = async () => {
    console.log('FCM Token:');
    const token = await messaging().getToken();
    console.log('FCM Token:', token);

    const message = await messaging().getInitialNotification();
    if (message) {
      console.log('Notification caused app to open from quit state:', message.notification);
      // Navigate to the desired screen based on the notification data
    }
  };

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
