import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const AfterExcercise = () => {
    const { navigate } = useNavigation()
    return (
        <View>
            <Text>AfterExcercise</Text>
            <TouchableOpacity
                onPress={() => navigate()}
            >
                <Text>接着做一个伸展运动吧，更有效缓解疲劳</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AfterExcercise

const styles = StyleSheet.create({})