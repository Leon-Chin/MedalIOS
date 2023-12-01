import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SIZE from '../../../constants/SIZE'
import COLORS from '../../../constants/COLORS'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'

const StatisticHeader = ({ latestMeasurement }) => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]

    const ItemCard = ({ title, value }) => <View style={{ gap: 6, flex: 1, backgroundColor: currentTheme.contentColor, padding: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius, }}>
        <Text style={{ fontSize: SIZE.SmallTitle, color: currentTheme.fontColor }} numberOfLines={1}>{title}</Text>
        <Text style={{ fontSize: SIZE.LargerTitle, color: currentTheme.fontColor }}>{value ? value : "--"}</Text>
    </View>
    return (
        <View style={{ gap: 4, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: SIZE.NormalMargin, paddingHorizontal: SIZE.NormalMargin, }}>
            <ItemCard title={"体重(kg)"} value={latestMeasurement?.weight} />
            <ItemCard title={"身高(cm)"} value={latestMeasurement?.height} />
            <ItemCard title={"BMI"} value={latestMeasurement?.BMI} />
            <ItemCard title={"体脂率%"} value={latestMeasurement?.bodyFatRate} />
        </View>
    )
}

export default StatisticHeader

const styles = StyleSheet.create({})