import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SIZE from '../../../constants/SIZE'
import { ICON } from '../../../constants/SVG/ICON'
import { DateToMonthDay } from '../../../utils/formatTime'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import { useIntl } from 'react-intl'
import useUserLocale from '../../../hooks/useUserLocale'
import DateTimePicker from '@react-native-community/datetimepicker';

const SelectDayHeader = ({ isToday, setSelectDay, selectDay }) => {
    const { formatMessage } = useIntl()
    const userLocale = useUserLocale()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const goToPreviousDay = () => {
        setSelectDay(prevDay => new Date(prevDay.setDate(prevDay.getDate() - 1)));
    };

    const goToNextDay = () => {
        setSelectDay(nextDay => new Date(nextDay.setDate(nextDay.getDate() + 1)));
    };

    const [showCalendar, setShowCalendar] = useState(false)
    const handleChangeDay = (e, selectedDate) => {
        setSelectDay(new Date(selectedDate))
    }
    return (
        <View style={{ marginBottom: SIZE.LargerMargin, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: SIZE.NormalMargin }}>
                <TouchableOpacity
                    onPress={goToPreviousDay}
                >
                    {ICON.left(24, currentTheme.fontColor)}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setShowCalendar(!showCalendar)
                    }}
                >
                    <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', color: currentTheme.fontColor }}>{DateToMonthDay(selectDay, userLocale)}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={goToNextDay}
                >
                    {ICON.right(24, currentTheme.fontColor)}
                </TouchableOpacity>
            </View>
            {showCalendar &&
                <TouchableOpacity
                    onPress={() => setSelectDay(new Date())}
                    style={{ alignItems: 'center', marginBottom: SIZE.NormalMargin, backgroundColor: currentTheme.contentColor, borderRadius: SIZE.CardBorderRadius, flexDirection: 'row', justifyContent: 'center', padding: SIZE.NormalMargin, }}>
                    <Text style={{ color: currentTheme.fontColor, fontSize: SIZE.NormalTitle, fontWeight: 'bold' }}>Select Day: </Text>
                    <DateTimePicker
                        themeVariant={theme}
                        testID="dateTimePicker"
                        value={selectDay}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        locale={userLocale === "zh" && 'zh_CN'}
                        onChange={handleChangeDay}
                    />
                </TouchableOpacity>
            }
            {!isToday &&
                <TouchableOpacity
                    onPress={() => setSelectDay(new Date())}
                    style={{ backgroundColor: currentTheme.contentColor, borderRadius: SIZE.CardBorderRadius, flexDirection: 'row', justifyContent: 'center', padding: SIZE.NormalMargin, }}>
                    <Text style={{ color: currentTheme.fontColor }}>{formatMessage({ id: 'app.calendar.backToday' })}</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default SelectDayHeader

const styles = StyleSheet.create({})