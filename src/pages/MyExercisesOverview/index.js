import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FavoriteTutorial from './Screens/FavoriteTutorial'
import PractisedTutorial from './Screens/PractisedTutorial'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const ExerciseOverview = () => {
    return (
        <Tab.Navigator
            initialRouteName="FavoriteTutorial"
            screenOptions={{
                tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', textTransform: 'none' },
            }}
        >
            <Tab.Screen
                name="FavoriteTutorial"
                component={FavoriteTutorial}
                options={{ tabBarLabel: `收藏课程` }}
            />
            <Tab.Screen
                name="PractisedTutorial"
                component={PractisedTutorial}
                options={{ tabBarLabel: `练过课程` }}
            />
        </Tab.Navigator>
    )
}

export default ExerciseOverview

const styles = StyleSheet.create({})