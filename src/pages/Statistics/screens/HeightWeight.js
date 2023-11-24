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
const { width } = Dimensions.get("screen")

const HeightWeight = () => {
    const [latestMeasurement, setLatestMeasurement] = useState({})
    const getLatestMeasurement = async () => {
        await getlatestmeasurement().then(res => {
            if (res.status !== false) {
                setLatestMeasurement(res)
            } else {
                Alert.alert("出现异常请稍后重试")
            }
        })
    }
    const [allMeasurements, setAllMeasurement] = useState([])
    const getAllMeasurements = async () => {
        await getmeasurements().then(res => {
            if (res.status !== false) {
                setAllMeasurement(res)
            } else {
                Alert.alert("出现异常请稍后重试")
            }
        })
    }
    const getData = () => {
        getAllMeasurements()
        getLatestMeasurement()
    }
    useEffect(() => {
        getData()
    }, [])

    const [UploadMeasurementModalVisible, setUploadMeasurementModalVisible] = useState(false)
    const [UploadWeightTargetModalVisible, setUploadWeightModalVisible] = useState(false)

    return (
        <BottomSheetModalProvider>
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <StatisticHeader latestMeasurement={latestMeasurement} />
                    <SpecificStatisticDetail setUploadWeightModalVisible={setUploadWeightModalVisible} latestMeasurement={latestMeasurement} />
                    <StatisticChart getData={getData} allMeasurements={allMeasurements} />
                    {/* 体重介绍 */}
                    <View>
                        <Text style={{ marginHorizontal: '3%', marginTop: SIZE.LargerMargin, fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.commentText }}>体重介绍</Text>
                        <View style={styles.cardContainer}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: COLORS.black }}>
                                    BMI（Body Mass Index，身体质量指数）是通过体重（千克）除以身高（米）的平方来计算的。
                                </Text>
                                <Text style={{ color: COLORS.black }}>
                                    根据世界卫生组织（WHO）的标准，BMI可以分为几个不同的等级，用以评估个体的体重状况：
                                </Text>
                                <Text style={{ color: COLORS.black }}>
                                    低于18.5：体重过轻
                                </Text>
                                <Text style={{ color: COLORS.black }}>
                                    18.5至24.9：正常范围
                                </Text>
                                <Text style={{ color: COLORS.black }}>
                                    25至29.9：超重
                                </Text>
                                <Text style={{ color: COLORS.black }}>
                                    30及以上：肥胖
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 100 }}></View>
                </ScrollView>
                <AddStatisticBtn handlePresentModalPress={() => setUploadMeasurementModalVisible(true)} />
            </View >
            <UploadMeasurementModal latestMeasurement={latestMeasurement} getLatestMeasurement={getLatestMeasurement} setVisible={setUploadMeasurementModalVisible} visible={UploadMeasurementModalVisible} />
            <UploadWeightTargetModal visible={UploadWeightTargetModalVisible} setVisible={setUploadWeightModalVisible} />
        </BottomSheetModalProvider>

    )
}

export default HeightWeight

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
    inputItem: {
        flexDirection: 'row',
        marginBottom: SIZE.NormalMargin,
        justifyContent: "space-between",
        alignItems: 'center'
    },
    inputItemFont: {
        fontSize: SIZE.NormalTitle,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    inputBox: {
        backgroundColor: COLORS.backgroundGray,
        padding: SIZE.NormalMargin,
        width: width * 0.5,
        borderRadius: SIZE.CardBorderRadius,
        fontSize: SIZE.NormalTitle,
    },
    showBox: {
        padding: SIZE.NormalMargin,
        width: width * 0.5,
    }
})