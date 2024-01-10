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
import useUserTheme from '../hooks/useUserTheme';
import APPTHEME from '../constants/COLORS/APPTHEME';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { ERROR_Alert } from '../constants/ERRORMessage';
import { useIntl } from 'react-intl'

const ContactHorizontalWithID = ({ contactID, setVisible }) => {
    const { formatMessage } = useIntl()
    const dispatch = useDispatch()
    const { navigate } = useNavigation()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const [contact, setContact] = useState({ name: "", gender: "", avator: null })
    const { name, gender, avator } = contact
    const getUser = async () => {
        await getuser(contactID).then(res => {
            if (res.status !== false) {
                setContact(res)
            } else {
                Toast.show(ERROR_Alert(formatMessage({ id: "error.errorMsg" })));
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
                Toast.show(ERROR_Alert(formatMessage({ id: "error.errorMsg" })));
            }
        })
    }
    const handleDeleteUser = async () => {
        await removecontact(contactID).then(res => {
            if (res.status !== false) {
                dispatch(loginSuccess(res))
            } else {
                Toast.show(ERROR_Alert(formatMessage({ id: "error.errorMsg" })));
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
                onPress={() => {
                    console.log("dianjil");
                    setVisible(false)
                    navigate('UserPage', { userID: contactID })
                }}
                style={{
                    borderRadius: SIZE.CardBorderRadius,
                    backgroundColor: currentTheme.contentColor,
                    overflow: 'hidden',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: SIZE.NormalMargin,
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
                        <Text style={{ color: currentTheme.fontColor, fontWeight: 'bold', marginBottom: 10 }}>
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
                    <Text style={{ color: COLORS.commentText, }}>{formatMessage({ id: 'app.comu.sendText' })}</Text>
                </TouchableOpacity>
            </TouchableOpacity >
        </Swipeable>
    )
}

export default ContactHorizontalWithID