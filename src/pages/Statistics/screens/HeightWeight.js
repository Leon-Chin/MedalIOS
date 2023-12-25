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
import { useIntl } from 'react-intl'

const { width } = Dimensions.get("screen")

const HeightWeight = () => {
    const { formatMessage } = useIntl()
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
        <Text style={{ marginHorizontal: '3%', marginTop: SIZE.LargerMargin, fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.commentText }}>{formatMessage({ id: 'app.statistic.intro' })}</Text>
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
                    {formatMessage({ id: 'app.statistic.intro.contentPt1' })}
                </Text>
                <Text style={{ color: currentTheme.fontColor }}>
                    {formatMessage({ id: 'app.statistic.intro.contentPt2' })}
                </Text>
                <Text style={{ color: currentTheme.fontColor }}>
                    {formatMessage({ id: 'app.statistic.intro.contentPt3' })}
                </Text>
                <Text style={{ color: currentTheme.fontColor }}>
                    {formatMessage({ id: 'app.statistic.intro.contentPt4' })}
                </Text>
                <Text style={{ color: currentTheme.fontColor }}>
                    {formatMessage({ id: 'app.statistic.intro.contentPt5' })}
                </Text>
                <Text style={{ color: currentTheme.fontColor }}>
                    {formatMessage({ id: 'app.statistic.intro.contentPt6' })}
                </Text>
            </View>
        </View>
    </View>
}
export default HeightWeight