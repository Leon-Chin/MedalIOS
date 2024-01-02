import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../../constants/COLORS'
import SIZE from '../../../constants/SIZE'
import useUncompletedTutorials from '../../../hooks/useUncompletedTutorials'
import useCompletedTutorials from '../../../hooks/useCompletedTutorials'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import { ICON } from '../../../constants/SVG/ICON'
import { useIntl } from 'react-intl'

const TodoNotiPercentage = ({ selectDay }) => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const yetDoneTutorial = useUncompletedTutorials(selectDay)
    const doneTutorial = useCompletedTutorials(selectDay)
    const [percentage, setPercentage] = useState()
    const [lineBackcolor, setLineBackcolor] = useState(COLORS.white)
    useEffect(() => {
        const percen = doneTutorial.length / (yetDoneTutorial.length + doneTutorial.length)
        setPercentage(percen.toPrecision(2))
        if (percen > 0.6) {
            setLineBackcolor(COLORS.green)
        }
    }, [yetDoneTutorial, doneTutorial])
    return (
        <View style={{
            borderRadius: SIZE.CardBorderRadius,
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', marginBottom: SIZE.NormalMargin, color: COLORS.white }}>{percentage * 100}%</Text>

                {(yetDoneTutorial.length === 0 && doneTutorial.length !== 0) ? ICON.doneCircle(24, COLORS.green) :
                    <Text style={{ color: COLORS.white }}>{formatMessage({ id: 'app.news.remaining' })}({yetDoneTutorial.length}/{yetDoneTutorial.length + doneTutorial.length})</Text>
                }
            </View>
            <View style={{ height: 10, borderRadius: 4, backgroundColor: COLORS.black }}>
                <View style={{ height: '100%', width: `${percentage * 100}%`, borderRadius: 4, backgroundColor: lineBackcolor }} />
            </View>
        </View>
    )
}

export default TodoNotiPercentage
