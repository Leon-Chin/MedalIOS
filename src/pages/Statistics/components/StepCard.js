import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../../constants/COLORS'
import { exerciseLogo } from '../../../constants/SVG/ExerciseLogo'
import SIZE from '../../../constants/SIZE'
import Percentage from './Percentage'
import useHealthKit from '../../../hooks/useHealthkit'
import { useNavigation } from '@react-navigation/native'
import { ICON } from '../../../constants/SVG/ICON'
import { useSelector } from 'react-redux'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import { useIntl } from 'react-intl'

const StepCard = () => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { navigate } = useNavigation()
    const { currentUser } = useSelector(state => state.user)
    const { steps } = useHealthKit()
    const [prevStepGoal, setPrevStepGoal] = useState()

    useEffect(() => {
        currentUser?.stepTarget && setPrevStepGoal(currentUser.stepTarget)
    }, [currentUser])

    return (
        <View style={{ marginHorizontal: '3%', marginBottom: 10, backgroundColor: currentTheme.contentColor, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ marginBottom: SIZE.NormalMargin, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    {/* icon */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: 26, height: 26, backgroundColor: COLORS.primary, borderRadius: 9 }}>
                        {exerciseLogo.walk(18)}
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.primary }}>{formatMessage({ id: 'app.statistic.step' })}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigate('StepScreen')
                    }}
                >
                    {ICON.right(24, COLORS.gray)}
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={{ fontSize: SIZE.ExtraLargerTitle, fontWeight: 'bold', color: currentTheme.fontColor }}>{steps}</Text>
                    <Text style={{ fontWeight: 'bold', color: currentTheme.fontColor }}>{formatMessage({ id: 'app.statistic.stepUnit' })} </Text>
                </View>
                <Text style={{ color: COLORS.commentText, fontWeight: 'bold' }}>/ {prevStepGoal ? prevStepGoal : "--"}{formatMessage({ id: 'app.statistic.stepUnit' })}</Text>
            </View>
            <Percentage current={steps} target={prevStepGoal} />
        </View>
    )
}

export default StepCard

const styles = StyleSheet.create({})