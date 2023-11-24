import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SIZE from '../../../constants/SIZE'
import COLORS from '../../../constants/COLORS'

const StatisticHeader = ({ latestMeasurement }) => {
    return (
        <View style={{ gap: 4, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: SIZE.NormalMargin, paddingHorizontal: SIZE.NormalMargin, }}>
            <ItemCard title={"体重(kg)"} value={latestMeasurement?.weight} />
            <ItemCard title={"身高(cm)"} value={latestMeasurement?.height} />
            <ItemCard title={"BMI"} value={latestMeasurement?.BMI} />
            <ItemCard title={"体脂率%"} value={latestMeasurement?.bodyFatRate} />
        </View>
    )
}

const ItemCard = ({ title, value }) => {
    return (
        <View style={{ gap: 6, flex: 1, backgroundColor: COLORS.white, padding: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius, borderColor: COLORS.gray, borderWidth: 1 }}>
            <Text style={{ fontSize: SIZE.SmallTitle }} numberOfLines={1}>{title}</Text>
            <Text style={{ fontSize: SIZE.LargerTitle }}>{value ? value : "--"}</Text>
        </View>
    )
}

export default StatisticHeader

const styles = StyleSheet.create({})