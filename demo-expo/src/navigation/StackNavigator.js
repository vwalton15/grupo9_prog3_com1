import React from "react";
import { createStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/Register";
import Login from "../screens/Login";
import TabNavigator from "./TabNavigator"; 

const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName="TabNavigator">
            <Stack.Screen namde= 'Login' component={ Login } options={{ headerShown: false }} />
            <Stack.Screen name= 'Register' component={ Register } options={{ headerShown: false }} />
            <Stack.Screen name= 'TabNavigator' component={ TabNavigator } options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
