import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/base'
import COLORS from '../../../constants/COLORS'
import { useEffect } from 'react'
import { useState } from 'react'
import { getnotifications } from '../../../api/user.api'

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
    return (
        <ScrollView style={{ flex: 1 }}>
            {notifications && notifications.map((item, key) => <TouchableOpacity key={key} style={{ flexDirection: 'coloumn', justifyContent: 'space-between', width: '100%' }}>
                <View style={{ flex: 1, marginHorizontal: '3%', marginVertical: 6, backgroundColor: '#fff', borderRadius: 12, padding: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Avatar source={{ uri: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png' }} size={36} />
                        <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 6 }}>系统消息</Text>
                    </View>
                    {/* title */}
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>)}
        </ScrollView >
    )
}

export default SystemNotifications