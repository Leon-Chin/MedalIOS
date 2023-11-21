import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../../../constants/COLORS';

const ExerciseLogo = ({ children, exerciseName }) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoCard}>
                {children}
            </View>
            <Text style={styles.exerciseName}>{exerciseName}</Text>
        </View>
    )
}

export default ExerciseLogo

const styles = StyleSheet.create({
    container: {
        width: 80,
        justifyContent: 'center',
        marginBottom: 10,
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
    exerciseName: {
        marginTop: 6,
        fontSize: 18,
        fontWeight: '700'
    }
})