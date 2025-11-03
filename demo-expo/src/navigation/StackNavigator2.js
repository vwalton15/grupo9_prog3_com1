import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "../screens/Home";
import Comentarios from "../screens/Comentarios";

const Stack = createNativeStackNavigator();
export default function StackNavigator2() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>

        </Stack.Navigator>
    )
}