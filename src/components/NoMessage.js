import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';

const { width } = Dimensions.get('window')
const NoMessage = () => {
    return (
        <View style={{
            width: width * 0.9,
            height: width
        }}>
            <Lottie source={require('../../assets/lottie/noMessage.json')} autoPlay loop />
        </View>
    )
}

export default NoMessage