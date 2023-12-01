import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/base'
import { getuser } from '../../../api/user.api';
import { useEffect } from 'react';
import { useState } from 'react';
import dayjs from 'dayjs'
import COLORS from '../../../constants/COLORS';
import { useNavigation } from '@react-navigation/native';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';

const MessageNotification = ({ message }) => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { navigate } = useNavigation()
    const [unreadedMsg, setUnreadedMsg] = useState(message)
    const [contact, setContact] = useState()
    const getUnreadedMessageSender = async () => {
        const senderDetail = await getuser(unreadedMsg.sender)
        setContact(senderDetail)
        const updatedUnreadedMsg = { ...unreadedMsg, senderDetail }
        setUnreadedMsg(updatedUnreadedMsg)
    }

    const getMsgValue = (msg) => {
        switch (msg.msgType) {
            case 'text':
                return msg.msgValue
            case 'image':
                return '[picture]'
            case 'video':
                return '[video]'
            default:
                break;
        }
    }
    useEffect(() => {
        getUnreadedMessageSender()
    }, [message])

    return (
        <TouchableOpacity
            onPress={() => navigate('SpecificConversationPage', { conversationID: unreadedMsg.conversationId, contact })}
            style={{ backgroundColor: currentTheme.contentColor, marginVertical: 6, marginHorizontal: '3%', padding: 10, borderRadius: 12, }}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                <Avatar source={{ uri: unreadedMsg?.senderDetail?.avator }} size={36} rounded />
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: currentTheme.fontColor }}>{unreadedMsg?.senderDetail?.name}</Text>
            </View>
            <View>
                <Text
                    numberOfLines={2}
                    style={{ fontSize: 18, color: COLORS.commentText, marginVertical: 6 }}>
                    {getMsgValue(unreadedMsg)}
                </Text>
            </View>
            <View style={{ flexDirection: 'row-reverse' }}>
                <Text style={{ color: COLORS.commentText }}>
                    {dayjs(unreadedMsg.updatedAt).format('YYYY-MM-DD HH:mm')}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default MessageNotification

const styles = StyleSheet.create({})