import Home from '../screens/Home';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return(
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen name= "Home" component={ Home } options={{ tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />, headerShown: false}} />
        </Tab.Navigator>
    )
}