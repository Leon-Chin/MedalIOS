import { View, Text, Image, StyleSheet, Dimensions, Pressable, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import { Video, ResizeMode } from 'expo-av'
import { FormatTimestamp } from '../../../utils/chatMessageFormat'
import COLORS from '../../../constants/COLORS'
import SIZE from '../../../constants/SIZE'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import { useIntl } from 'react-intl'

const { width, height } = Dimensions.get('screen')
const Message = ({ owner, message }) => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
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
    const { formatMessage } = useIntl()
    const { msgValue, createdAt, msgType } = message
    const [msgWidth, setMsgWidth] = useState(message.msgWidth > message.msgHeight ? 280 : 200)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    return (
        <View style={{
            alignItems: owner ? 'flex-end' : 'flex-start',
            width: 'auto',
            paddingHorizontal: 10,
            paddingVertical: 6,
            marginBottom: 10,
            width: 'auto',
        }}>
            <View style={[styles.message, msgType === 'text' && ({ backgroundColor: owner ? COLORS.primary : currentTheme.contentColor })]}>
                <Pressable onLongPress={() => { }}>
                    {msgType === 'text' && <Text style={{ fontSize: SIZE.NormalTitle, color: owner ? COLORS.backgroundGray : currentTheme.fontColor }}>{msgValue}</Text>}
                    {msgType === 'image' && <View style={{ width: msgWidth, height: (msgWidth * message.msgHeight / message.msgWidth) }}>
                        {loading && !error && (
                            <ActivityIndicator size="large" color={COLORS.primary} />
                        )}
                        {error && (
                            <Text style={{ color: currentTheme.fontColor }}>{formatMessage({ id: 'error.cannotload' })}</Text>
                        )}
                        <Image
                            source={{ uri: msgValue }}
                            resizeMode='contain'
                            style={{ width: '100%', height: '100%' }}
                            onLoadStart={() => setLoading(true)}
                            onLoad={() => setLoading(false)}
                            onError={() => {
                                setLoading(false);
                                setError(true);
                            }}
                        />
                    </View>}
                    {msgType === 'video' && <View style={{ width: msgWidth, height: (msgWidth * message.msgHeight / message.msgWidth) }}>
                        {(loading && !error) && (
                            <ActivityIndicator size="large" color={COLORS.primary} />
                        )}
                        {error && (
                            <Text style={{ color: currentTheme.fontColor }}>{formatMessage({ id: 'error.cannotload' })}</Text>
                        )}
                        <Video
                            ref={videoPlayer}
                            source={{ uri: msgValue }}
                            useNativeControls
                            resizeMode={ResizeMode.CONTAIN}
                            style={{ width: '100%', flex: 1 }}
                            onPlaybackStatusUpdate={updatePlaybackCallback}
                            onLoadStart={() => setLoading(true)}
                            onLoad={() => setLoading(false)}
                            onError={() => {
                                setError(true);
                                setLoading(false);
                            }}
                        />
                    </View>}
                </Pressable>
                <Text style={{
                    fontSize: 10,
                    color: owner ? COLORS.gray : COLORS.commentText,
                    marginTop: 6
                }}>{FormatTimestamp(createdAt)}</Text>
            </View>
        </View >
    )
}

export default Message

const styles = StyleSheet.create({
    message: {
        width: 'auto',
        maxWidth: width * 0.8,
        paddingHorizontal: SIZE.NormalMargin,
        paddingVertical: SIZE.LittleMargin,
        borderRadius: SIZE.CardBorderRadius,
    },
    date: {
        fontSize: 10,
        color: COLORS.commentText,
        marginTop: 6
    }
})