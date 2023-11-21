import React, { useState, useEffect } from 'react';
import { View, Button, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { ICON } from '../constants/SVG/ICON';

const MusicPlayer = ({ focused }) => {
    useEffect(() => {
        console.log(focused);
        if (!focused) {
            console.log('xiaohuile');
            // 页面失去焦点时暂停音乐
            sound.unloadAsync();
        }
    }, [focused]);

    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    // 假设这是您的播放列表
    const playlist = [
        'https://www.bensound.com/bensound-music/bensound-happyrock.mp3',
        'https://www.bensound.com/bensound-music/bensound-ukulele.mp3',
        'https://www.bensound.com/bensound-music/bensound-creativeminds.mp3',
    ];


    // 播放音乐
    async function playSound(track) {
        const { sound } = await Audio.Sound.createAsync(
            { uri: track },
            { shouldPlay: true }
        );
        setSound(sound);
        setIsPlaying(true);

        isFocused && await sound.playAsync();
    }

    // 暂停音乐
    async function pauseSound() {
        if (sound) {
            await sound.pauseAsync();
            setIsPlaying(false);
        }
    }

    // 下一首音乐
    const playNext = () => {
        if (currentTrackIndex < playlist.length - 1) {
            setCurrentTrackIndex(currentTrackIndex + 1);
        } else {
            setCurrentTrackIndex(0); // 如果是最后一首，回到播放列表的开始
        }
    };

    // 上一首音乐
    const playPrev = () => {
        if (currentTrackIndex > 0) {
            setCurrentTrackIndex(currentTrackIndex - 1);
        } else {
            setCurrentTrackIndex(playlist.length - 1); // 如果是第一首，跳到播放列表的最后
        }
    };

    // 切换音乐时重新加载音乐
    useEffect(() => {
        if (playlist[currentTrackIndex]) {
            playSound(playlist[currentTrackIndex]);
        }
    }, [currentTrackIndex]);

    // 组件卸载时卸载声音
    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);
    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ height: 60, width: 230, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => playPrev()}
                >
                    {ICON.previous(24, '#fff')}
                </TouchableOpacity>

                {!isPlaying ? <TouchableOpacity
                    onPress={() => playSound(playlist[currentTrackIndex])}
                >
                    {ICON.play(24, '#fff')}
                </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={() => pauseSound()}
                    >
                        {ICON.pause(24, '#fff')}
                    </TouchableOpacity>}

                <TouchableOpacity
                    onPress={() => playNext()}
                >
                    {ICON.next(24, '#fff')}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MusicPlayer
