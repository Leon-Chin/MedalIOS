import { Alert, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import COLORS from '../../../constants/COLORS'
import SIZE from '../../../constants/SIZE'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { calculateBMI } from '../../../utils/BMICalculate'
import { uploadmeasurement } from '../../../api/measurement'
import { useDispatch } from 'react-redux'
import { setLatestMeasurement, setMeasurements } from '../../../redux/MeasurementSlice'
import { loginSuccess } from '../../../redux/userSlice'
import useMeasurement from '../../../hooks/useMeasurement'
import { isEmptyObj } from '../../../utils/getDuration'
const { width } = Dimensions.get("screen")

const UploadMeasurementModal = ({ visible, setVisible }) => {
    const { latestMeasurement } = useMeasurement()
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [fatRate, setFatRate] = useState();
    const [BMI, setBMI] = useState();

    const dispatch = useDispatch()
    useEffect(() => {
        if (!isEmptyObj(latestMeasurement)) {
            latestMeasurement?.height && setHeight(latestMeasurement.height)
            latestMeasurement?.weight && setWeight(latestMeasurement.weight)
            latestMeasurement?.bodyFatRate && setFatRate(latestMeasurement.bodyFatRate)
            latestMeasurement?.BMI && setBMI(latestMeasurement.BMI)
        }
        if (isEmptyObj(latestMeasurement)) {
            setHeight()
            setWeight()
            setFatRate()
            setBMI()
        }
    }, [latestMeasurement])
    const handleInputWeight = (value) => {
        setWeight(value)
    }
    const handleInputHeight = (value) => {
        setHeight(value)
    }
    const handleInputFatRate = (value) => {
        setFatRate(value)
    }
    const handleSaveMeasurement = async () => {
        if (weight && height) {
            const data = fatRate ? {
                date: new Date(),
                weight: parseFloat(weight),
                height: parseFloat(height),
                BMI,
                bodyFatRate: parseFloat(fatRate)
            } : {
                date: new Date(),
                weight: parseFloat(weight),
                height: parseFloat(height),
                BMI,
            }
            await uploadmeasurement(data).then(res => {
                if (res.status !== false) {
                    dispatch(setLatestMeasurement(res.measurement))
                    dispatch(setMeasurements(res.updatedMeasurements))
                    dispatch(loginSuccess(res.user))
                    handlePresentModalClose()
                } else {
                    Alert.alert("出现异常请稍后重试")
                }
            })
        } else {
            Alert.alert("请输入完成信息")
        }
    }
    useEffect(() => {
        if (height && weight) {
            const BMI = calculateBMI(weight, height)
            setBMI(BMI)
        }
    }, [height, weight])

    const bottomSheetModalRef = useRef(null);
    // variables
    const snapPoints = useMemo(() => ['96%'], []);
    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    useEffect(() => {
        visible && handlePresentModalPress()
    }, [visible])
    const handlePresentModalClose = useCallback(() => {
        setVisible(false)
        bottomSheetModalRef.current?.dismiss()
    }, []);
    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            enablePanDownToClose
            snapPoints={snapPoints}
        >
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', marginBottom: SIZE.LargerMargin, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: COLORS.commentText }}>记录身体数据</Text>
                </View>
                <View style={{ marginHorizontal: '3%' }}>
                    <View style={styles.inputItem}>
                        <Text style={styles.inputItemFont}>体重(kg)</Text>
                        <TextInput
                            defaultValue={weight ? weight + "" : ""}
                            autoFocus
                            keyboardType='decimal-pad'
                            onChangeText={handleInputWeight}
                            style={styles.inputBox}
                        />
                    </View>
                    <View style={styles.inputItem}>
                        <Text style={styles.inputItemFont}>身高(cm)</Text>
                        <TextInput
                            defaultValue={height ? height + "" : ""}
                            onChangeText={handleInputHeight}
                            keyboardType='decimal-pad'
                            style={styles.inputBox}
                        />
                    </View>
                    <View style={styles.inputItem}>
                        <Text style={styles.inputItemFont}>体脂率(%)</Text>
                        <TextInput
                            defaultValue={fatRate ? fatRate + "" : ""}
                            onChangeText={handleInputFatRate}
                            keyboardType='decimal-pad'
                            style={styles.inputBox}
                        />
                    </View>
                    <View style={styles.inputItem}>
                        <Text style={styles.inputItemFont}>BMI</Text>
                        <View style={styles.showBox}>
                            {BMI && <Text style={{ fontSize: SIZE.NormalTitle }}>{BMI}</Text>}
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        handleSaveMeasurement()
                    }}
                    style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: width * 0.4, alignItems: 'center', backgroundColor: COLORS.primary, paddingVertical: SIZE.NormalMargin, paddingHorizontal: SIZE.LargerMargin, borderRadius: SIZE.CardBorderRadiusForBtn, }}>
                        <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', color: COLORS.white }}>保存</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handlePresentModalClose}
                    style={{ height: 50, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ fontSize: 18, color: COLORS.commentText }}>取消</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetModal>
    )
}

export default UploadMeasurementModal

const styles = StyleSheet.create({
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