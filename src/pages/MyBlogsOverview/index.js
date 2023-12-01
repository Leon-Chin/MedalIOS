import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FavoriteBlogs from './Screens/FavoriteBlogs'
import LikeBlogs from './Screens/LikeBlogs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyBlogs from './Screens/MyBlogs';
import useUserTheme from '../../hooks/useUserTheme';
import APPTHEME from '../../constants/COLORS/APPTHEME';

const Tab = createMaterialTopTabNavigator();
const MyBlogsOverview = () => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return (
        <Tab.Navigator
            initialRouteName="MyBlogs"
            screenOptions={{
                tabBarStyle: { backgroundColor: currentTheme.contentColor },
                tabBarLabelStyle: { fontSize: 14, color: currentTheme.fontColor, fontWeight: 'bold', textTransform: 'none' },
            }}
        >
            <Tab.Screen
                name="LikeBlogs"
                component={LikeBlogs}
                options={{ tabBarLabel: `点赞博客` }}
            />
            <Tab.Screen
                name="MyBlogs"
                component={MyBlogs}
                options={{ tabBarLabel: `全部博客` }}
            />
            <Tab.Screen
                name="FavoriteBlogs"
                component={FavoriteBlogs}
                options={{ tabBarLabel: `收藏博客` }}
            />
        </Tab.Navigator>
    )
}

export default MyBlogsOverview

const styles = StyleSheet.create({})