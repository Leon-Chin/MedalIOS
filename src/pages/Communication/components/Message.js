import { View, Text, Image, StyleSheet, Dimensions, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import { Video, ResizeMode } from 'expo-av'
import { FormatTimestamp } from '../../../utils/chatMessageFormat'
import COLORS from '../../../constants/COLORS'

const { width, height } = Dimensions.get('screen')
const Message = ({ owner, message }) => {
    const videoPlayer = useRef(null)
    const [playbackInstanceInfo, setPlaybackInstanceInfo] = useState({
        position: 0,
        duration: 0,
        state: 'Buffering'
    });
    const updatePlaybackCallback = (status) => {
        if (status.isLoaded) {
            setPlaybackInstanceInfo({
                ...playbackInstanceInfo,
                position: status.positionMillis,
                duration: status.durationMillis || 0,
                state: status.didJustFinish ? 'Ended' :
                    status.isBuffering ? 'Buffering' :
                        status.shouldPlay ? 'Playing' : 'Paused'
            })
        } else {
            if (status.isLoaded === false && status.error) {
                const errorMsg = `Encountered a fatal error during playback: ${status.error}`;
                console.log(errorMsg, 'error')
            }
        }
    }
    const { msgValue, createdAt, msgType } = message
    const [msgWidth, setMsgWidth] = useState(message.msgWidth > message.msgHeight ? 280 : 200)
    return (
        <View style={[owner ? styles.owner : styles.sender, styles.messageContainer]}>
            <View style={[styles.message, msgType === 'text' && (!owner ? styles.msgSender : styles.msgOwner)]}>
                <Pressable onLongPress={() => { }}>
                    {msgType === 'text' && <Text style={{ fontSize: 16 }}>{msgValue}</Text>}
                    {msgType === 'image' && <View style={{ width: msgWidth, height: (msgWidth * message.msgHeight / message.msgWidth) }}>
                        <Image source={{ uri: msgValue }} resizeMode='contain' style={{ width: '100%', flex: 1 }} />
                    </View>}
                    {msgType === 'video' && <View style={{ width: msgWidth, height: (msgWidth * message.msgHeight / message.msgWidth) }}>
                        <Video
                            ref={videoPlayer}
                            source={{ uri: msgValue }}
                            useNativeControls
                            resizeMode={ResizeMode.CONTAIN}
                            style={{ width: '100%', flex: 1 }}
                            onPlaybackStatusUpdate={updatePlaybackCallback}
                        />
                    </View>}
                </Pressable>
                {Math.abs(new Date().getTime() - new Date(createdAt).getTime()) >= (3 * 60 * 1000) && <Text style={styles.date}>{FormatTimestamp(createdAt)}</Text>}
            </View>
        </View >
    )
}

export default Message

const styles = StyleSheet.create({
    msgOwner: {
        backgroundColor: COLORS.primary,
    },
    message: {
        width: 'auto',
        maxWidth: width * 0.8,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },
    msgSender: {
        backgroundColor: '#fff'
    },
    messageContainer: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginBottom: 10,
        width: 'auto',
    },
    sender: {
        alignItems: 'flex-start',
    },
    owner: {
        alignItems: 'flex-end',
    },
    date: {
        fontSize: 10,
        color: COLORS.commentText,
        marginTop: 6
    }
})