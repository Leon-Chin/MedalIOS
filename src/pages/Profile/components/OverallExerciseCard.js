import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import COLORS from '../../../constants/COLORS';


const OverallExerciseCard = () => {
    return (
        <TouchableOpacity style={{ flex: 1, height: 100, backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 8 }}>
            <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>总运动</Text>
                <Entypo name="chevron-small-right" size={24} color="black" />
            </View>
            <View style={{ flexDirection: 'row', height: 20, alignItems: 'baseline' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>10</Text>
                <Text style={{ fontSize: 16, color: COLORS.commentText }}>min</Text>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <Text style={{ fontSize: 10, color: COLORS.commentText }}>本周消耗</Text>
                <Text style={{ fontSize: 10, color: COLORS.commentText }}>{0}</Text>
                <Text style={{ fontSize: 10, color: COLORS.commentText }}>千卡</Text>
            </View>
        </TouchableOpacity>
    )
}

export default OverallExerciseCard