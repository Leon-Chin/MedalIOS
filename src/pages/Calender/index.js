import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../../constants/COLORS'
import { ICON } from '../../constants/SVG/ICON'
import { useState } from 'react'
import { useEffect } from 'react'
import { checkIsToday } from '../../utils/checkIsToday'
import TodayTodo from './components/TodayTodo'
import PersonalRecommend from './components/PersonalRecommend'
import SelectDayHeader from './components/SelectDayHeader'
import { useDispatch } from 'react-redux'
import { setUserSelectDay } from '../../redux/CalendarSlice'

const MyExercise = () => {
    const dispatch = useDispatch()
    const [selectDay, setSelectDay] = useState(new Date())
    const [isToday, setIsToday] = useState(true)
    useEffect(() => {
        const whetherToday = checkIsToday(selectDay)
        setIsToday(whetherToday)
        dispatch(setUserSelectDay(selectDay.toISOString()))
    }, [selectDay])

    return (
        <SafeAreaView style={{ flex: 1, marginHorizontal: '3%', }}>
            <SelectDayHeader isToday={isToday} setSelectDay={setSelectDay} selectDay={selectDay} />
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                <TodayTodo selectDay={selectDay} />
                <PersonalRecommend selectDay={selectDay} />
            </ScrollView>
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', position: 'absolute', bottom: 110, right: 10, width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.primary }}>
                {ICON.agent(30, '#fff')}
            </TouchableOpacity>
        </SafeAreaView >
    )
}

export default MyExercise

const styles = StyleSheet.create({})