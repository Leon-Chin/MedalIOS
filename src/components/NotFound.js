import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';

const { width } = Dimensions.get('window')
const NotFound = () => {
    return (
        <View style={{
            width: width * 0.9,
            height: width * 0.6
        }}>
            <Lottie source={require('../../assets/lottie/notFound.json')} autoPlay loop />
        </View>
    )
}

export default NotFound