import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomePage from './screens/WelcomePage';
import DetailsScreen from './screens/DetailsScreen';
import Home from './screens/Home';
import CalendarPage from './screens/CalendarPage';
import NoteEntry from './screens/NoteEntry';
import SettingsPage from './screens/SettingsPage';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// const StackNavigator = () => {
//   return (
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="Note" component={NoteEntry}/>
//       </Stack.Navigator>
//   );
// };
// const TabNavigator = () => {
//   return (
//       <Tab.Navigator screenOptions={{ headerShown: false }}>
//         <Tab.Screen name="Home" component={StackNavigator}/>
//         <Tab.Screen name="Calender" component={CalendarPage}/>
//         <Tab.Screen name="Settings" component={SettingsPage}/>
//       </Tab.Navigator>
//   );
// };
// export default function App() {
//   return (
//     <NavigationContainer>
//       <RootStack.Navigator screenOptions={{ headerShown: false }} >
//         <RootStack.Screen name="Welcome" component={WelcomePage} />
//         <RootStack.Screen name="Details" component={DetailsScreen} />

//         <RootStack.Screen name="MainTabs" component={TabNavigator} />
//       </RootStack.Navigator>
//     </NavigationContainer>
//   );
// }

const StackNavigator = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomePage}/>
        <Stack.Screen name="Details" component={DetailsScreen}/>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="Note" component={NoteEntry}/>
      </Stack.Navigator>
  );
};
const TabNavigator = () => {
  return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Calender" component={CalendarPage}/>
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