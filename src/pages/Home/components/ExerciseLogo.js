import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../../../constants/COLORS';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';

const ExerciseLogo = ({ children, exerciseName }) => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return (
        <View style={styles.container}>
            <View style={styles.logoCard}>
                {children}
            </View>
            <Text style={{
                marginTop: 6,
                fontSize: 18,
                fontWeight: 'bold',
                color: currentTheme.fontColor
            }}>{exerciseName}</Text>
        </View>
    )
}

export default ExerciseLogo

const styles = StyleSheet.create({
    container: {
        width: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoCard: {
        borderRadius: 24,
        width: 80,
        height: 50,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
})