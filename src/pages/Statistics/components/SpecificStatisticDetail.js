import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SIZE from '../../../constants/SIZE'
import COLORS from '../../../constants/COLORS'
import { ICON } from '../../../constants/SVG/ICON'
import { useSelector } from 'react-redux'
import { BMISort } from '../../../utils/BMICalculate'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import { useIntl } from 'react-intl'

const SpecificStatisticDetail = ({ setUploadWeightModalVisible, latestMeasurement }) => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { currentUser } = useSelector(state => state.user)
    const { weightTarget } = currentUser
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginHorizontal: '3%',
            marginTop: SIZE.NormalMargin,
            padding: SIZE.NormalMargin,
            borderRadius: SIZE.CardBorderRadius,
            backgroundColor: currentTheme.contentColor
        }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: SIZE.SmallTitle, marginBottom: SIZE.NormalMargin, color: COLORS.commentText }}>{formatMessage({ id: 'app.statistic.currentGoalWt' })}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={{ fontSize: SIZE.ExtraLargerTitle, color: currentTheme.fontColor, fontWeight: 'bold' }}>{latestMeasurement?.weight ? latestMeasurement.weight : "--"}</Text>
                    <TouchableOpacity
                        onPress={() => setUploadWeightModalVisible(true)}
                        style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={{ fontSize: SIZE.SmallTitle, color: COLORS.commentText, fontWeight: 'bold' }}>/</Text>
                        {!weightTarget ? <Text style={{ fontSize: SIZE.SmallTitle, color: COLORS.commentText, fontWeight: 'bold' }}>--</Text> :
                            <Text style={{ fontSize: SIZE.SmallTitle, color: COLORS.commentText, fontWeight: 'bold' }}>{weightTarget}</Text>}
                        {ICON.target(16, COLORS.commentText)}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: SIZE.NormalMargin }}></View>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: SIZE.SmallTitle, marginBottom: SIZE.NormalMargin, color: COLORS.commentText }}>{formatMessage({ id: 'app.statistic.bmiLvl' })}</Text>
                {!latestMeasurement?.BMI ? <Text style={{ fontSize: SIZE.ExtraLargerTitle, color: currentTheme.fontColor, fontWeight: 'bold' }}>--</Text> :
                    <Text style={{ fontSize: SIZE.ExtraLargerTitle, color: currentTheme.fontColor, fontWeight: 'bold' }}>{BMISort(latestMeasurement.BMI)}</Text>}
            </View>
        </View>
    )
}

export default SpecificStatisticDetail

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: '3%',
        marginTop: SIZE.NormalMargin,
        padding: SIZE.NormalMargin,
        borderRadius: SIZE.CardBorderRadius,
        backgroundColor: COLORS.white
    },
})