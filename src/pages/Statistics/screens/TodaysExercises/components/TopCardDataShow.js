import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../../../../../constants/COLORS'
import SIZE from '../../../../../constants/SIZE'
import { secToSpecificMin } from '../../../../../utils/funcs'
import useUserTheme from '../../../../../hooks/useUserTheme'
import APPTHEME from '../../../../../constants/COLORS/APPTHEME'

const TopCardDataShow = ({ duration, date, calorie, distance, step }) => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: COLORS.commentText, fontSize: 12, fontWeight: 'bold' }}>运动时长</Text>
                <Text style={{ color: COLORS.commentText, fontSize: 12, fontWeight: 'bold' }}>自{(date) && date}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: SIZE.NormalMargin }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={{ color: currentTheme.fontColor, fontSize: SIZE.LargerTitle, fontWeight: 'bold' }}>{duration !== undefined ? secToSpecificMin(duration) : "--"}</Text>
                    <Text style={{ color: COLORS.commentText, fontSize: 12, fontWeight: 'bold' }}>min</Text>
                </View>
                <Text style={{ color: COLORS.commentText, fontSize: 12, fontWeight: 'bold' }}>{ }</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SIZE.NormalMargin }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: SIZE.LittleMargin }}>
                    <Text style={{ color: COLORS.commentText, fontSize: 12, fontWeight: 'bold' }}>消耗</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', }}>
                        <Text style={{ color: currentTheme.fontColor, fontSize: SIZE.SmallTitle, fontWeight: 'bold' }}>{calorie !== undefined ? calorie.toFixed(1) : "--"}</Text>
                        <Text style={{ color: COLORS.commentText, fontSize: 12, fontWeight: 'bold' }}>kcal</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: SIZE.LittleMargin }}>
                    <Text style={{ color: COLORS.commentText, fontSize: 12, fontWeight: 'bold' }}>距离</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', }}>
                        <Text style={{ color: currentTheme.fontColor, fontSize: SIZE.SmallTitle, fontWeight: 'bold' }}>{distance !== undefined ? distance : "--"}</Text>
                        <Text style={{ color: COLORS.commentText, fontSize: 12, fontWeight: 'bold' }}>m</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: SIZE.LittleMargin }}>
                    <Text style={{ color: COLORS.commentText, fontSize: 12, fontWeight: 'bold' }}>步数</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', }}>
                        <Text style={{ color: currentTheme.fontColor, fontSize: SIZE.SmallTitle, fontWeight: 'bold' }}>{step !== undefined ? step : "--"}</Text>
                        <Text style={{ color: COLORS.commentText, fontSize: 12, fontWeight: 'bold' }}>步</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default TopCardDataShow

const styles = StyleSheet.create({})