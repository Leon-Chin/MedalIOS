import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getspecificconversationunreadnum, getuser } from '../../../api/user.api'
import { Avatar } from '@rneui/base'
import { FontAwesome5 } from '@expo/vector-icons';
import { formatDateTime } from '../../../utils/chatContactFormat'
import COLORS from '../../../constants/COLORS'
import { useNavigation } from '@react-navigation/native'

const ConversationItem = ({ conversation }) => {
    const { currentUser } = useSelector(state => state.user)
    const { navigate } = useNavigation()
    const { _id } = currentUser
    const [contact, setContact] = useState()
    const [unreadNum, setUnreadNum] = useState(0)
    useEffect(() => {
        const contactIndex = conversation.members.indexOf(_id) === 1 ? 0 : 1
        const contactID = conversation.members[contactIndex]
        const getContactInfo = async () => {
            const res = await getuser(contactID)
            setContact(res)
        }
        getContactInfo()
    }, [conversation])
    useEffect(() => {
        const getUnreadNum = async () => {
            const res = await getspecificconversationunreadnum(conversation._id)
            setUnreadNum(res.length)
        }
        getUnreadNum()
    }, [])

    const getMsgValue = (conversation) => {
        switch (conversation.lastWordType) {
            case 'text':
                return conversation.lastWords
            case 'image':
                return '[picture]'
            case 'video':
                return '[video]'
            default:
                break;
        }
    }
    return (
        <TouchableOpacity
            onPress={() => navigate('SpecificConversationPage', { conversationID: conversation._id, contact })}
            style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginHorizontal: '3%', paddingVertical: 6, borderBottomWidth: 0.2, borderBottomColor: COLORS.commentText }}>
            {contact ? <Avatar size={50} rounded source={{ uri: contact.avator }} /> : <FontAwesome5 name="user-circle" size={24} color="black" />}
            <View style={{ flex: 1, marginLeft: 10, }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    {contact && <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: 'bold' }}>{contact.name}</Text>}
                    <Text style={{ color: COLORS.commentText, fontSize: 14 }}>{formatDateTime(conversation.updatedAt)}</Text>
                </View>
                <View>
                    <Text numberOfLines={1} style={{ fontSize: 16, color: COLORS.commentText }}>{getMsgValue(conversation)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ConversationItem