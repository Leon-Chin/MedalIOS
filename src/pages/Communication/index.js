import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { deleteconversation, getconversation } from '../../api/user.api'
import ConversationItem from './components/conversationItem'
import { ICON } from '../../constants/SVG/ICON';
import COLORS from '../../constants/COLORS';
import SubscribeContactModal from './components/SubscribeContactModal';
const Communication = () => {
    const [conversations, setConversations] = useState([{}])
    useEffect(() => {
        const getData = async () => {
            const conversations = await getconversation()
            setConversations(conversations)
        }
        const interval = setInterval(getData, 3000)
        getData()
        return () => {
            clearInterval(interval)
        }
    }, [])

    const deleteConversation = async (conversationID) => {
        await deleteconversation(conversationID).then(res => {
            if (res.status !== false) {
                setConversations(res)
            } else {
                Alert.alert("出现异常请稍后重试")
            }
        })
    }
    const [subscribeContactModalVisible, setSubscribeContactModalVisible] = useState(false)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: '3%', paddingBottom: 10 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Communication</Text>
                <TouchableOpacity
                    onPress={() => setSubscribeContactModalVisible(true)}
                >
                    {ICON.contact(24, COLORS.black)}
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={conversations}
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