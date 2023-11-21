import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import COLORS from '../../../constants/COLORS';

const BodyMetric = () => {
    return (
        <TouchableOpacity style={{ flex: 1, height: 100, backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 8 }}>
            <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>体重</Text>
                <Entypo name="chevron-small-right" size={24} color="black" />
            </View>
            <View style={{ flexDirection: 'row', height: 20, alignItems: 'baseline' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>78</Text>
                <Text style={{ fontSize: 16, color: COLORS.commentText }}>(kg)</Text>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <Text style={{ fontSize: 10, color: COLORS.commentText }}>记录于</Text>
                <Text style={{ fontSize: 10, color: COLORS.commentText }}>{new Date().toDateString()}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default BodyMetric