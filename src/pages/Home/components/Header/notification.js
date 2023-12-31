import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Badge } from '@rneui/base'
import { useIntl } from 'react-intl'
import { useNavigation } from '@react-navigation/native'
import { getunreadedmessage } from '../../../../api/user.api'
import { getnotifications } from '../../../../api/notification.api'
import useUncompletedTutorials from '../../../../hooks/useUncompletedTutorials'
import useUserTheme from '../../../../hooks/useUserTheme'
import APPTHEME from '../../../../constants/COLORS/APPTHEME'
import { ICON } from '../../../../constants/SVG/ICON'
const Notification = () => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { formatMessage } = useIntl()
    const navigation = useNavigation()
    const [allNotifications, setAllNotifications] = useState(0)
    const [notifications, setNotifications] = useState([]);
    const [unreadedMsgs, setUnreadedMsgs] = useState([])
    const todo = useUncompletedTutorials();
    const getNotice = async () => {
        const unreadedMsgs = await getunreadedmessage()
        setUnreadedMsgs(unreadedMsgs)
        const notifications = await getnotifications()
        setNotifications(notifications)
    };

    useEffect(() => {
        getNotice();
    }, []);

    //get allNotification number
    useEffect(() => {
        const allNotificationsNum = notifications.length + unreadedMsgs.length + todo.length
        setAllNotifications(allNotificationsNum)
    }, [notifications, unreadedMsgs, todo]);

    const getUnreadedMessageSender = async () => {
        return Promise.all(unreadedMsgs.map(async (unreadedMsg) => await getuser(unreadedMsg.sender)))
    }
    useEffect(() => {
        unreadedMsgs?.length !== 0 && getUnreadedMessageSender().then((sendersDetail) => {
            const res = unreadedMsgs.map(msg => {
                const senderDetail = sendersDetail.find(sender => sender._id === msg.sender)
                return { ...msg, senderDetail }
            })
            setUnreadedMsgs(res)
        })
    }, [unreadedMsgs])

    return (
        <TouchableOpacity onPress={() => { navigation.navigate('Notifications') }}>
            {ICON.notification(24, currentTheme.fontColor)}
            {allNotifications !== 0 && <Badge status='error' value={allNotifications} containerStyle={{ position: 'absolute', top: -10, left: 12 }} />}
        </TouchableOpacity>
    )
}

export default Notification