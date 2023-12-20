// import React, { useState, useEffect } from 'react';
// import { View, TouchableOpacity } from 'react-native';
// import { Audio } from 'expo-av';
// import { ICON } from '../constants/SVG/ICON';
// import { getallmusics } from '../api/music.api';

// const MusicPlayer = ({ focused }) => {
//     useEffect(() => {
//         console.log(focused);
//         if (!focused) {

//             // 页面失去焦点时暂停音乐
//             sound.unloadAsync();
//         }
//     }, [focused]);

//     const [sound, setSound] = useState();
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

//     const getAllMusics = async () => {
//         await getallmusics().then(res => {
//             if (res && res.status !== false) {
//                 console.log(res);
//                 const playlist = res.map(item => item.url)
//                 setPlaylist(playlist)
//             }
//         })
//     }
//     useEffect(() => {
//         getAllMusics()
//     }, [])
//     const [playlist, setPlaylist] = useState([])
//     // 播放音乐
//     async function playSound(track) {
//         const { sound } = await Audio.Sound.createAsync(
//             { uri: track },
//             { shouldPlay: true }
//         );
//         setSound(sound);
//         setIsPlaying(true);
//         focused && await sound.playAsync();
//     }

//     // 暂停音乐
//     async function pauseSound() {
//         if (sound) {
//             await sound.pauseAsync();
//             setIsPlaying(false);
//         }
//     }

//     // 下一首音乐
//     const playNext = () => {
//         if (currentTrackIndex < playlist.length - 1) {
//             setCurrentTrackIndex(currentTrackIndex + 1);
//         } else {
//             setCurrentTrackIndex(0); // 如果是最后一首，回到播放列表的开始
//         }
//     };

//     // 上一首音乐
//     const playPrev = () => {
//         if (currentTrackIndex > 0) {
//             setCurrentTrackIndex(currentTrackIndex - 1);
//         } else {
//             setCurrentTrackIndex(playlist.length - 1); // 如果是第一首，跳到播放列表的最后
//         }
//     };

//     // 切换音乐时重新加载音乐
//     useEffect(() => {
//         if (playlist[currentTrackIndex]) {
//             playSound(playlist[currentTrackIndex]);
//         }
//     }, [currentTrackIndex]);

//     // 组件卸载时卸载声音
//     useEffect(() => {
//         return sound
//             ? () => {
//                 sound.unloadAsync();
//             }
//             : undefined;
//     }, [sound]);
//     return (
//         <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//             <View style={{ height: 60, width: 230, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <TouchableOpacity
//                     onPress={() => playPrev()}
//                 >
//                     {ICON.previous(24, '#fff')}
//                 </TouchableOpacity>

//                 {!isPlaying ? <TouchableOpacity
//                     onPress={() => playSound(playlist[currentTrackIndex])}
//                 >
//                     {ICON.play(24, '#fff')}
//                 </TouchableOpacity>
//                     :
//                     <TouchableOpacity
//                         onPress={() => pauseSound()}
//                     >
//                         {ICON.pause(24, '#fff')}
//                     </TouchableOpacity>}

//                 <TouchableOpacity
//                     onPress={() => playNext()}
//                 >
//                     {ICON.next(24, '#fff')}
//                 </TouchableOpacity>
//             </View>
//         </View>
//     )
// }

// export default MusicPlayer


// // ver2
// import React, { useState, useEffect, useCallback } from 'react';
// import { View, TouchableOpacity } from 'react-native';
// import { Audio } from 'expo-av';
// import { ICON } from '../constants/SVG/ICON';
// import { getallmusics } from '../api/music.api';

// const MusicPlayer = ({ focused }) => {
//     const [sound, setSound] = useState();
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
//     const [playlist, setPlaylist] = useState([]);

//     const fetchPlaylist = async () => {
//         const response = await getallmusics();
//         if (response && response.status !== false) {
//             const playlistUrls = response.map(item => item.url);
//             setPlaylist(playlistUrls);
//         }
//     };

//     useEffect(() => {
//         fetchPlaylist();
//     }, []);

//     const unloadSound = useCallback(async () => {
//         if (sound) {
//             await sound.unloadAsync();
//         }
//     }, [sound]);

