import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../../constants/COLORS'
import { exerciseLogo } from '../../../constants/SVG/AllExercises'
import SIZE from '../../../constants/SIZE'
import Percentage from './Percentage'
import useHealthKit from '../../../hooks/useHealthkit'
import { useNavigation } from '@react-navigation/native'
import { ICON } from '../../../constants/SVG/ICON'
import { useSelector } from 'react-redux'

const StepCard = () => {
    const { navigate } = useNavigation()
    const { currentUser } = useSelector(state => state.user)
    const { steps } = useHealthKit()
    const [prevStepGoal, setPrevStepGoal] = useState()

    useEffect(() => {
        currentUser?.stepTarget && setPrevStepGoal(currentUser.stepTarget)
    }, [currentUser])

    return (
        <View style={{ marginHorizontal: '3%', marginBottom: 10, backgroundColor: '#fff', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ marginBottom: SIZE.NormalMargin, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    {/* icon */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: 26, height: 26, backgroundColor: COLORS.primary, borderRadius: 9 }}>
                        {exerciseLogo.walk(18)}
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.primary }}>步数</Text>
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
                    <Text style={{ fontSize: SIZE.ExtraLargerTitle, fontWeight: 'bold' }}>{steps}</Text>
                    <Text style={{ fontWeight: 'bold' }}>步 </Text>
                </View>
                <Text style={{ color: COLORS.commentText, fontWeight: 'bold' }}>/ {prevStepGoal ? prevStepGoal : "--"}步</Text>
            </View>
            <Percentage current={steps} target={prevStepGoal} />
        </View>
    )
}

export default StepCard

const styles = StyleSheet.create({})