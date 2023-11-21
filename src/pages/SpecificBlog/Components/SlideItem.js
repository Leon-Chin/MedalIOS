import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('screen')
const SlideItem = ({ img }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: img }} resizeMode='contain' style={styles.image} />
        </View>
    )
}

export default SlideItem

const styles = StyleSheet.create({
    container: {
        width,
        height: height * 0.6,
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: '100%'
    }
})