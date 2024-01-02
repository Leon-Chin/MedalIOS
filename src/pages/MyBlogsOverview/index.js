import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FavoriteBlogs from './Screens/FavoriteBlogs'
import LikeBlogs from './Screens/LikeBlogs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyBlogs from './Screens/MyBlogs';
import useUserTheme from '../../hooks/useUserTheme';
import APPTHEME from '../../constants/COLORS/APPTHEME';
import { useIntl } from 'react-intl';

const Tab = createMaterialTopTabNavigator();
const MyBlogsOverview = () => {
    const { formatMessage } = useIntl()
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
                options={{ tabBarLabel: formatMessage({ id: 'app.blog.likedBlog' }) }}
            />
            <Tab.Screen
                name="MyBlogs"
                component={MyBlogs}
                options={{ tabBarLabel: formatMessage({ id: 'app.blog.myBlog' }) }}
            />
            <Tab.Screen
                name="FavoriteBlogs"
                component={FavoriteBlogs}
                options={{ tabBarLabel: formatMessage({ id: 'app.blog.favBlog' }) }}
            />
        </Tab.Navigator>
    )
}

export default MyBlogsOverview

const styles = StyleSheet.create({})