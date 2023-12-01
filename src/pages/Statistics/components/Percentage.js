import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../../constants/COLORS'
import SIZE from '../../../constants/SIZE'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
const Percentage = ({ current, target }) => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const [percentage, setPercentage] = useState()
    const [lineBackcolor, setLineBackcolor] = useState(COLORS.gray)
    useEffect(() => {
        if (!target) {
            setPercentage(0)
        } else {
            const percen = current / target
            if (percen >= 1) {
                setPercentage(1)
            } else {
                setPercentage(percen.toPrecision(2))
            }
            if (percen > 0.6) {
                setLineBackcolor(COLORS.green)
            }
        }
    }, [current, target])
    return (
        <View style={styles.container}>
            <View style={{ height: 10, borderRadius: 4, backgroundColor: currentTheme.backgroundColor }}>
                <View style={{ height: '100%', width: `${percentage * 100}%`, borderRadius: 4, backgroundColor: lineBackcolor }} />
            </View>
        </View>
    )
}

export default Percentage

const styles = StyleSheet.create({
    container: {
        paddingVertical: SIZE.NormalMargin,
        borderRadius: SIZE.CardBorderRadius,
    }
})