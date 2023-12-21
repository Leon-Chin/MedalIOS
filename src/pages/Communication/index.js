import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, RefreshControl, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { deleteconversation, getconversation } from '../../api/user.api'
import ConversationItem from './components/conversationItem'
import { ICON } from '../../constants/SVG/ICON';
import COLORS from '../../constants/COLORS';
import SubscribeContactModal from './components/SubscribeContactModal';
import useUserTheme from '../../hooks/useUserTheme';
import APPTHEME from '../../constants/COLORS/APPTHEME';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { ERROR_MESSAGE } from '../../constants/ERRORMessage';
const Communication = () => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const [conversations, setConversations] = useState([{}])
    const getData = async () => {
        const conversations = await getconversation()
        if (conversations && conversations.status !== false) {
            setConversations(conversations)
        } else {
            Toast.show(ERROR_MESSAGE)
        }
    }
    useEffect(() => {
        const interval = setInterval(getData, 3000)
        getData()
        return () => {
            clearInterval(interval)
        }
    }, [])
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        // 可以在这里重新获取 sessions 数据，或者直接更新 selectDay 以触发重载
        const conversations = await getconversation()
        if (conversations && conversations.status !== false) {
            setConversations(conversations)
        } else {
            Toast.show(ERROR_MESSAGE)
        }
        setRefreshing(false);
    };
    const deleteConversation = async (conversationID) => {
        await deleteconversation(conversationID).then(res => {
            if (res.status !== false) {
                setConversations(res)
            } else {
                Toast.show(ERROR_MESSAGE)
            }
        })
    }
    const [subscribeContactModalVisible, setSubscribeContactModalVisible] = useState(false)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: '3%', paddingBottom: 10 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: currentTheme.fontColor }}>Communication</Text>
                <TouchableOpacity
                    onPress={() => setSubscribeContactModalVisible(true)}
                >
                    {ICON.contact(24, COLORS.gray)}
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={conversations}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    renderItem={({ item, index }) => {
                        return <ConversationItem key={index} deleteConversation={deleteConversation} conversation={item} />
                    }}
                />
            </View>
            <SubscribeContactModal visible={subscribeContactModalVisible} setVisible={setSubscribeContactModalVisible} />
        </SafeAreaView>
    )
}

export default Communication

const styles = StyleSheet.create({})