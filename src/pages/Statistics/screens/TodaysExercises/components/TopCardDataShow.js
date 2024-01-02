import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../../../../../constants/COLORS'
import SIZE from '../../../../../constants/SIZE'
import { secToSpecificMin } from '../../../../../utils/funcs'
import useUserTheme from '../../../../../hooks/useUserTheme'
import APPTHEME from '../../../../../constants/COLORS/APPTHEME'
import { useIntl } from 'react-intl'

const TopCardDataShow = ({ duration, date, calorie, distance, step }) => {
    const { formatMessage} = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: COLORS.commentText, fontSize: 12, fontWeight: 'bold' }}>{formatMessage({ id: 'app.statistic.timeTake' })}</Text>
                <Text style={{ color: COLORS.commentText, fontSize: 12, fontWeight: 'bold' }}>{formatMessage({ id: 'app.statistic.since' })}{(date) && date}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: SIZE.NormalMargin }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={{ color: currentTheme.fontColor, fontSize: SIZE.LargerTitle, fontWeight: 'bold' }}>{duration !== undefined ? secToSpecificMin(duration) : "--"}</Text>
                    <Text style={{ color: COLORS.commentText, fontSize: 12, fontWeight: 'bold' }}>{formatMessage({ id: 'app.statistic.durationUnit' })}</Text>
                </View>
                <Text style={{ color: COLORS.commentText, fontSize: 12, fontWeight: 'bold' }}>{ }</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SIZE.NormalMargin }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: SIZE.LittleMargin }}>
                    <Text style={{ color: COLORS.commentText, fontSize: 12, fontWeight: 'bold' }}>{formatMessage({ id: 'app.statistic.burnt' })}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', }}>
                        <Text style={{ color: currentTheme.fontColor, fontSize: SIZE.SmallTitle, fontWeight: 'bold' }}>{calorie !== undefined ? calorie.toFixed(1) : "--"}</Text>
                        <Text style={{ color: COLORS.commentText, fontSize: 12, fontWeight: 'bold' }}>{formatMessage({ id: 'app.statistic.calorieUnit' })}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: SIZE.LittleMargin }}>
                    <Text style={{ color: COLORS.commentText, fontSize: 12, fontWeight: 'bold' }}>{formatMessage({ id: 'app.statistic.dist' })}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', }}>
                        <Text style={{ color: currentTheme.fontColor, fontSize: SIZE.SmallTitle, fontWeight: 'bold' }}>{distance !== undefined ? distance : "--"}</Text>
                        <Text style={{ color: COLORS.commentText, fontSize: 12, fontWeight: 'bold' }}>{formatMessage({ id: 'app.statistic.distanceUnit' })}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: SIZE.LittleMargin }}>
                    <Text style={{ color: COLORS.commentText, fontSize: 12, fontWeight: 'bold' }}>{formatMessage({ id: 'app.statistic.step' })} </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', }}>
                        <Text style={{ color: currentTheme.fontColor, fontSize: SIZE.SmallTitle, fontWeight: 'bold' }}>{step !== undefined ? step : "--"}</Text>
                        <Text style={{ color: COLORS.commentText, fontSize: 12, fontWeight: 'bold' }}>{formatMessage({ id: 'app.statistic.stepUnit' })}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default TopCardDataShow

const styles = StyleSheet.create({})