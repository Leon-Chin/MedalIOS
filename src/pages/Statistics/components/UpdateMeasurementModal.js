import { Alert, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import COLORS from '../../../constants/COLORS'
import SIZE from '../../../constants/SIZE'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { calculateBMI } from '../../../utils/BMICalculate'
import { updatemeasurement, uploadmeasurement } from '../../../api/measurement'
import { useDispatch } from 'react-redux'
import { setLatestMeasurement, setMeasurements } from '../../../redux/MeasurementSlice'
import { loginSuccess } from '../../../redux/userSlice'
import { isEmptyObj } from '../../../utils/getDuration'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { ERROR_MESSAGE, PleaseInput_MESSAGE } from '../../../constants/ERRORMessage'
const { width } = Dimensions.get("screen")

const UpdateMeasurementModal = ({ visible, setVisible, measurement }) => {
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [fatRate, setFatRate] = useState();
    const [BMI, setBMI] = useState();

    const dispatch = useDispatch()
    useEffect(() => {
        if (!isEmptyObj(measurement)) {
            measurement?.height && setHeight(measurement.height)
            measurement?.weight && setWeight(measurement.weight)
            measurement?.bodyFatRate && setFatRate(measurement.bodyFatRate)
            measurement?.BMI && setBMI(measurement.BMI)
        }
        if (isEmptyObj(measurement)) {
            setHeight()
            setWeight()
            setFatRate()
            setBMI()
        }
    }, [measurement])
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
            await updatemeasurement(measurement._id, data).then(res => {
                if (res.status !== false) {
                    dispatch(setMeasurements(res))
                    handlePresentModalClose()
                } else {
                    Toast.show(ERROR_MESSAGE)
                }
            })
        } else {
            Toast.show(PleaseInput_MESSAGE)
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

export default UpdateMeasurementModal

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