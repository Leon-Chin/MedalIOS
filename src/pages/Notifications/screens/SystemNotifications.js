import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/base'
import { useEffect } from 'react'
import { useState } from 'react'
import { deletenotification, getnotifications } from '../../../api/notification.api'
import SIZE from '../../../constants/SIZE'
import { ICON } from '../../../constants/SVG/ICON'
import COLORS from '../../../constants/COLORS'

const SystemNotifications = () => {
    const [loading, setLoading] = useState(false)
    const [notifications, setNotifications] = useState();
    const getNoti = async () => {
        setLoading(true)
        const notifications = await getnotifications()
        setNotifications(notifications)
        setLoading(false)
    }
    useEffect(() => {
        getNoti()
    }, [])

    const handleDeleteNotification = async (notiID) => {
        await deletenotification(notiID).then(res => {
            if (res.status !== false) {
                getNoti()
            }
        })
    }
    return (
        <ScrollView style={{ flex: 1 }}>
            {notifications && notifications.map((item, key) => <TouchableOpacity key={key} style={{ flexDirection: 'coloumn', justifyContent: 'space-between', width: '100%' }}>
                <View style={{ flex: 1, marginHorizontal: '3%', marginTop: SIZE.NormalMargin, backgroundColor: '#fff', borderRadius: SIZE.CardBorderRadius, padding: SIZE.NormalMargin }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Avatar source={{ uri: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png' }} size={30} />
                            <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', marginLeft: 6 }}>系统消息</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => { handleDeleteNotification(item._id) }}
                        >
                            {ICON.delete(24, COLORS.gray)}
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: SIZE.LittleMargin }}>
                        <Text style={{ fontSize: SIZE.SmallTitle }}>{item.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>)}
        </ScrollView >
    )
}

export default SystemNotifications