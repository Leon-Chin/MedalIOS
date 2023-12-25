import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../constants/COLORS'
import { Pedometer } from 'expo-sensors';
import MusicPlayer from '../../../components/MusicPlayer';
import { ICON } from '../../../constants/SVG/ICON';
import ElapsedTimeDisplay from './ElapsedTimeDisplay';
import { StackActions, useNavigation } from '@react-navigation/native';
import { getElapsedMinute } from '../../../utils/getDuration';
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
    const [focused, setFocused] = useState(true)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    useEffect(() => {
        navigation.setOptions({ gestureEnabled: false })
    }, [navigation]);

    const starter = new Date()
    starter.setHours(18, 0, 0, 0)
    const [pedemeterAvailable, setPedometerAvailable] = useState(false);
    const [currentStepCount, setCurrentStepCount] = useState(0);
    useEffect(() => {
        let pedometerSubscription;

        // 检查Pedometer是否可用并开始监听步数
        const startPedometer = async () => {
            const isAvailable = await Pedometer.isAvailableAsync();
            setPedometerAvailable(isAvailable);

            if (isAvailable) {
                let initial = 0
                let first = true
                setStartTime(new Date());
                // 订阅Pedometer，并保存订阅以便稍后取消
                pedometerSubscription = Pedometer.watchStepCount(result => {
                    if (first) {  // 如果这是新会话，记录初始步数
                        initial = result.steps;
                    }
                    first = false
                    // 显示的步数为当前步数减去初始步数
                    setCurrentStepCount(result.steps - initial);
                });
            }
        };

        startPedometer();

        // 清理函数：组件卸载时调用
        return () => {
            if (pedometerSubscription) {
                // 取消订阅
                pedometerSubscription.remove();
                pedometerSubscription.remove()
            }
            stopPedometer(); // 确保计时器停止
        };
    }, []);

    const stopPedometer = () => {
        setStartTime(null);
    };

    const handleFinish = async () => {
        const duration = getElapsedMinute(startTime).minutes
        if (duration < 2 || currentStepCount < 100) {
            Toast.show(CanNotFinish_MESSAGE)
            return;
        }
        const ExerciseData = {
            exerciseDuration: getElapsedMinute(startTime).seconds,
            startTime: startTime,
            endTime: new Date(),
            // calorieConsumption: 
            step: currentStepCount,
        }
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
        })
    }
    const handleGoback = () => {
        // 显示确认对话框
        Alert.alert(
            formatMessage({ id: 'app.exercises.walkAlert' }),
            formatMessage({ id: 'app.exercises.walkEndAlert' }),
            [{ text: formatMessage({ id: 'app.exercises.cancel' }), style: 'cancel', onPress: () => { } },
            { text: formatMessage({ id: 'app.exercises.endSession' }), style: 'destructive', onPress: () => navigation.goBack() },// 如果用户确认放弃，则触发默认行为
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
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>{formatMessage({ id: 'app.exercises.walkExercise' })}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 80, fontWeight: 'bold' }}>{currentStepCount ? currentStepCount : "--"}</Text>
                    <Text style={{ color: '#fff' }}>{formatMessage({ id: 'app.exercises.stepUnit' })}</Text>
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
                    <TouchableOpacity
                        style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => handleFinish()}
                    >
                        {ICON.stop(28, COLORS.blueBackground)}
                    </TouchableOpacity>
                </View>
            </View>
            {/* music component */}
            <View style={{ marginHorizontal: '3%', height: 100, borderRadius: 20, backgroundColor: '#426990', opacity: 0.4 }}>
                <MusicPlayer focused={focused} />
            </View>
        </SafeAreaView >
    )
}

export default Walk

const styles = StyleSheet.create({})
