import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../../constants/COLORS'
import SIZE from '../../../constants/SIZE'
import useUncompletedTutorials from '../../../hooks/useUncompletedTutorials'
import useCompletedTutorials from '../../../hooks/useCompletedTutorials'
const Percentage = ({ selectDay }) => {
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
        <View style={styles.container}>
            <Text style={{ color: COLORS.black, marginBottom: SIZE.NormalMargin }}>任务完成比例</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', marginBottom: SIZE.NormalMargin }}>{percentage * 100}%</Text>
                <Text>剩余({yetDoneTutorial.length}/{yetDoneTutorial.length + doneTutorial.length})</Text>
            </View>
            <View style={{ height: 10, borderRadius: 4, backgroundColor: COLORS.backgroundGray }}>
                <View style={{ height: '100%', width: `${percentage * 100}%`, borderRadius: 4, backgroundColor: lineBackcolor }} />
            </View>
        </View>
    )
}

export default Percentage

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        padding: SIZE.NormalMargin,
        borderRadius: SIZE.CardBorderRadius,
        marginBottom: SIZE.NormalMargin,
    }
})