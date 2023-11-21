import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../../constants/COLORS'
import { Entypo, Foundation } from '@expo/vector-icons';
import { ICON } from '../../../constants/SVG/ICON'
import { useNavigation } from '@react-navigation/native';

const TodayRecord = () => {
    const { navigate } = useNavigation()
    return (
        <View style={{ marginHorizontal: '3%', marginVertical: 10, backgroundColor: '#fff', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14 }}>
            {/* title */}
            <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Foundation name="calendar" size={24} color={COLORS.green} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.green }}>今日运动记录</Text>
                </View>
                <TouchableOpacity onPress={() => navigate('TodaysExercises')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {ICON.right(18, COLORS.gray)}
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: COLORS.commentText, fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>运动时长</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={{ color: COLORS.black, fontSize: 26, fontWeight: 'bold' }}>0</Text>
                        <Text style={{ color: COLORS.black, fontSize: 14, fontWeight: 'bold' }}>分钟</Text>
                    </View>
                </View>
                <View style={{ width: 10 }}></View>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: COLORS.commentText, fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>运动消耗</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={{ color: COLORS.black, fontSize: 26, fontWeight: 'bold' }}>0</Text>
                        <Text style={{ color: COLORS.black, fontSize: 14, fontWeight: 'bold' }}>千卡</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default TodayRecord

const styles = StyleSheet.create({})