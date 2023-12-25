import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../constants/COLORS'
import { Pedometer } from 'expo-sensors';
import MusicPlayer from '../../../components/MusicPlayer';
import { ICON } from '../../../constants/SVG/ICON';
import ElapsedTimeDisplay from './ElapsedTimeDisplay';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { getElapsedMinute } from '../../../utils/getDuration';
<<<<<<< Updated upstream

const Walk = () => {
=======
import { finishsessionoutside } from '../../../api/session.api';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/userSlice';
import { setSessions } from '../../../redux/SessionSlice';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { CanNotFinish_MESSAGE } from '../../../constants/ERRORMessage';
import { useIntl } from 'react-intl';

const Walk = () => {
    const { formatMessage } = useIntl()
    const [startTime, setStartTime] = useState()
>>>>>>> Stashed changes
    const [focused, setFocused] = useState(true)
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({ gestureEnabled: false })
    }, [navigation]);

    const starter = new Date()
    starter.setHours(18, 0, 0, 0)
    const [pedemeterAvailable, setPedometerAvailable] = useState(false);
    const [currentStepCount, setCurrentStepCount] = useState(0);
    const [startTime, setStartTime] = useState(new Date());
    const [elapsedTime, setElapsedTime] = useState('00:00:00');
    // const [distanceTravelled, setDistanceTravelled] = useState(0);
    // const { distance, calorie } = useSpecificTimeKit(starter);

    useEffect(() => {
        Pedometer.isAvailableAsync().then(
            result => {
                setPedometerAvailable(true);
                startPedometer()
            },
            error => {
                setPedometerAvailable(false);
            }
        );
    }, []);

    const startPedometer = () => {
        setStartTime(new Date());
        Pedometer.watchStepCount(result => {
            setCurrentStepCount(result.steps);
        });
    }

    const stopPedometer = () => {
        setStartTime(null);
    };

    const handleFinish = () => {
        const duration = getElapsedMinute(startTime)
        if (duration < 2 || currentStepCount < 100) {
            Alert.alert("时间过短｜步数过少", "数据太小无法记录")
            return;
        }
        const ExerciseData = {
            duration,
            steps: currentStepCount,
        }
<<<<<<< Updated upstream
        stopPedometer()
        setFocused(false)
        navigation.dispatch({
            ...StackActions.replace('AfterExercise', { ExerciseData })
=======
        const tutorial = {
            // name: "Walk",
            name: formatMessage({ id: 'app.exercises.walkExercise' }),
        }
        await finishsessionoutside(tutorial, ExerciseData, new Date()).then(res => {
            if (res && res.status !== false) {
                stopPedometer()
                setFocused(false)
                dispatch(loginSuccess(res.user))
                dispatch(setSessions(res.updatedSessions))
                navigation.dispatch(StackActions.replace("AfterExercise", { tutorial, data: ExerciseData }))
            }
>>>>>>> Stashed changes
        })
    }
    const handleGoback = () => {
        // 显示确认对话框
        Alert.alert(
<<<<<<< Updated upstream
            '放弃步行记录？',
            '如果你离开，步行记录将会丢失。',
            [
                { text: '取消', style: 'cancel', onPress: () => { } },
                {
                    text: '放弃',
                    style: 'destructive',
                    // 如果用户确认放弃，则触发默认行为
                    onPress: () => navigation.goBack()
                },
=======
            formatMessage({ id: 'app.exercises.walkAlert' }),
            formatMessage({ id: 'app.exercises.walkEndAlert' }),
            [{ text: formatMessage({ id: 'app.exercises.cancel' }), style: 'cancel', onPress: () => { } },
            { text: formatMessage({ id: 'app.exercises.endSession' }), style: 'destructive', onPress: () => navigation.goBack() },// 如果用户确认放弃，则触发默认行为
>>>>>>> Stashed changes
            ]
        );

    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blueBackground }}>
            <View style={{ marginHorizontal: '3%', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => handleGoback()}>
                    {ICON.left(36, "#fff")}
                </TouchableOpacity>
                {/* <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>Walk</Text> */}
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>{formatMessage({ id: 'app.exercises.walkExercise' })}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 80, fontWeight: 'bold' }}>{(distance / 1000).toFixed(2)}</Text>
                    <Text style={{ color: '#fff' }}>公里</Text>
                </View> */}
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 80, fontWeight: 'bold' }}>{currentStepCount ? currentStepCount : "--"}</Text>
                    <Text style={{ color: '#fff' }}>{formatMessage({ id: 'app.exercises.steps' })}</Text>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: '8%' }}>
                    {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{currentStepCount ? currentStepCount : "--"}</Text>
                        <Text style={{ color: '#fff' }}>步数</Text>
                    </View> */}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <ElapsedTimeDisplay startTime={startTime} />
                        <Text style={{ color: '#fff', fontSize: 16 }}>{formatMessage({ id: 'app.exercises.time' })}</Text>
                    </View>
                    {/* <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{calorie ? calorie : '--'}</Text>
                        <Text style={{ color: '#fff' }}>千卡</Text>
                    </View> */}
                </View>
                {/* operation button */}
                <View style={{ flexDirection: 'row' }}>
                    {/* Start btn */}
                    {/* {!started && <TouchableOpacity style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#66CC99', justifyContent: 'center', alignItems: 'center', marginRight: 10 }} */}
                    {/* onPress={() => startPedometer()} */}
                    {/* > */}
                    {/* <FontAwesome5 name="play" size={22} color="#fff" /> */}
                    {/* {ICON.play(22, "#fff")} */}
                    {/* </TouchableOpacity>} */}
                    {/* <TouchableOpacity style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#66CC99', justifyContent: 'center', alignItems: 'center', marginRight: 10 }} */}
                    {/* onPress={() => startPedometer()} */}
                    {/* > */}
                    {/* <FontAwesome5 name="play" size={22} color="#fff" /> */}
                    {/* {ICON.play(22, "#fff")} */}
                    {/* </TouchableOpacity> */}
                    {/* Start btn */}
                    {/* <TouchableOpacity */}
                    {/* style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#CC3333', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }} */}
                    {/* > */}
                    {/* <Ionicons name="stop" size={28} color="#fff" /> */}
                    {/* {ICON.stop(28, "#fff")} */}
                    {/* </TouchableOpacity> */}
                    <TouchableOpacity
                        style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => handleFinish()}
                    >
                        {ICON.stop(28, COLORS.blueBackground)}
                    </TouchableOpacity>
                </View>
            </View>
            {/* music component */}
            <View style={{ marginHorizontal: '3%', height: 70, borderRadius: 20, backgroundColor: '#426990', opacity: 0.4 }}>
                <MusicPlayer focused={focused} />
            </View>
        </SafeAreaView >
    )
}

export default Walk

const styles = StyleSheet.create({})
