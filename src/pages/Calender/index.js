import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
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
<<<<<<< Updated upstream
=======
import { getsessions } from '../../api/session.api'
import { setSessions } from '../../redux/SessionSlice'
import MyExercisesCard from '../Profile/components/MyExercisesCard'
import SIZE from '../../constants/SIZE'
import NothingMore from '../../components/NothingMore'
import { useNavigation } from '@react-navigation/native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { ERROR_MESSAGE } from '../../constants/ERRORMessage'
import { useIntl } from 'react-intl'
>>>>>>> Stashed changes

const MyExercise = () => {
    const { formatMessage } = useIntl()
    const dispatch = useDispatch()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const [selectDay, setSelectDay] = useState(new Date())
    const [isToday, setIsToday] = useState(true)
    useEffect(() => {
        const whetherToday = checkIsToday(selectDay)
        setIsToday(whetherToday)
        dispatch(setUserSelectDay(selectDay.toISOString()))
    }, [selectDay])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
            <View style={{ flex: 1, marginHorizontal: '3%' }}>
                <SelectDayHeader isToday={isToday} setSelectDay={setSelectDay} selectDay={selectDay} />
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                    <TodayTodo selectDay={selectDay} />
<<<<<<< Updated upstream
=======
                    <View style={{ paddingHorizontal: 20, marginBottom: SIZE.NormalMargin }}>
                        <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: currentTheme.fontColor }}>{formatMessage({ id: 'app.calendar.meine' })}</Text>
                    </View>
                    <MyExercisesCard noMargin={true} noTitle={true} />
                    <GoToLibrary />
>>>>>>> Stashed changes
                    <PersonalRecommend selectDay={selectDay} />
                </ScrollView>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', position: 'absolute', bottom: 110, right: 10, width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.primary }}>
                    {ICON.agent(30, '#fff')}
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    )
}

export default MyExercise

<<<<<<< Updated upstream
const styles = StyleSheet.create({})
=======
const GoToLibrary = () => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { navigate } = useNavigation()
    return <TouchableOpacity
        onPress={() => navigate('AllTutorials')}
        style={{ backgroundColor: currentTheme.contentColor, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, padding: '3%', borderRadius: SIZE.CardBorderRadius }}>
        <Text numberOfLines={1} style={{ color: currentTheme.fontColor, fontSize: SIZE.NormalTitle, fontWeight: 'bold', }}>{formatMessage({ id: 'app.calendar.tutLibPortal' })}</Text>
        {ICON.right(24, currentTheme.fontColor)}
    </TouchableOpacity>
}
>>>>>>> Stashed changes
