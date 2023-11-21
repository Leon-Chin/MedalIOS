import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';
import Home from '../pages/Home';
import { View } from 'react-native';
import Community from '../pages/Community';
import Communication from '../pages/Communication';
import Profile from '../pages/Profile';
import MyExercise from '../pages/Calender';
import COLORS from '../constants/COLORS';

const Tab = createBottomTabNavigator();
const screenOptions = {
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 80
    }
}
const BottomNavigationBar = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Dashboard"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => <View style={
                        focused ? { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary, display: 'flex', justifyContent: 'center', alignItems: 'center' } : { width: 40, height: 40, borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }
                    }>
                        <AntDesign name="home" size={24} color={focused ? '#fff' : 'black'} />
                    </View>
                }}
            />
            <Tab.Screen
                name="Community"
                component={Community}
                options={{
                    tabBarIcon: ({ focused }) =>
                        <View style={
                            focused ? { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary, display: 'flex', justifyContent: 'center', alignItems: 'center' } : { width: 40, height: 40, borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }
                        }>
                            <Entypo name="picasa" size={24} color={focused ? "#fff" : "black"} />
                        </View>,
                }}
            />
            <Tab.Screen
                name="MyExercise"
                component={MyExercise}
                options={{
                    tabBarIcon: ({ focused }) =>
                        <View style={
                            focused ? { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary, display: 'flex', justifyContent: 'center', alignItems: 'center' } : { width: 40, height: 40, borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }
                        }>
                            <MaterialIcons name="date-range" size={28} color={focused ? "#fff" : "black"} />
                        </View>
                }}
            />
            <Tab.Screen
                name="Messages"
                component={Communication}
                options={{
                    tabBarIcon: ({ focused }) =>
                        <View style={
                            focused ? { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary, display: 'flex', justifyContent: 'center', alignItems: 'center' } : { width: 40, height: 40, borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }
                        }>
                            <AntDesign name='message1' size={24} color={focused ? "#fff" : "black"} />
                        </View>,
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => <View style={
                        focused ? { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary, display: 'flex', justifyContent: 'center', alignItems: 'center' } : { width: 40, height: 40, borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }
                    }>
                        <Ionicons name={focused ? "person" : "person-outline"} size={24} color={focused ? "#fff" : "black"} />
                    </View>
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomNavigationBar