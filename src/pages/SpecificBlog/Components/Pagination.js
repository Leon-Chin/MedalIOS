import { View, Animated, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import COLORS from '../../../constants/COLORS'
const { width } = Dimensions.get('screen')
const Pagination = ({ imgs, scrollX, index }) => {
    return (
        <View style={styles.container}>
            {imgs.map((item, idx) => {
                const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width]
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [12, 30, 12],
                    extrapolate: 'clamp'
                })
                return <Animated.View key={idx} style={[styles.dot, { width: dotWidth }, idx === index && { backgroundColor: COLORS.primary }]} />
            })}
        </View>
    )
}

export default Pagination
const styles = StyleSheet.create({
    container: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#ccc'
    }
})