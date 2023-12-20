import { Alert, Dimensions, FlatList, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import COLORS from '../../../constants/COLORS'
import SIZE from '../../../constants/SIZE'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { getlatestmeasurement, getmeasurements } from '../../../api/measurement'
import StatisticHeader from '../components/StatisticHeader'
import SpecificStatisticDetail from '../components/SpecificStatisticDetail'
import StatisticChart from '../components/StatisticChart'
import AddStatisticBtn from '../components/AddStatisticBtn'
import UploadMeasurementModal from '../components/UploadMeasurementModal'
import UploadWeightTargetModal from '../components/UploadWeightTargetModal'
import useMeasurement from '../../../hooks/useMeasurement'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
const { width } = Dimensions.get("screen")

const HeightWeight = () => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { latestMeasurement, allMeasurements } = useMeasurement()
    const [UploadMeasurementModalVisible, setUploadMeasurementModalVisible] = useState(false)
    const [UploadWeightTargetModalVisible, setUploadWeightModalVisible] = useState(false)

    return (
        <BottomSheetModalProvider>
            <View style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
                <ScrollView style={{ flex: 1 }}>
                    <StatisticHeader latestMeasurement={latestMeasurement} />
                    <SpecificStatisticDetail setUploadWeightModalVisible={setUploadWeightModalVisible} latestMeasurement={latestMeasurement} />
                    <StatisticChart allMeasurements={allMeasurements} />
                    {/* 体重介绍 */}
                    <WeightIntro />
                    <View style={{ height: 100 }}></View>
                </ScrollView>
                <AddStatisticBtn handlePresentModalPress={() => setUploadMeasurementModalVisible(true)} />
            </View >
            <UploadMeasurementModal setVisible={setUploadMeasurementModalVisible} visible={UploadMeasurementModalVisible} />
            <UploadWeightTargetModal visible={UploadWeightTargetModalVisible} setVisible={setUploadWeightModalVisible} />
        </BottomSheetModalProvider>

    )
}
const WeightIntro = () => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return <View>
        <Text style={{ marginHorizontal: '3%', marginTop: SIZE.LargerMargin, fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.commentText }}>体重介绍</Text>
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
                <Text style={{ color: currentTheme.fontColor }}>
                    BMI（Body Mass Index，身体质量指数）是通过体重（千克）除以身高（米）的平方来计算的。
                </Text>
                <Text style={{ color: currentTheme.fontColor }}>
                    根据世界卫生组织（WHO）的标准，BMI可以分为几个不同的等级，用以评估个体的体重状况：
                </Text>
                <Text style={{ color: currentTheme.fontColor }}>
                    低于18.5：体重过轻
                </Text>
                <Text style={{ color: currentTheme.fontColor }}>
                    18.5至24.9：正常范围
                </Text>
                <Text style={{ color: currentTheme.fontColor }}>
                    25至29.9：超重
                </Text>
                <Text style={{ color: currentTheme.fontColor }}>
                    30及以上：肥胖
                </Text>
            </View>
        </View>
    </View>
}
export default HeightWeight