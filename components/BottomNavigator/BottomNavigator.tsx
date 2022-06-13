import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { Chats } from '../Chats/Chats';
import { Home } from '../Home/Home';
import { FontAwesome5 } from '@expo/vector-icons';
import { Friends } from '../Friends/Friends';


const Tab = createBottomTabNavigator();

export const BottomNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" size={size} color={color} /> }} />
        <Tab.Screen name="Chats" component={Chats} options={{ tabBarIcon: ({ color, size }) => <FontAwesome5 name="envelope" size={size} color={color} /> }} />
        <Tab.Screen name="Friends" component={Friends} options={{ tabBarIcon: ({color, size }) => <FontAwesome5 name="user-friends" size={size} color={color} />}} />
    </Tab.Navigator>
)