import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SIZE from '../../../../constants/SIZE'
import DATE from '../../../../constants/DATE'
import { useState } from 'react'
import useRecords from '../../../../hooks/useRecords'
import { useEffect } from 'react'
import TopCardDataShow from './components/TopCardDataShow'
import Chart from './components/Chart'
import { BarchartsOptions } from '../../utils/BarchartsOptions'
import useUserTheme from '../../../../hooks/useUserTheme'
import APPTHEME from '../../../../constants/COLORS/APPTHEME'

const TodaysExercises = ({ }) => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { weeklyData, monthlyData, yearlyData } = useRecords()
    const [weekDataChatsOption, setWeekDataChatsOption] = useState()
    const [monthDataChatsOption, setMonthDataChatsOption] = useState()
    const [yearDataChatsOption, setYearDataChatsOption] = useState()
    const [selectDateType, setSelectDateType] = useState(DATE.week)
    useEffect(() => {
        const dateArr = weeklyData.map((item) => item.week)
        const durationArr = weeklyData.map((item) => item.duration)
        const calorieArr = weeklyData.map((item) => item.calories)
        const stepArr = weeklyData.map((item) => item.steps)
        const distanceArr = weeklyData.map((item) => item.distance)
        setWeekDataChatsOption(BarchartsOptions(dateArr, durationArr, '时长', calorieArr, '卡路里', stepArr, '步数', distanceArr, '距离'))
    }, [weeklyData])
    useEffect(() => {
        const dateArr = monthlyData.map((item) => item.month)
        const durationArr = monthlyData.map((item) => item.duration)
        const calorieArr = monthlyData.map((item) => item.calories)
        const stepArr = monthlyData.map((item) => item.steps)
        const distanceArr = monthlyData.map((item) => item.distance)
        setMonthDataChatsOption(BarchartsOptions(dateArr, durationArr, '时长', calorieArr, '卡路里', stepArr, '步数', distanceArr, '距离'))
    }, [monthlyData])
    useEffect(() => {
        const dateArr = yearlyData.map((item) => item.year)
        const durationArr = weeklyData.map((item) => item.duration)
        const calorieArr = weeklyData.map((item) => item.calories)
        const stepArr = weeklyData.map((item) => item.steps)
        const distanceArr = weeklyData.map((item) => item.distance)
        setYearDataChatsOption(BarchartsOptions(dateArr, durationArr, '时长', calorieArr, '卡路里', stepArr, '步数', distanceArr, '距离'))
    }, [yearlyData])
    return (
        <ScrollView style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
            {/* 选择日期 */}
            <View style={{ marginHorizontal: '3%', backgroundColor: currentTheme.contentColor, borderRadius: SIZE.CardBorderRadius, paddingHorizontal: SIZE.NormalMargin, paddingBottom: SIZE.NormalMargin, marginTop: SIZE.NormalMargin }}>
                <View style={{ flexDirection: 'row', marginVertical: SIZE.NormalMargin, }}>
                    <TouchableOpacity
                        onPress={() => {
                            setSelectDateType(DATE.week)
                        }}
                        style={{ flex: 1, flexDirection: 'row', padding: 4, justifyContent: 'center', backgroundColor: currentTheme.backgroundColor, borderTopLeftRadius: SIZE.CardBorderRadius, borderBottomLeftRadius: SIZE.CardBorderRadius, overflow: 'hidden' }}
                    >
                        <View style={{ flex: 1, backgroundColor: selectDateType === DATE.week ? currentTheme.contentColor : currentTheme.backgroundColor, padding: SIZE.NormalMargin, flexDirection: 'row', justifyContent: 'center', borderRadius: SIZE.CardBorderRadius }}>
                            <Text style={{ fontWeight: 'bold', color: currentTheme.fontColor }}>{DATE.week}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setSelectDateType(DATE.month)
                        }}
                        style={{ flex: 1, flexDirection: 'row', padding: 4, justifyContent: 'center', backgroundColor: currentTheme.backgroundColor, overflow: 'hidden' }}
                    >
                        <View style={{ flex: 1, backgroundColor: selectDateType === DATE.month ? currentTheme.contentColor : currentTheme.backgroundColor, padding: SIZE.NormalMargin, flexDirection: 'row', justifyContent: 'center', borderRadius: SIZE.CardBorderRadius }}>
                            <Text style={{ fontWeight: 'bold', color: currentTheme.fontColor }}>{DATE.month}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setSelectDateType(DATE.year)
                        }}
                        style={{ flex: 1, flexDirection: 'row', padding: 4, justifyContent: 'center', backgroundColor: currentTheme.backgroundColor, borderTopRightRadius: SIZE.CardBorderRadius, borderBottomRightRadius: SIZE.CardBorderRadius, overflow: 'hidden' }}>
                        <View style={{ flex: 1, backgroundColor: selectDateType === DATE.year ? currentTheme.contentColor : currentTheme.backgroundColor, padding: SIZE.NormalMargin, flexDirection: 'row', justifyContent: 'center', borderRadius: SIZE.CardBorderRadius }}>
                            <Text style={{ fontWeight: 'bold', color: currentTheme.fontColor }}>{DATE.year}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {(selectDateType === DATE.week && weeklyData.length !== 0) && <TopCardDataShow
                    date={weeklyData[weeklyData.length - 1].week}
                    duration={weeklyData[weeklyData.length - 1].duration}
                    calorie={weeklyData[weeklyData.length - 1].calories}
                    step={weeklyData[weeklyData.length - 1].steps}
                    distance={weeklyData[weeklyData.length - 1].distance}
                />
                }
                {(selectDateType === DATE.month && monthlyData.length !== 0) && <TopCardDataShow
                    date={monthlyData[monthlyData.length - 1].month}
                    duration={monthlyData[monthlyData.length - 1].duration}
                    calorie={monthlyData[monthlyData.length - 1].calories}
                    step={monthlyData[monthlyData.length - 1].steps}
                    distance={monthlyData[monthlyData.length - 1].distance}
                />}
                {selectDateType === DATE.year && <TopCardDataShow
                    date={yearlyData[yearlyData.length - 1].year}
                    duration={yearlyData[yearlyData.length - 1].duration}
                    calorie={yearlyData[yearlyData.length - 1].calories}
                    step={yearlyData[yearlyData.length - 1].steps}
                    distance={yearlyData[yearlyData.length - 1].distance}
                />}
            </View>
            <View style={{ marginHorizontal: '3%', backgroundColor: currentTheme.contentColor, borderRadius: SIZE.CardBorderRadius, paddingBottom: SIZE.NormalMargin, marginTop: SIZE.NormalMargin }}>
                {selectDateType == DATE.week && <View>
                    <Chart options={weekDataChatsOption} />
                </View>}
                {selectDateType == DATE.month && <View>
                    <Chart options={monthDataChatsOption} />
                </View>}
                {selectDateType == DATE.year && <View>
                    <Chart options={yearDataChatsOption} />
                </View>}
            </View>
        </ScrollView >
    )
}

export default TodaysExercises

const styles = StyleSheet.create({})