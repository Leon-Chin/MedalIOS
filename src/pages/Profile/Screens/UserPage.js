import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
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
import UserRecordSum from '../components/UserRecordSum'
import { formatTimeToChinese } from '../../../utils/formatTime'
import UserBestRecord from '../components/UserBestRecord'
import ContactOptionsModal from '../components/ContactOptionsModal'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { ERROR_MESSAGE } from '../../../constants/ERRORMessage'
import { useIntl } from 'react-intl'

const UserPage = ({ route }) => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { navigate } = useNavigation()
    const ContactID = route.params.userID
    const isOwn = ContactID === currentUser._id
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
                Toast.show(ERROR_MESSAGE)
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
                Toast.show(ERROR_MESSAGE)
            }
        })
    }
    const handleSubscribe = async () => {
        await addcontactbyid(ContactID).then(res => {
            if (res.status !== false) {
                dispatch(loginSuccess(res))
            } else {
                Toast.show(ERROR_MESSAGE)
            }
        })
    }
    const handleUnSubscribe = async () => {
        await removecontact(ContactID).then(res => {
            if (res.status !== false) {
                dispatch(loginSuccess(res))
            } else {
                Toast.show(ERROR_MESSAGE)
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
                    {!isOwn && <TouchableOpacity
                        onPress={() => { setActionModalVisible(true) }}
                    >
                        {ICON.more(30, COLORS.black)}
                    </TouchableOpacity>}
                </View>
                <View style={{ flexDirection: 'row', marginBottom: SIZE.NormalMargin, marginHorizontal: '3%', }}>
                    <Text style={{ color: currentTheme.fontColor }}>@{user?.name}</Text>
                    <Text style={{ color: COLORS.commentText }}>{formatMessage({ id: 'app.profile.joinedPt1' })}{formatTimeToChinese(user?.createdAt)}{formatMessage({ id: 'app.profile.joinedPt2' })}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: SIZE.NormalMargin, paddingRight: SIZE.NormalMargin }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: SIZE.NormalMargin, paddingHorizontal: SIZE.LargerMargin, borderRadius: SIZE.CardBorderRadiusForBtn, borderWidth: 2, borderColor: COLORS.primary }}
                        onPress={handleSendMessage}
                    >
                        <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.primary }}>{formatMessage({ id: 'app.profile.sendText' })}</Text>
                    </TouchableOpacity>
                    {alreadySubscribed ?
                        <TouchableOpacity
                            style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: SIZE.NormalMargin, paddingHorizontal: SIZE.LargerMargin, borderRadius: SIZE.CardBorderRadiusForBtn, backgroundColor: COLORS.primary }}
                            onPress={handleUnSubscribe}
                        >
                            <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.white }}>{formatMessage({ id: 'app.profile.cancelSub' })}</Text>
                        </TouchableOpacity> : <TouchableOpacity
                            style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: SIZE.NormalMargin, paddingHorizontal: SIZE.LargerMargin, borderRadius: SIZE.CardBorderRadiusForBtn, backgroundColor: COLORS.primary }}
                            onPress={handleSubscribe}
                        >
                            <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.white }}>{formatMessage({ id: 'app.profile.sub' })}</Text>
                        </TouchableOpacity>}
                </View>
                <View style={{ marginTop: SIZE.NormalMargin, borderTopWidth: 0.2, borderTopColor: currentTheme.commentFontColor }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: SIZE.NormalMargin }}>
                        <TouchableOpacity
                            onPress={() => { setSelectTab('blog') }}
                            style={{ alignItems: 'center', gap: 6 }}>
                            <Text style={{ fontSize: SIZE.SmallTitle, fontWeight: 'bold', color: selectTab === "blog" ? currentTheme.fontColor : COLORS.commentText }}>{formatMessage({ id: 'app.profile.blogs' })}</Text>
                            {selectTab === 'blog' && <View style={{ height: 3, width: 10, backgroundColor: currentTheme.fontColor, borderRadius: 2, }}></View>}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { setSelectTab('record') }}
                            style={{ alignItems: 'center', gap: 6 }}>
                            <Text style={{ fontSize: SIZE.SmallTitle, fontWeight: 'bold', color: selectTab === "record" ? currentTheme.fontColor : COLORS.commentText }}>{formatMessage({ id: 'app.profile.records' })}</Text>
                            {selectTab === 'record' && <View style={{ height: 3, width: 10, backgroundColor: currentTheme.fontColor, borderRadius: 2, }}></View>}
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    {selectTab === "blog" && <View style={{ marginHorizontal: '3%', paddingTop: SIZE.NormalMargin }}>
                        {user?.blogs && <View style={{ marginBottom: SIZE.LittleMargin }}><Text style={{ fontSize: 12, color: COLORS.commentText }}>{formatMessage({ id: 'app.profile.totalPt1' })}{user.blogs.length}{formatMessage({ id: 'app.profile.totalBlogPt2' })}</Text></View>}
                        {user?.blogs && user.blogs.map((item, index) => <BlogCard blog={item} key={index} />)}
                        {/* {user?.blogs && user.blogs.map((item, index) => <BlogCard blog={item} key={index} />)} */}
                    </View>}
                    {selectTab === "record" && <View style={{ marginHorizontal: '3%', paddingTop: SIZE.NormalMargin }}>
                        {records.length !== 0 && <UserRecordSum records={user?.records} />}
                        {records.length !== 0 && <UserBestRecord records={user?.records} />}
                        <View style={{ marginBottom: SIZE.LittleMargin }}><Text style={{ fontSize: SIZE.SmallTitle, color: COLORS.commentText }}>{formatMessage({ id: 'app.profile.totalPt1' })}{records.length}{formatMessage({ id: 'app.profile.totalRecordsPt2' })}</Text></View>
                    </View>}
                </ScrollView>
                <ContactOptionsModal visible={actionModalVisible} setVisible={setActionModalVisible} user={user} />
            </SafeAreaView>
        </BottomSheetModalProvider>
    )
}

export default UserPage