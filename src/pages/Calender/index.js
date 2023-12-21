import { SafeAreaView, ScrollView, StyleSheet, RefreshControl, TouchableOpacity, View, Text, Alert } from 'react-native'
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
import useUserTheme from '../../hooks/useUserTheme'
import APPTHEME from '../../constants/COLORS/APPTHEME'
import { getsessions } from '../../api/session.api'
import { setSessions } from '../../redux/SessionSlice'
import MyExercisesCard from '../Profile/components/MyExercisesCard'
import SIZE from '../../constants/SIZE'
import NothingMore from '../../components/NothingMore'
import { useNavigation } from '@react-navigation/native'

const MyExercise = () => {
    const dispatch = useDispatch()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const [selectDay, setSelectDay] = useState(new Date())
    useEffect(() => {
        setSelectDay(new Date())
    }, [])
    const [isToday, setIsToday] = useState(true)
    useEffect(() => {
        const whetherToday = checkIsToday(selectDay)
        setIsToday(whetherToday)
        dispatch(setUserSelectDay(selectDay.toISOString()))
    }, [selectDay])

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        // 可以在这里重新获取 sessions 数据，或者直接更新 selectDay 以触发重载
        // 例如：
        await getsessions().then(res => {
            if (res && res.status !== false) {
                dispatch(setSessions(res))
            } else {
                Alert.alert("出现异常请稍后重试")
            }
        }).catch(err => Alert.alert("出现异常请稍后重试"))
        setRefreshing(false);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
            <View style={{ flex: 1, marginHorizontal: '3%' }}>
                <SelectDayHeader isToday={isToday} setSelectDay={setSelectDay} selectDay={selectDay} />
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                    showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                    <TodayTodo selectDay={selectDay} />
                    <View style={{ paddingHorizontal: 20, marginBottom: SIZE.NormalMargin }}>
                        <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: currentTheme.fontColor }}>我的</Text>
                    </View>
                    <MyExercisesCard noMargin={true} noTitle={true} />
                    <GoToLibrary />
                    <PersonalRecommend selectDay={selectDay} />
                    <NothingMore />
                </ScrollView>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', position: 'absolute', bottom: 110, right: 10, width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.primary }}>
                    {ICON.agent(30, '#fff')}
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    )
}

export default MyExercise

const GoToLibrary = () => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { navigate } = useNavigation()
    return <TouchableOpacity
        onPress={() => navigate('AllTutorials')}
        style={{ backgroundColor: currentTheme.contentColor, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, padding: '3%', borderRadius: SIZE.CardBorderRadius }}>
        <Text numberOfLines={1} style={{ color: currentTheme.fontColor, fontSize: SIZE.NormalTitle, fontWeight: 'bold', }}>Go to Tutorial Library get more</Text>
        {ICON.right(24, currentTheme.fontColor)}
    </TouchableOpacity>
}