import React, { useEffect, useState } from 'react'
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../../constants/COLORS';
import { ICON } from '../../../constants/SVG/ICON';
import useTodayExerciseDuration from '../../../hooks/useTodayExerciseDuration';
import { secToMin } from '../../../utils/funcs';

const TimeCard = () => {
    const { navigate } = useNavigation()
    const duration = useTodayExerciseDuration()
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'coloumn',
                height: 80,
                paddingVertical: 6,
                paddingHorizontal: 10,
                backgroundColor: '#fff',
                justifyContent: 'space-around',
                alignItems: 'center',
                borderRadius: 10,
            }}>
            <View style={{ height: 30, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    {ICON.time(18, COLORS.colorieOrange)}
                    <Text style={{ fontWeight: "bold", color: COLORS.colorieOrange, fontSize: 16 }}>Time</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigate('Statistics')}
                    style={{ justifyContent: 'center', alignItems: 'center', width: 20, height: 20, borderRadius: 10, backgroundColor: COLORS.colorieOrangeBackground }}
                >
                    {ICON.right(18, COLORS.colorieOrange)}
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, width: '100%', paddingHorizontal: '6%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                    {
                        duration ? <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{secToMin(duration)}</Text> :
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>--</Text>
                    }
                    <Text style={{ color: COLORS.commentText, fontSize: 16, fontWeight: 'bold' }}>min</Text>
                </View>
            </View>
        </View>
    );
};
export default TimeCard