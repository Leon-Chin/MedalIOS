import { Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import OptionsInModal from './OptionsInModal'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import SIZE from '../../../constants/SIZE';
import COLORS from '../../../constants/COLORS';
import { ICON } from '../../../constants/SVG/ICON';
import { useNavigation } from '@react-navigation/native';
import { participateTutorial } from '../../../api/user.api';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/userSlice';
import PIC from '../../../constants/PIC';
import EXERCISETYPE from '../../../constants/EXERCISETYPE';

const BeforeStartExerciseModal = ({ visible, setVisible, tutorial, setTutorial }) => {
    const { navigate } = useNavigation()
    const dispatch = useDispatch()
    const bottomSheetModalRef = useRef(null);
    // variables
    const snapPoints = useMemo(() => ['35%', '50%', '75%'], []);
    useEffect(() => {
        visible && handleModelOpen()
    }, [visible])
    // callbacks
    const handleModelOpen = useCallback(() => bottomSheetModalRef.current?.present(), []);
    const handleModelClose = () => {
        setVisible(false)
        bottomSheetModalRef.current?.dismiss()
    }
    const navigateToWarm = () => {
        handleModelClose()
        navigate("AllTutorials", {
            selectType: {
                name: 'Stretch',
                value: EXERCISETYPE.warmup.value,
            }
        })
    }
    const handleStartExercise = async () => {
        await participateTutorial(tutorial._id).then(res => {
            if (res.status !== false) {
                handleModelClose()
                dispatch(loginSuccess(res.user))
                setTutorial(res.updatedTutorial)
                navigate("TutorialVideo", { tutorial })
            } else {
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
                <View style={{}}>
                    <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.black }}>今日热身了么？做下热身活动吧！</Text>
                    <TouchableOpacity
                        onPress={navigateToWarm}
                        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SIZE.NormalMargin, backgroundColor: COLORS.backgroundGray, marginTop: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius }}>
                        <View style={{ flexDirection: 'row', alignItems: "center", gap: SIZE.NormalMargin }}>
                            <ImageBackground
                                source={{ uri: PIC.warmup }}
                                style={{
                                    borderRadius: SIZE.CardBorderRadius, overflow: 'hidden',
                                    height: 50,
                                    width: 50,
                                }}>
                            </ImageBackground>
                            <View>
                                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.black }}>
                                    Warm Up
                                </Text>
                            </View>
                        </View>
                        {ICON.right(24, COLORS.black)}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={handleStartExercise}
                    style={{ padding: SIZE.NormalMargin, flexDirection: 'row', justifyContent: 'center', marginTop: SIZE.NormalMargin }}
                >
                    <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', fontStyle: 'italic' }}>直接开练</Text>
                </TouchableOpacity>
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

export default BeforeStartExerciseModal

const styles = StyleSheet.create({})