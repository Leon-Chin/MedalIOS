import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import COLORS from '../../../constants/COLORS';
import { useNavigation } from '@react-navigation/native';
import useMeasurement from '../../../hooks/useMeasurement';
import { formatTimeForChartSoloItem } from '../../../utils/formatTime';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';
import { ICON } from '../../../constants/SVG/ICON';

const BodyMetric = () => {
    const { navigate } = useNavigation()
    const { latestMeasurement } = useMeasurement()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return (
        <TouchableOpacity
            onPress={() => navigate("Statistics")}
            style={{ flex: 1, height: 100, backgroundColor: currentTheme.contentColor, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 8 }}
        >
            <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: currentTheme.fontColor }}>体重</Text>
                {ICON.right(24, currentTheme.fontColor)}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: currentTheme.fontColor }}>{latestMeasurement.weight}</Text>
                <Text style={{ fontSize: 16, color: COLORS.commentText }}>(kg)</Text>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <Text style={{ fontSize: 10, color: COLORS.commentText }}>记录于</Text>
                <Text style={{ fontSize: 10, color: COLORS.commentText }}>{formatTimeForChartSoloItem(new Date(latestMeasurement.date))}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default BodyMetric