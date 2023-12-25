import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../../constants/COLORS'
import SIZE from '../../../constants/SIZE'
import Percentage from './Percentage'
import { ICON } from '../../../constants/SVG/ICON'
import useTodayExerciseDuration from '../../../hooks/useTodayExerciseDuration'
import { secToMin, secToSpecificMin } from '../../../utils/funcs'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import { useIntl } from 'react-intl'

const DurationCard = () => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const duration = useTodayExerciseDuration()
    const { currentUser } = useSelector(state => state.user)
    const [prevGoal, setPrevGoal] = useState()

    useEffect(() => {
        currentUser?.durationTarget && setPrevGoal(currentUser.durationTarget)
    }, [currentUser])
    const { navigate } = useNavigation()
    return (
        <View style={{ marginHorizontal: '3%', marginBottom: 10, backgroundColor: currentTheme.contentColor, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ marginBottom: SIZE.NormalMargin, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    {/* icon */}
                    <View style={{ width: 26, height: 26, backgroundColor: COLORS.purple, borderRadius: 9, justifyContent: 'center', alignItems: 'center' }}>
                        {ICON.lightning(18, COLORS.white)}
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.purple }}>{formatMessage({ id: 'app.statistic.duration' })}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigate("DurationSreen")
                    }}
                >
                    {ICON.right(24, COLORS.gray)}
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={{ fontSize: SIZE.ExtraLargerTitle, fontWeight: 'bold', color: currentTheme.fontColor }}>{secToMin(duration)}</Text>
                    <Text style={{ fontWeight: 'bold', color: currentTheme.fontColor }}>{formatMessage({ id: 'app.statistic.durationUnit' })} </Text>
                </View>
                <Text style={{ color: COLORS.commentText, fontWeight: 'bold' }}>/ {prevGoal ? secToSpecificMin(prevGoal) : "--"}{formatMessage({ id: 'app.statistic.durationUnit' })}</Text>
            </View>
            <Percentage current={duration} target={prevGoal} />
        </View>
    )
}

export default DurationCard

const styles = StyleSheet.create({})