import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FavoriteTutorial from './Screens/FavoriteTutorial'
import PractisedTutorial from './Screens/PractisedTutorial'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import useUserTheme from '../../hooks/useUserTheme';
import APPTHEME from '../../constants/COLORS/APPTHEME';
import { useIntl } from 'react-intl';

const Tab = createMaterialTopTabNavigator();

const ExerciseOverview = () => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return (
        <Tab.Navigator
            initialRouteName="FavoriteTutorial"
            screenOptions={{
                tabBarStyle: { backgroundColor: currentTheme.contentColor },
                tabBarLabelStyle: { fontSize: 14, color: currentTheme.fontColor, fontWeight: 'bold', textTransform: 'none' },
            }}
        >
            <Tab.Screen
                name="FavoriteTutorial"
                component={FavoriteTutorial}
                options={{ tabBarLabel: formatMessage({ id: 'app.tut.favTut' }) }}
            />
            <Tab.Screen
                name="PractisedTutorial"
                component={PractisedTutorial}
                options={{ tabBarLabel: formatMessage({ id: 'app.tut.pracTut' }) }}
            />
        </Tab.Navigator>
    )
}

export default ExerciseOverview

const styles = StyleSheet.create({})