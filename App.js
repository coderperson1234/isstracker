import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  NavigationContainer
} from '@react-navigation/native';
import {
  createStackNavigator
} from '@react-navigation/stack';

import HomeScreen from './screens/homeScreen';
import IssLocation from './screens/issLocation';
import MeteorLocation from './screens/meteorLocation';

const stack = createStackNavigator();

function App() {
  return ( <
    NavigationContainer >
    <
    stack.Navigator initialRouteName = "HomeScreen"
    screenOptions = {
      {
        headerShown: false
      }} >
        <stack.Screen name="Home" component={HomeScreen}/>
        <stack.Screen name="IssLocation" component={IssLocation}/>
        <stack.Screen name="MeteorLocation" component={MeteorLocation}/>

    </stack.Navigator>
     </NavigationContainer >

  );
}
export default App;

