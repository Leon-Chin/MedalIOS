import React, { useEffect, useState } from 'react'
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../../constants/COLORS';
import { ICON } from '../../../constants/SVG/ICON';
import useTodayExerciseDuration from '../../../hooks/useTodayExerciseDuration';
import { secToMin } from '../../../utils/funcs';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';
import { useIntl } from 'react-intl';

const TimeCard = () => {
    const { formatMessage } = useIntl()
    const { navigate } = useNavigation()
    const duration = useTodayExerciseDuration()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'coloumn',
                height: 80,
                paddingVertical: 6,
                paddingHorizontal: 10,
                backgroundColor: currentTheme.contentColor,
                justifyContent: 'space-around',
                alignItems: 'center',
                borderRadius: 10,
            }}>
            <View style={{ height: 30, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    {ICON.time(18, COLORS.colorieOrange)}
                    <Text style={{ fontWeight: "bold", color: COLORS.colorieOrange, fontSize: 16 }}>{formatMessage({ id: 'app.dashboard.time' })}</Text>
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
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: currentTheme.fontColor }}>{duration ? secToMin(duration) : "--"}</Text>
                    <Text style={{ color: COLORS.commentText, fontSize: 16, fontWeight: 'bold' }}>{formatMessage({ id: 'app.dashboard.timeUnit' })}</Text>
                </View>
            </View>
        </View>
    );
};
export default TimeCard