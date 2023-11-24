import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SIZE from '../../../constants/SIZE'
import COLORS from '../../../constants/COLORS'
import { ICON } from '../../../constants/SVG/ICON'
import { useSelector } from 'react-redux'
import { BMISort } from '../../../utils/BMICalculate'

const SpecificStatisticDetail = ({ setUploadWeightModalVisible, latestMeasurement }) => {
    const { currentUser } = useSelector(state => state.user)
    const { weightTarget } = currentUser
    return (
        <View style={styles.cardContainer}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: SIZE.SmallTitle, marginBottom: SIZE.NormalMargin, color: COLORS.commentText }}>当前/目标体重</Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={{ fontSize: SIZE.ExtraLargerTitle, color: COLORS.black, fontWeight: 'bold' }}>{latestMeasurement?.weight ? latestMeasurement.weight : "--"}</Text>
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
                <Text style={{ fontSize: SIZE.SmallTitle, marginBottom: SIZE.NormalMargin, color: COLORS.commentText }}>BMI水平</Text>
                {!latestMeasurement?.BMI ? <Text style={{ fontSize: SIZE.ExtraLargerTitle, color: COLORS.black, fontWeight: 'bold' }}>--</Text> :
                    <Text style={{ fontSize: SIZE.ExtraLargerTitle, color: COLORS.black, fontWeight: 'bold' }}>{BMISort(latestMeasurement.BMI)}</Text>}
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