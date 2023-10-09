import React, { useState, useEffect } from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/logScreens/RegisterScreen'
import LoginScreen from './screens/logScreens/LoginScreen'
import StartScreen from './screens/StartScreen';
import MessageScreen from './screens/MessageScreen';
import Ionicons from '@expo/vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from './screens/ChatScreen';
import FriendScreen from './screens/FriendScreen';
import SettingScreen from './screens/SettingScreen';
import NewMessageScreen from './screens/NewMessageScreen';
import UserProfileScreen from './screens/userScreens/UserProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ({navigation, route}: any) => {
  const { userData } = route.params
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fafafa',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 70,
        },
      }}>
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'}
              size={25}
            />
          ),
        }}
        initialParams={{
          userData
        }}
      />
      <Tab.Screen
        name="Friend"
        component={FriendScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'md-people' : 'md-people-outline'} size={25} />
          ),
        }}
        initialParams={{
          userData
        }}
      />
      <Tab.Screen
        name="Setting"
        component={UserProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'md-settings' : 'md-settings-outline'} size={25} />
          ),
        }}
        initialParams={{
          userData
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeTabs" component={TabNavigator} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="MessageScreen" component={MessageScreen}/>
        <Stack.Screen name="NewMessageScreen" component={NewMessageScreen} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

