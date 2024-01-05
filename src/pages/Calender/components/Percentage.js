import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../../constants/COLORS'
import SIZE from '../../../constants/SIZE'
import useUncompletedTutorials from '../../../hooks/useUncompletedTutorials'
import useCompletedTutorials from '../../../hooks/useCompletedTutorials'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import { useIntl } from 'react-intl'

const Percentage = ({ selectDay }) => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const yetDoneTutorial = useUncompletedTutorials(selectDay)
    const doneTutorial = useCompletedTutorials(selectDay)
    const [percentage, setPercentage] = useState()
    const [lineBackcolor, setLineBackcolor] = useState(COLORS.gray)
    useEffect(() => {
        const percen = doneTutorial.length / (yetDoneTutorial.length + doneTutorial.length)
        setPercentage(percen.toPrecision(2))
        if (percen > 0.6) {
            setLineBackcolor(COLORS.green)
        }
    }, [yetDoneTutorial, doneTutorial])
    return (
        <View style={{
            backgroundColor: currentTheme.contentColor,
            padding: SIZE.NormalMargin,
            borderRadius: SIZE.CardBorderRadius,
            marginBottom: SIZE.NormalMargin,
        }}>
            <Text style={{ color: currentTheme.fontColor, marginBottom: SIZE.NormalMargin, }}>{formatMessage({ id: 'app.calendar.tutCompletionPercentage' })}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', marginBottom: SIZE.NormalMargin, color: currentTheme.fontColor }}>{percentage * 100}%</Text>
                <Text style={{ color: currentTheme.fontColor }}>{formatMessage({ id: 'app.calendar.remainingTut' })}({yetDoneTutorial.length}/{yetDoneTutorial.length + doneTutorial.length})</Text>
            </View>
            <View style={{ height: 10, borderRadius: 4, backgroundColor: currentTheme.backgroundColor }}>
                <View style={{ height: '100%', width: `${percentage * 100}%`, borderRadius: 4, backgroundColor: lineBackcolor }} />
            </View>
        </View>
    )
}

export default Percentage
