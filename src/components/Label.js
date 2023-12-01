import React from 'react'
import { Text, } from 'react-native';
import useUserTheme from '../hooks/useUserTheme';
import APPTHEME from '../constants/COLORS/APPTHEME';
const Label = ({ children }) => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return <Text style={{ fontSize: 20, fontWeight: '700', marginVertical: 10, color: currentTheme.fontColor }}>{children}</Text>
};
export default Label