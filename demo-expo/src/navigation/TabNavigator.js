import Home from '../screens/Home';
import Profile from '../screens/Profile';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return(
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen name= "Home" component={ Home } options={{ BarIcon: () => <FontAwesome name="home" size={24} color="black" />, headerShown: false}} />
            <Tab.Screen name= "Profile" component={ Profile } options={{tabBarIcon: () => <MaterialCommunityIcons name="face-man" size={24} color="black" />, headerShown: false }} />
            <Tab.Screen name= "Add" component= {Ionicons} options={{tabBarIcon: () => <Ionicons name="add-circle-outline" size={24} color="black" />, headerShown: false }} />
        </Tab.Navigator>
    )
}