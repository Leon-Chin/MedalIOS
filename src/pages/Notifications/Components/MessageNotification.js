import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/base'
import { getuser } from '../../../api/user.api';
import { useEffect } from 'react';
import { useState } from 'react';
import dayjs from 'dayjs'
import COLORS from '../../../constants/COLORS';
import { useNavigation } from '@react-navigation/native';

const MessageNotification = ({ message }) => {
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
            style={{ backgroundColor: '#fff', marginVertical: 6, marginHorizontal: '3%', padding: 10, borderRadius: 12, }}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                <Avatar source={{ uri: unreadedMsg?.senderDetail?.avator }} size={36} rounded />
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{unreadedMsg?.senderDetail?.name}</Text>
            </View>
            <View>
                <Text
                    numberOfLines={2}
                    style={{ fontSize: 18, color: '#333', marginVertical: 6 }}>
                    {getMsgValue(unreadedMsg)}
                    {/* dsfahalskdj;lakjsdf;ladjfoiadsjfalsdjfasd;jflkdsjflkjkkkkkkkksdfasdfasdfasdfasfsdaffdsaifhsaiodfhasodifhasdoifhasoidfhasdoifhasoidfapsfiasdpfoi */}
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