//     const playSound = async (track) => {
//         await unloadSound();
//         const { sound: newSound } = await Audio.Sound.createAsync(
//             { uri: track },
//             { shouldPlay: true }
//         );
//         setSound(newSound);
//         setIsPlaying(true);
//         if (focused) {
//             await newSound.playAsync();
//         }
//     };

//     const pauseSound = async () => {
//         if (sound) {
//             await sound.pauseAsync();
//             setIsPlaying(false);
//         }
//     };

//     useEffect(() => {
//         if (!focused) {
//             unloadSound();
//         }
//     }, [focused, unloadSound]);

//     useEffect(() => {
//         if (playlist.length && focused) {
//             playSound(playlist[currentTrackIndex]);
//         }
//     }, [currentTrackIndex, playlist, focused]);

//     useEffect(() => {
//         return () => {
//             unloadSound();
//         };
//     }, [unloadSound]);

//     const changeTrack = (direction) => {
//         const newIndex = direction === 'next'
//             ? (currentTrackIndex + 1) % playlist.length
//             : (currentTrackIndex - 1 + playlist.length) % playlist.length;
//         setCurrentTrackIndex(newIndex);
//     };

//     return (
//         <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//             <View style={{ height: 60, width: 230, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <TouchableOpacity onPress={() => changeTrack('prev')}>
//                     {ICON.previous(24, '#fff')}
//                 </TouchableOpacity>
//                 {!isPlaying ? (
//                     <TouchableOpacity onPress={() => playSound(playlist[currentTrackIndex])}>
//                         {ICON.play(24, '#fff')}
//                     </TouchableOpacity>
//                 ) : (
//                     <TouchableOpacity onPress={() => pauseSound()}>
//                         {ICON.pause(24, '#fff')}
//                     </TouchableOpacity>
//                 )}
//                 <TouchableOpacity onPress={() => changeTrack('next')}>
//                     {ICON.next(24, '#fff')}
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// export default MusicPlayer;

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { ICON } from '../constants/SVG/ICON';
import { getallmusics } from '../api/music.api';
import SIZE from '../constants/SIZE';

const MusicPlayer = ({ focused }) => {
    const [playlist, setPlaylist] = useState([]);
    const [currentTrack, setCurrentTrack] = useState({ name: '', author: '', url: '' });
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    const fetchPlaylist = async () => {
        const response = await getallmusics();
        if (response && response.status !== false) {
            setPlaylist(response);
            setCurrentTrack(response[0]);
        }
    };

    useEffect(() => {
        fetchPlaylist();
    }, []);

    const unloadSound = useCallback(async () => {
        if (sound) {
            await sound.unloadAsync();
        }
    }, [sound]);

    const playSound = async () => {
        await unloadSound();
        const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: currentTrack.url },
            { shouldPlay: true }
        );
        setSound(newSound);
        setIsPlaying(true);
        await newSound.playAsync();
    };

    useEffect(() => {
        if (focused && playlist.length > 0) {
            setCurrentTrack(playlist[currentTrackIndex]);
        }
    }, [currentTrackIndex, playlist, focused]);

    useEffect(() => {
        if (focused && currentTrack.url) {
            playSound();
        }
    }, [currentTrack, focused]);

    const changeTrack = (direction) => {
        let newIndex = currentTrackIndex;
        if (direction === 'next') {
            newIndex = (currentTrackIndex + 1) % playlist.length;
        } else if (direction === 'prev') {
            newIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        }
        setCurrentTrackIndex(newIndex);
    };

    const pauseSound = async () => {
        if (sound) {
            await sound.pauseAsync();
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        return () => {
            unloadSound();
        };
    }, [unloadSound]);

    return (
        <View style={{ flex: 1, flexDirection: 'column', padding: SIZE.NormalMargin, justifyContent: 'center' }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{currentTrack.name}</Text>
                <Text style={{ fontSize: 14 }}>{currentTrack.author}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ height: 60, width: 230, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => changeTrack('prev')}>
                        {ICON.previous(24, '#fff')}
                    </TouchableOpacity>
                    {!isPlaying ? (
                        <TouchableOpacity onPress={playSound}>
                            {ICON.play(24, '#fff')}
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={pauseSound}>
                            {ICON.pause(24, '#fff')}
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => changeTrack('next')}>
                        {ICON.next(24, '#fff')}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default MusicPlayer;

