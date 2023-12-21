import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../constants/COLORS'

const NothingMore = () => {
    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ color: COLORS.commentText }}>--没有更多了--</Text>
            </View>
            <View style={{ height: 70 }}></View>
        </>
    )
}

export default NothingMore