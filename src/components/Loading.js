import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';

const { width } = Dimensions.get('window')
const Loading = () => {
    return (
        <View style={{
            width: width * 0.9,
            height: width * 0.4
        }}>
            <Lottie source={require('../../assets/lottie/loading.json')} autoPlay loop />
        </View>
    )
}

export default Loading