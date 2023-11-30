import React, { useState } from 'react'
import { Alert, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../constants/COLORS';
import { useNavigation } from '@react-navigation/native';
import SIZE from '../constants/SIZE';
import { ICON } from '../constants/SVG/ICON';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/userSlice';
import { createconversation, getuser, removecontact } from '../api/user.api';
import GENDER from '../constants/GENDER';
import { useEffect } from 'react';
import PIC from '../constants/PIC';
import { Swipeable } from 'react-native-gesture-handler';
const ContactHorizontalWithID = ({ contactID, setVisible }) => {
    const dispatch = useDispatch()
    const { navigate } = useNavigation()
    const [contact, setContact] = useState({ name: "", gender: "", avator: null })
    const { name, gender, avator } = contact
    const getUser = async () => {
        await getuser(contactID).then(res => {
            if (res.status !== false) {
                setContact(res)
            } else {
                Alert.alert("出现异常请稍后重试")
            }
        })
    }
    useEffect(() => {
        getUser()
    }, [])
    const handleSendMessage = async () => {
        await createconversation({ receiverId: contactID }).then(res => {
            if (res.status !== false) {
                setVisible(false)
                dispatch(loginSuccess(res.user))
                const conversation = res.conversation
                navigate('SpecificConversationPage', { conversationID: conversation._id, contact })
            } else {
                console.log(res);
                Alert.alert("出现异常请稍后重试")
            }
        })
    }
    const handleDeleteUser = async () => {
        await removecontact(contactID).then(res => {
            if (res.status !== false) {
                dispatch(loginSuccess(res))
            } else {
                Alert.alert("出现异常请稍后重试")
            }
        })
    }
    const rightActions = (dragX) => <View style={{ backgroundColor: 'red', justifyContent: 'center' }}>
        <Text style={{ color: COLORS.white, padding: 20, fontSize: SIZE.NormalTitle, fontWeight: '500' }} onPress={handleDeleteUser}>
            {ICON.delete(24, COLORS.white)}
        </Text>
    </View>
    return (
        <Swipeable renderRightActions={rightActions}>
            <TouchableOpacity
                onPress={() => { }}
                style={{
                    borderRadius: SIZE.CardBorderRadius,
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                    alignItems: 'center',
                    gap: 10,
                    padding: 10,
                    flexDirection: 'row'
                }}
            >
                <>
                    <ImageBackground
                        source={{ uri: avator ? avator : PIC.avatar }}
                        style={{
                            borderRadius: SIZE.CardBorderRadius, overflow: 'hidden',
                            height: 50,
                            width: 50,
                        }}>
                    </ImageBackground>
                    <View
                        style={{
                            flex: 1,
                            padding: 4,
                            height: '100%'
                        }}>
                        <Text style={{ color: COLORS.black, fontWeight: 'bold', marginBottom: 10 }}>
                            {name}
                        </Text>
                        <Text>
                            {gender === GENDER.female ? ICON.female(16, COLORS.pink) : ICON.male(16, COLORS.primary)}
                        </Text>
                    </View>
                </>
                <TouchableOpacity
                    onPress={handleSendMessage}
                    style={{ padding: SIZE.LittleMargin, borderRadius: SIZE.CardBorderRadius, borderColor: COLORS.commentText, borderWidth: 2 }}
                >
                    <Text style={{ color: COLORS.commentText, }}>发消息</Text>
                </TouchableOpacity>
            </TouchableOpacity >
        </Swipeable>
    )
}

export default ContactHorizontalWithID