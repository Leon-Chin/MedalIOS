import React, { useState } from 'react'
import { Alert, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../constants/COLORS';
import { useNavigation } from '@react-navigation/native';
import SIZE from '../constants/SIZE';
import { ICON } from '../constants/SVG/ICON';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/userSlice';
import { addcontactbyid, createconversation } from '../api/user.api';
import GENDER from '../constants/GENDER';
import { useEffect } from 'react';
import useUserTheme from '../hooks/useUserTheme';
import APPTHEME from '../constants/COLORS/APPTHEME';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { ERROR_MESSAGE } from '../constants/ERRORMessage';
import { useIntl } from 'react-intl'

const ContactHorizontal = ({ contact, setVisible }) => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { navigate } = useNavigation()
    const { contactsUsers } = currentUser
    const { name, gender, avator } = contact
    const { _id: ContactID } = contact
    useEffect(() => {
        setAlreadySubscribed(currentUser.contactsUsers.includes(ContactID))
    }, [currentUser])

    const [alreadySubscribed, setAlreadySubscribed] = useState(contactsUsers.includes(ContactID))
    const handleSubscribe = async () => {
        await addcontactbyid(ContactID).then(res => {
            if (res.status !== false) {
                dispatch(loginSuccess(res))
            } else {
                Toast.show(ERROR_MESSAGE);
            }
        })
    }
    const handleSendMessage = async () => {
        await createconversation({ receiverId: ContactID }).then(res => {
            if (res.status !== false) {
                setVisible(false)
                dispatch(loginSuccess(res.user))
                const conversation = res.conversation
                navigate('SpecificConversationPage', { conversationID: conversation._id, contact })
            } else {
                console.log(res);
                Toast.show(ERROR_MESSAGE);
            }
        })
    }
    return (
        <TouchableOpacity
            onPress={() => { }}
            style={{
                borderRadius: SIZE.CardBorderRadius,
                backgroundColor: currentTheme.contentColor,
                overflow: 'hidden',
                marginBottom: SIZE.NormalMargin,
                alignItems: 'center',
                gap: 10,
                padding: 10,
                flexDirection: 'row'
            }}
        >
            <>
                <ImageBackground
                    source={{ uri: avator }}
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
            {alreadySubscribed ? <TouchableOpacity
                onPress={handleSendMessage}
                style={{ padding: SIZE.LittleMargin, borderRadius: SIZE.CardBorderRadius, borderColor: COLORS.commentText, borderWidth: 2 }}
            >
                <Text style={{ color: COLORS.commentText, }}>{formatMessage({ id: 'app.comu.sendText' })}</Text>
            </TouchableOpacity> : <TouchableOpacity
                onPress={handleSubscribe}
                style={{ padding: SIZE.LittleMargin, borderRadius: SIZE.CardBorderRadius, borderColor: COLORS.primary, borderWidth: 2 }}
            >
                <Text style={{ color: COLORS.primary, }}>{formatMessage({ id: 'app.comu.subscribe' })}</Text>
            </TouchableOpacity>}
        </TouchableOpacity >
    )
}

export default ContactHorizontal