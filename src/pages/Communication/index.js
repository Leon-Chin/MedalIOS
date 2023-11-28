import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { getconversation } from '../../api/user.api'
import ConversationItem from './components/conversationItem'
const Communication = () => {
    const [conversations, setConversations] = useState()
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
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: '3%', paddingBottom: 10 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Communication</Text>
                <TouchableOpacity>
                    <AntDesign name="contacts" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={conversations}
                    renderItem={({ item, index }) => {
                        return <ConversationItem key={index} conversation={item} />
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default Communication

const styles = StyleSheet.create({})