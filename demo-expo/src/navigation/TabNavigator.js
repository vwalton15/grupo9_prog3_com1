import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import NewPost from '../screens/NewPost';
import StackNavigator2 from './StackNavigator2';
import Perfil from '../screens/Perfil';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen name="StackNavigator2" component={StackNavigator2} options={{ tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />, headerShown: false }} />
            <Tab.Screen name="NewPost" component={NewPost} options={{ tabBarIcon: () => <Ionicons name="add-circle-outline" size={24} color="black" />, headerShown: false }} />
            <Tab.Screen name="Perfil" component={Perfil} options={{ tabBarIcon: () => <MaterialCommunityIcons name="account-circle-outline" size={24} color="black" />, headerShown: false }} />
        </Tab.Navigator>
    )
}