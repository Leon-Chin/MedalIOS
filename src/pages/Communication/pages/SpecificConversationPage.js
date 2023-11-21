import { FlatList, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SpecificConversationHeader from '../components/SpecificConversationHeader'
import { getcurrentconversationmessages, getcurrentconversationmessagesmobile, getspecificconversation, sendmessage } from '../../../api/user.api'
import Message from '../components/Message'
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import COLORS from '../../../constants/COLORS'
import { useRef } from 'react'
import { io } from 'socket.io-client'
const SpecificConversationPage = ({ route }) => {
    const { currentUser } = useSelector(state => state.user)
    const { contact, conversationID } = route.params
    const [currentConversationMessages, setCurrentConversationMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState()
    const socket = useRef(null)
    const handleArrivalMessage = (mes) => {
        const newMessage = {
            sender: mes.senderId,
            msgValue: mes.text,
            msgType: 'text',
            createdAt: Date.now()
        }
        setArrivalMessage(newMessage)
    }

    useEffect(() => {
        // socket.current = io("ws://medal.onrender.com")
        socket.current = io("ws://localhost:3001")
        socket.current.emit("addUser", currentUser._id)
        socket.current.on("getUsers", users => {
            console.log("users", users);
        })
        socket.current.on("welcome", (data) => {
            console.log("welcome", data);
        })
        socket.current.on("getMessage", (mes) => {
            handleArrivalMessage(mes)
        })
        return () => {
            socket.current.on("removeUser", currentUser._id)
        }
    }, [])
    // useEffect(() => {
    //     if (arrivalMessage) {
    //         setCurrentConversationMessages((prev) => [...prev, arrivalMessage])
    //     }
    // }, [setArrivalMessage, arrivalMessage])
    const [message, setMessage] = useState()
    const sendMessage = async (type, value, width, height) => {

        try {
            if (value) {
                socket.current.emit('sendMessage', { msgType: type, senderId: currentUser._id, receiverId: contact._id, msgValue: value, msgHeight: height ? height : null, msgWidth: width ? width : null })
                await sendmessage({ msgType: type, conversationId: conversationID, receiver: contact._id, msgValue: value, msgHeight: height ? height : null, msgWidth: width ? width : null })
                setMessage('')
                // const addedMessages = [...currentConversationMessages, { msgType: type, conversationId: conversationID, receiver: contact._id, msgValue: value, msgHeight: height ? height : null, msgWidth: width ? width : null }]
                // setCurrentConversationMessages(addedMessages)
            } else {
                // message.error('cannot send empty message')
            }
        } catch (error) {
            // message.error('Failed to send your messages')
        }
    }
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await getcurrentconversationmessagesmobile(conversationID)
                console.log('msgs', res);
                setCurrentConversationMessages(res)
            } catch (error) {
                // message.error('Failed to get your messages')
            }
        }
        getMessages()
    }, [])

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
            <SafeAreaView style={{ flex: 1 }}>
                <SpecificConversationHeader contact={contact} />
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={currentConversationMessages}
                        renderItem={({ item, index }) => <Message key={index} owner={item.sender === currentUser._id} contact={contact} message={item} />}
                        inverted
                    // keyExtractor={item => item.id}
                    // extraData={currentConversationMessages}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: '3%', paddingVertical: 10, borderTopWidth: 0.18, borderTopColor: COLORS.commentText }}>
                    <TouchableOpacity>
                        <AntDesign name="picture" size={30} color="black" />
                    </TouchableOpacity>
                    <TextInput onChangeText={(text) => setMessage(text)} value={message} style={{ flex: 1, padding: 10, borderWidth: 0.2, borderRadius: 8, marginHorizontal: 8, borderColor: 'gray' }} placeholder='input' />
                    <TouchableOpacity
                        onPress={() => sendMessage('text', message)}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 14, backgroundColor: COLORS.primary, borderRadius: 20 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>Send</Text>
                            <FontAwesome name="send" size={16} style={{ marginLeft: 6 }} color="#fff" />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default SpecificConversationPage

const styles = StyleSheet.create({})