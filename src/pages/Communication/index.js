import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getconversation } from '../../api/user.api'
import ConversationItem from './components/conversationItem'
const Communication = () => {
    const { currentUser } = useSelector((state) => state.user)
    const { navigate } = useNavigation()
    const [conversations, setConversations] = useState()
    useEffect(() => {
        const getData = async () => {
            const conversations = await getconversation()
            setConversations(conversations)
        }
        getData()
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



// BQCJb-7z5WNZPz3R16i9VU9i8EeGSPE4gMcWrZshcVE9sEt-LA8D6dK_1MsgD7a6BgclbqLx1UrJk8MR5hQC2oX9WZxzSp9Wuc_b2IPL8dueyNC3o3Y
