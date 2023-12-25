import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Video } from 'expo-av';
import { useState } from 'react';
import { useEffect } from 'react';
import COLORS from '../../../constants/COLORS';
import SIZE from '../../../constants/SIZE';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import FinishExerciseModal from '../components/FinishExerciseModal';
import EXERCISETYPE from '../../../constants/EXERCISETYPE';
import { useIntl } from 'react-intl';

const { width, height } = Dimensions.get('screen')
const TutorialVideo = ({ route }) => {
    const { formatMessage } = useIntl()
    const { tutorial } = route.params
    const [exerciseStartTime, setExerciseStartTime] = useState(new Date())
    const [exerciseFinishTime, setExerciseFinishTime] = useState()
    const [startTime, setStartTime] = useState(null);
    const [lastPlayStartTime, setLastPlayStartTime] = useState(null);
    const [watchedTime, setWatchedTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false)

    const [durationInSeconds, setDurationInSeconds] = useState(0);

    const handleVideoLoad = (meta) => {
        // 将时长从毫秒转换为秒
        const durationSec = Math.round(meta.durationMillis / 1000);
        setDurationInSeconds(durationSec);
    };

    const handlePlaybackStatusUpdate = (playbackStatus) => {
        if (!playbackStatus.isLoaded) {
            // 当视频加载未完成时，忽略
            return;
        }

        if (playbackStatus.isPlaying && startTime === null) {
            // 当视频开始播放时，记录开始时间
            setIsPlaying(true)
            setStartTime(new Date().getTime());
            setLastPlayStartTime(new Date().getTime());
        } else if (!playbackStatus.isPlaying && startTime !== null) {
            setIsPlaying(false)
            // 当视频暂停时，计算观看时长并累加
            const currentTime = new Date().getTime();
            const thisDurationTime = watchedTime + (currentTime - startTime) / 1000
            setWatchedTime(Math.round(thisDurationTime));
            setStartTime(null); // 重置开始时间
        }

        if (playbackStatus.didJustFinish) {
            // 当视频播放结束时
            const endTime = new Date().getTime();
            // const thisDurationTime = watchedTime + (endTime - startTime) / 1000
            const finalDurationTime = lastPlayStartTime !== null ? watchedTime + (endTime - lastPlayStartTime) / 1000 : watchedTime;
            setWatchedTime(Math.round(finalDurationTime));
            setStartTime(null); // 重置开始时间
            setLastPlayStartTime(null);
            setIsPlaying(false);
            tutorial.type === EXERCISETYPE.rope.value ? {} : handleFinish()
        }
    };

    // 可以在这里使用 useEffect 来处理 watchedTime 的变化
    useEffect(() => {
        // 处理 watchedTime 的变化，例如发送到服务器
        console.log(watchedTime);
    }, [watchedTime]);
    const [finishTutorialVisible, setFinishTutorialVisible] = useState(false)
    const handleFinish = () => {
        setFinishTutorialVisible(true)
        setExerciseFinishTime(new Date())
    }
    return (
        <BottomSheetModalProvider>
            <View
                style={{ flex: 1 }}
            >
                <Video
                    source={{ uri: tutorial.video }} // 视频源
                    onLoad={handleVideoLoad}
                    rate={1.0} // 控制播放速率
                    volume={1.0} // 控制音量
                    isMuted={false} // 是否静音
                    resizeMode="contain" // 调整视频大小
                    shouldPlay // 控制视频是否应该自动播放
                    isLooping={tutorial.type === EXERCISETYPE.rope.value ? true : false} // 控制视频是否循环播放
                    useNativeControls={true} // 是否使用本地播放控制器
                    style={{ width, height: height }} // 设置视频尺寸
                    onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                />
                {!isPlaying && <TouchableOpacity
                    onPress={handleFinish}
                    style={{ position: 'absolute', zIndex: 99, bottom: 100, right: 20, backgroundColor: COLORS.primary, padding: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadiusForBtn }}>
                    <Text style={{ color: COLORS.white, fontSize: SIZE.NormalTitle, fontWeight: 'bold', }}>{formatMessage({ id: 'app.exercises.stopSession' })}</Text>
                </TouchableOpacity>}
            </View>
            <FinishExerciseModal videoDuration={durationInSeconds} watchTime={watchedTime} visible={finishTutorialVisible} setVisible={setFinishTutorialVisible} tutorial={tutorial} startTime={exerciseStartTime} endTime={exerciseFinishTime} />
        </BottomSheetModalProvider>
    )
}

export default TutorialVideo

const styles = StyleSheet.create({})