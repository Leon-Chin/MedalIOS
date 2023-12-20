import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import SIZE from '../../../constants/SIZE';
import COLORS from '../../../constants/COLORS';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/userSlice';
import { finishsession } from '../../../api/session.api';
import { setSessions } from '../../../redux/SessionSlice';

const FinishExerciseModal = ({ visible, setVisible, tutorial, videoDuration, watchTime, startTime, endTime }) => {
    const [shouldRecord, setShouldRecord] = useState(false)
    const { navigate, goBack } = useNavigation()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const bottomSheetModalRef = useRef(null);
    const [exerciseStartTime, setExerciseStartTime] = useState()
    const [exerciseFinishTime, setExerciseFinishTime] = useState()
    const [videoTime, setVideoTime] = useState()
    // variables
    const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);
    useEffect(() => {
        visible && handleModelOpen()
        if (watchTime >= 60) {//一分钟一下不记录
            setShouldRecord(true)
        }
        startTime && setExerciseStartTime(startTime)
        endTime && setExerciseFinishTime(endTime)
        videoDuration && setVideoTime(videoDuration)
    }, [visible, watchTime, startTime, endTime, videoDuration])
    // callbacks
    const handleModelOpen = useCallback(() => bottomSheetModalRef.current?.present(), []);
    const handleModelClose = () => {
        setVisible(false)
        bottomSheetModalRef.current?.dismiss()
    }
    const handleFinishExercise = async () => {
        const { lowerEstimateColorie, higherEstimateColorie } = tutorial
        const averageColorie = Math.round((parseInt(lowerEstimateColorie) + parseInt(higherEstimateColorie)) / 2 / videoTime * watchTime)
        const data = {
            exerciseDuration: watchTime,
            startTime: exerciseStartTime,
            endTime: exerciseFinishTime,
            calorieConsumption: averageColorie,
        }
        await finishsession(tutorial._id, data).then(res => {
            if (res.status !== false) {
                dispatch(loginSuccess(res.user))
                dispatch(setSessions(res.updatedSessions))
                navigation.dispatch(StackActions.replace("AfterExercise", { tutorial, data }))
            } else {
                console.log(res);
                Alert.alert("出现异常，请稍后重试")
            }
        })
    }

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            enablePanDownToClose={false}
            snapPoints={snapPoints}
        >
            <View style={{ marginHorizontal: '3%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: SIZE.NormalMargin }}>
                    {shouldRecord ? <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.commentText }}>
                        要结束运动么？
                    </Text> : <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.red }}>
                        训练时长太短无法记录
                    </Text>}
                </View>
                {shouldRecord ? <TouchableOpacity
                    onPress={handleFinishExercise}
                    style={{ padding: SIZE.NormalMargin, flexDirection: 'row', justifyContent: 'center', marginTop: SIZE.NormalMargin }}
                >
                    <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', fontStyle: 'italic' }}>结束训练</Text>
                </TouchableOpacity> : <TouchableOpacity
                    onPress={goBack}
                    style={{ padding: SIZE.NormalMargin, flexDirection: 'row', justifyContent: 'center', marginTop: SIZE.NormalMargin }}
                >
                    <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', fontStyle: 'italic' }}>退出训练</Text>
                </TouchableOpacity>}
                <TouchableOpacity
                    onPress={handleModelClose}
                    style={{ padding: SIZE.NormalMargin, flexDirection: 'row', justifyContent: 'center', marginTop: SIZE.NormalMargin }}
                >
                    <Text style={{ fontSize: SIZE.NormalTitle, }}>取消</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetModal>
    )
}

export default FinishExerciseModal

const styles = StyleSheet.create({})