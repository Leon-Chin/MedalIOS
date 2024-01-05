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
import * as Location from 'expo-location';
import { useIntl } from 'react-intl';
import { RUN_TUTORIAL } from '../../../constants/APP_INSIDE_TUTORIAL';

const Run = () => {
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
                setStartTime(new Date());
                // 订阅Pedometer，并保存订阅以便稍后取消
                let initial = 0
                let first = true
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
                console.log("xiezaile");
                console.log(pedometerSubscription);
                pedometerSubscription.remove();
                pedometerSubscription.remove()
                console.log("now", pedometerSubscription.remove());
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
            distance: distance,
            step: currentStepCount,
        }
        await finishsessionoutside(RUN_TUTORIAL, ExerciseData, new Date()).then(res => {
            if (res && res.status !== false) {
                stopPedometer()
                setFocused(false)
                dispatch(loginSuccess(res.user))
                dispatch(setSessions(res.updatedSessions))
                // here
                stopTracking()
                navigation.dispatch(StackActions.replace("AfterExercise", { tutorial: RUN_TUTORIAL, data: ExerciseData }))
            }
        })
    }

    const [isTracking, setIsTracking] = useState(true);
    const [distance, setDistance] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(null);
    const [positionStack, setPositionStack] = useState([]);
    const MIN_DISTANCE_THRESHOLD = 5; // 最小距离阈值，单位为米
    const POSITION_STACK_SIZE = 2; // 用于滑动窗口平均的位置栈大小
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }
        })();
    }, []);

    const stopTracking = () => {
        setIsTracking(false);
    };

    const getAveragePosition = (positions) => {
        if (positions.length === 0) return null;
        let avgLat = 0, avgLon = 0;
        positions.forEach(pos => {
            avgLat += pos.coords.latitude;
            avgLon += pos.coords.longitude;
        });
        avgLat /= positions.length;
        avgLon /= positions.length;
        return { latitude: avgLat, longitude: avgLon };
    };

    function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d * 1000; // Distance in m
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }


    useEffect(() => {
        if (isTracking) {
            const subscription = Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.BestForNavigation,
                    distanceInterval: 6, // Receive updates only after moving 10 meters
                },
                (newPosition) => {
                    setPositionStack(prev => [...prev.slice(1 - POSITION_STACK_SIZE), newPosition]); // 更新位置栈

                    if (positionStack.length === POSITION_STACK_SIZE) {
                        // console.log("here", newPosition);
                        const averagePosition = getAveragePosition(positionStack);
                        // console.log("currentPosition", currentPosition);
                        // console.log("averagePosition", averagePosition);
                        if (currentPosition && averagePosition) {
                            const newDistance = getDistanceFromLatLonInM(
                                currentPosition.coords.latitude,
                                currentPosition.coords.longitude,
                                averagePosition.latitude,
                                averagePosition.longitude
                            );
                            // console.log("newDistance", newDistance);
                            if (newDistance > MIN_DISTANCE_THRESHOLD) {
                                setDistance((prevDistance) => prevDistance + newDistance);
                                setCurrentPosition(newPosition);
                            }
                        } else {
                            setCurrentPosition(newPosition);
                        }
                    }
                }
            );

            return () => {
                subscription.then((sub) => sub.remove());
            };
        }
    }, [isTracking, currentPosition, positionStack]);

    const handleGoback = () => {
        // 显示确认对话框
        Alert.alert(
            formatMessage({ id: 'app.exercises.runningAlert' }),
            formatMessage({ id: 'app.exercises.runEndAlert' }),
            [{ text: formatMessage({ id: 'app.exercises.cancel' }), style: 'cancel', onPress: () => { } },
            {
                text: formatMessage({ id: 'app.exercises.endSession' }), style: 'destructive', onPress: () => {
                    setDistance(0)
                    setCurrentStepCount(0)
                    navigation.goBack()
                }
            },// 如果用户确认放弃，则触发默认行为
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
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>{formatMessage({ id: 'app.exercises.runExercise' })}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 80, fontWeight: 'bold' }}>{(distance).toFixed(0)}</Text>
                    <Text style={{ color: '#fff' }}>{formatMessage({ id: 'app.exercises.distanceUnit' })}</Text>
                </View>
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
            <View style={{ marginHorizontal: '3%', height: 100, borderRadius: 20, backgroundColor: '#426990', opacity: 0.4 }}>
                <MusicPlayer focused={focused} />
            </View>
        </SafeAreaView >
    )
}

export default Run

const styles = StyleSheet.create({})
