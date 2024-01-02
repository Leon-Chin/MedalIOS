import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SIZE from '../../../constants/SIZE'
import COLORS from '../../../constants/COLORS'
import { ICON } from '../../../constants/SVG/ICON'
import { DateToMonthDay } from '../../../utils/formatTime'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import { useIntl } from 'react-intl'

const SelectDayHeader = ({ isToday, setSelectDay, selectDay }) => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const goToPreviousDay = () => {
        setSelectDay(prevDay => new Date(prevDay.setDate(prevDay.getDate() - 1)));
    };

    const goToNextDay = () => {
        setSelectDay(nextDay => new Date(nextDay.setDate(nextDay.getDate() + 1)));
    };

    return (
        <View style={{ marginBottom: SIZE.LargerMargin, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: SIZE.NormalMargin }}>
                <TouchableOpacity
                    onPress={goToPreviousDay}
                >
                    {ICON.left(24, currentTheme.fontColor)}
                </TouchableOpacity>
                <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', color: currentTheme.fontColor }}>{DateToMonthDay(selectDay)}</Text>
                <TouchableOpacity
                    onPress={goToNextDay}
                >
                    {ICON.right(24, currentTheme.fontColor)}
                </TouchableOpacity>
            </View>
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