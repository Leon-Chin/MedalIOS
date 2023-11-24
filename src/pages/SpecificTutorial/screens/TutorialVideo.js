import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Video } from 'expo-av';
import COLORS from '../../../constants/COLORS';

const { width } = Dimensions.get('screen')
const TutorialVideo = ({ route }) => {
    const { tutorial } = route.params
    return (
        <View
            style={{ flex: 1 }}
        >
            <Video
                source={{ uri: tutorial.video }} // 视频源
                rate={1.0} // 控制播放速率
                volume={1.0} // 控制音量
                isMuted={false} // 是否静音
                resizeMode="contain" // 调整视频大小
                shouldPlay // 控制视频是否应该自动播放
                isLooping // 控制视频是否循环播放
                useNativeControls={true} // 是否使用本地播放控制器
                style={{ width, height: '100%' }} // 设置视频尺寸
            />
        </View>
    )
}

export default TutorialVideo

const styles = StyleSheet.create({})