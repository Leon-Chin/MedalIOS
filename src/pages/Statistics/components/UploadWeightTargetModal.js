import { Alert, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import COLORS from '../../../constants/COLORS'
import SIZE from '../../../constants/SIZE'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { calculateBMI } from '../../../utils/BMICalculate'
import { updateweighttarget } from '../../../api/user.api'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../../redux/userSlice'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { ERROR_Alert, INFO_Alert } from '../../../constants/ERRORMessage'
import { useIntl } from 'react-intl'

const { width } = Dimensions.get("screen")

const UploadWeightTargetModal = ({ visible, setVisible }) => {
    const { formatMessage } = useIntl()
    const [weightTarget, setWeightTarget] = useState();
    const dispatch = useDispatch()
    const handleUploadWeightTarget = async () => {
        if (weightTarget) {
            const data = {
                weightTarget: parseFloat(weightTarget),
            }
            await updateweighttarget(data).then(res => {
                if (res && res.status !== false) {
                    dispatch(loginSuccess(res))
                } else {
                    Toast.show(ERROR_Alert(formatMessage({ id: 'error.errorMsg' })))
                }
            })
        } else {
            Toast.show(INFO_Alert(formatMessage({ id: "error.plsInputValidInfo" })))
        }
    }

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
                    <Text style={{ color: COLORS.commentText }}>{formatMessage({ id: 'app.statistic.recordBodyMetric' })}</Text>
                </View>
                <View style={{ marginHorizontal: '3%' }}>
                    <View style={styles.inputItem}>
                        <Text style={styles.inputItemFont}>{formatMessage({ id: 'app.statistic.goalWgt' })}</Text>
                        <TextInput
                            autoFocus
                            keyboardType='decimal-pad'
                            onChangeText={setWeightTarget}
                            style={styles.inputBox}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        handleUploadWeightTarget()
                    }}
                    style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: width * 0.4, alignItems: 'center', backgroundColor: COLORS.primary, paddingVertical: SIZE.NormalMargin, paddingHorizontal: SIZE.LargerMargin, borderRadius: SIZE.CardBorderRadiusForBtn, }}>
                        <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', color: COLORS.white }}>{formatMessage({ id: 'app.statistic.saveRecord' })}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handlePresentModalClose}
                    style={{ height: 50, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ fontSize: 18, color: COLORS.commentText }}>{formatMessage({ id: 'app.statistic.cancel' })}</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetModal>
    )
}

export default UploadWeightTargetModal

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