import { FlatList, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import SpecificConversationHeader from '../components/SpecificConversationHeader'
import { getcurrentconversationmessages, getcurrentconversationmessagesmobile, getspecificconversation, sendmessage } from '../../../api/user.api'
import Message from '../components/Message'
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import COLORS from '../../../constants/COLORS'
import { useRef } from 'react'
import { io } from 'socket.io-client'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import * as ImagePicker from 'expo-image-picker'
import { storage } from '../../../../firebase'
import { ICON } from '../../../constants/SVG/ICON'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
const SpecificConversationPage = ({ route }) => {
    const { currentUser } = useSelector(state => state.user)
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
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
                setCurrentConversationMessages(res)
            } catch (error) {
                // message.error('Failed to get your messages')
            }
        }
        getMessages()
        const interval = setInterval(getMessages, 2000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    const pickImage = async () => {
        console.log("diaoyongle");
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 0.6,
        })

        if (!result.canceled) {
            const imageHeight = result.assets[0].height
            const imageWidth = result.assets[0].width
            console.log("imageHeight", imageHeight);
            console.log("imageWidth", imageWidth);
            await uploadImage(result.assets[0].uri, "image", imageHeight, imageWidth)
        }
    }
    const pickVideo = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: false,
            quality: 0.4,
        })

        if (!result.canceled) {
            const videoHeight = result.assets[0].height
            const videoWidth = result.assets[0].width
            console.log("videoHeight", videoHeight);
            console.log("videoWidth", videoWidth);
            await uploadImage(result.assets[0].uri, "video", videoHeight, videoWidth)
        }
    }
    const [progress, setProgress] = useState()
    const uploadImage = async (uri, fileType, imageHeight, imageWidth) => {
        const response = await fetch(uri);
        const blob = await response.blob()
        const storageRef = ref(storage, `mobile-message-${fileType}-${parseInt((new Date().getTime() / 1000).toString())}`);
        const uploadTask = uploadBytesResumable(storageRef, blob);
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress.toFixed(2));
        },
            (error) => {
                Alert.alert('出现异常')
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // console.log('already exsity', downloadURL);
                    sendMessage(fileType, downloadURL, imageWidth, imageHeight)
                });
            }
        );
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
            <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
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
                    <View style={{ flexDirection: 'row', gap: 6 }}>
                        <TouchableOpacity
                            onPress={pickImage}
                        >
                            {ICON.picture(24, currentTheme.fontColor)}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={pickVideo}
                        >
                            {ICON.video(24, currentTheme.fontColor)}
                        </TouchableOpacity>
                    </View>
                    <TextInput onChangeText={(text) => setMessage(text)} value={message} style={{ flex: 1, padding: 10, borderWidth: 0.2, color: currentTheme.fontColor, borderRadius: 8, marginHorizontal: 8, borderColor: COLORS.commentText, backgroundColor: currentTheme.contentColor }} />
                    <TouchableOpacity
                        onPress={() => sendMessage('text', message)}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 14, backgroundColor: COLORS.primary, borderRadius: 20 }}>
                            {ICON.send(16, COLORS.white)}
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default SpecificConversationPage

const styles = StyleSheet.create({})