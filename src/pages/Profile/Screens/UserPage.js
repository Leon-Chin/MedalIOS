import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { addcontactbyid, createconversation, getuser, removecontact } from '../../../api/user.api'
import { Avatar } from '@rneui/base'
import COLORS from '../../../constants/COLORS'
import { ICON } from '../../../constants/SVG/ICON'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import SIZE from '../../../constants/SIZE'
import { loginSuccess } from '../../../redux/userSlice'
import BlogCard from '../../../components/BlogCard'
import useRecordsAnalysis from '../../../hooks/useRecordsAnalysis'
import UserRecordSum from '../components/UserRecordSum'
import { formatTimeToChinese } from '../../../utils/formatTime'
import UserBestRecord from '../components/UserBestRecord'
import ContactOptionsModal from '../components/ContactOptionsModal'
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'

const UserPage = ({ route }) => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { navigate } = useNavigation()
    const ContactID = route.params.userID
    const { contactsUsers } = currentUser
    const [user, setUser] = useState()
    const [records, setRecords] = useState([])
    useEffect(() => {
        setAlreadySubscribed(currentUser.contactsUsers.includes(ContactID))
    }, [currentUser])
    const [alreadySubscribed, setAlreadySubscribed] = useState(contactsUsers.includes(ContactID))
    const [actionModalVisible, setActionModalVisible] = useState(false)
    const getUser = async () => {
        await getuser(ContactID).then(res => {
            if (res.status !== false) {
                setUser(res)
                setRecords(res.records)
            } else {
                Alert.alert("出现异常请稍后重试")
            }
        })
    }
    const handleSendMessage = async () => {
        await createconversation({ receiverId: ContactID }).then(res => {
            if (res.status !== false) {
                dispatch(loginSuccess(res.user))
                const conversation = res.conversation
                navigate('SpecificConversationPage', { conversationID: conversation._id, contact: user })
            } else {
                Alert.alert("出现异常请稍后重试")
            }
        })
    }
    const handleSubscribe = async () => {
        await addcontactbyid(ContactID).then(res => {
            if (res.status !== false) {
                dispatch(loginSuccess(res))
            } else {
                Alert.alert('出现异常请稍后重试')
            }
        })
    }
    const handleUnSubscribe = async () => {
        await removecontact(ContactID).then(res => {
            if (res.status !== false) {
                dispatch(loginSuccess(res))
            } else {
                Alert.alert('出现异常请稍后重试')
            }
        })
    }
    useEffect(() => {
        getUser()
    }, [ContactID])
    const [selectTab, setSelectTab] = useState('blog')//blog && record
    return (
        <BottomSheetModalProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
                <View style={{ marginHorizontal: '3%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Avatar source={{ uri: user?.avator }} rounded size={52} />
                        <View style={{ marginLeft: 6 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.primary }}>{user?.name && user.name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 10, marginTop: 4, color: COLORS.commentText }}>ID:</Text>
                                <Text style={{ fontSize: 10, marginTop: 4, color: COLORS.commentText }}>{ContactID}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => { setActionModalVisible(true) }}
                    >
                        {ICON.more(30, COLORS.black)}
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: SIZE.NormalMargin, marginHorizontal: '3%', }}>
                    <Text style={{ color: currentTheme.fontColor }}>@{user?.name}</Text>
                    <Text style={{ color: COLORS.commentText }}>于{formatTimeToChinese(user?.createdAt)}加入</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: SIZE.NormalMargin, paddingRight: SIZE.NormalMargin }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: SIZE.NormalMargin, paddingHorizontal: SIZE.LargerMargin, borderRadius: SIZE.CardBorderRadiusForBtn, borderWidth: 2, borderColor: COLORS.primary }}
                        onPress={handleSendMessage}
                    >
                        <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.primary }}>发消息</Text>
                    </TouchableOpacity>
                    {alreadySubscribed ?
                        <TouchableOpacity
                            style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: SIZE.NormalMargin, paddingHorizontal: SIZE.LargerMargin, borderRadius: SIZE.CardBorderRadiusForBtn, backgroundColor: COLORS.primary }}
                            onPress={handleUnSubscribe}
                        >
                            <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.white }}>取消关注</Text>
                        </TouchableOpacity> : <TouchableOpacity
                            style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: SIZE.NormalMargin, paddingHorizontal: SIZE.LargerMargin, borderRadius: SIZE.CardBorderRadiusForBtn, backgroundColor: COLORS.primary }}
                            onPress={handleSubscribe}
                        >
                            <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.white }}>关注</Text>
                        </TouchableOpacity>}
                </View>
                <View style={{ marginTop: SIZE.NormalMargin, borderTopWidth: 0.2, borderTopColor: currentTheme.commentFontColor }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: SIZE.NormalMargin }}>
                        <TouchableOpacity
                            onPress={() => { setSelectTab('blog') }}
                            style={{ alignItems: 'center', gap: 6 }}>
                            <Text style={{ fontSize: SIZE.SmallTitle, fontWeight: 'bold', color: selectTab === "blog" ? currentTheme.fontColor : COLORS.commentText }}>动态</Text>
                            {selectTab === 'blog' && <View style={{ height: 3, width: 10, backgroundColor: currentTheme.fontColor, borderRadius: 2, }}></View>}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { setSelectTab('record') }}
                            style={{ alignItems: 'center', gap: 6 }}>
                            <Text style={{ fontSize: SIZE.SmallTitle, fontWeight: 'bold', color: selectTab === "record" ? currentTheme.fontColor : COLORS.commentText }}>运动记录</Text>
                            {selectTab === 'record' && <View style={{ height: 3, width: 10, backgroundColor: currentTheme.fontColor, borderRadius: 2, }}></View>}
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    {selectTab === "blog" && <View style={{ marginHorizontal: '3%', paddingTop: SIZE.NormalMargin }}>
                        {user?.blogs && <View style={{ marginBottom: SIZE.LittleMargin }}><Text style={{ fontSize: 12, color: COLORS.commentText }}>总共「{user.blogs.length}」个动态</Text></View>}
                        {user?.blogs && user.blogs.map((item, index) => <BlogCard blog={item} key={index} />)}
                        {/* {user?.blogs && user.blogs.map((item, index) => <BlogCard blog={item} key={index} />)} */}
                    </View>}
                    {selectTab === "record" && <View style={{ marginHorizontal: '3%', paddingTop: SIZE.NormalMargin }}>
                        {records.length !== 0 && <UserRecordSum records={user?.records} />}
                        {records.length !== 0 && <UserBestRecord records={user?.records} />}
                        <View style={{ marginBottom: SIZE.LittleMargin }}><Text style={{ fontSize: SIZE.SmallTitle, color: COLORS.commentText }}>总共「{records.length}」个运动记录</Text></View>
                    </View>}
                </ScrollView>
                <ContactOptionsModal visible={actionModalVisible} setVisible={setActionModalVisible} user={user} />
            </SafeAreaView>
        </BottomSheetModalProvider>
    )
}

export default UserPage