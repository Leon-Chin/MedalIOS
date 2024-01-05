import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Avatar } from '@rneui/base'
import { useSelector } from 'react-redux'
import COLORS from '../../../constants/COLORS'
import { formatTimeToChinese } from '../../../utils/formatTime'
import { useNavigation } from '@react-navigation/native'
import AvatorModal from '../components/AvatorModal'
import GenderModal from '../components/GenderModal'
import GENDER from '../../../constants/GENDER'
import { ICON } from '../../../constants/SVG/ICON'
import NameModal from '../components/NameModal'
import StatusModal from '../components/StatusModal'
import BirthdayModal from '../components/BirthdayModal'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import SIZE from '../../../constants/SIZE'
import { useIntl } from 'react-intl'

const PersonalDetail = () => {
    const { formatMessage } = useIntl()
    const { currentUser } = useSelector(state => state.user)
    const [avatorModalVisible, setAvatorModalVisible] = useState(false)
    const [nameModalVisible, setNameModalVisible] = useState(false)
    const [birthdayModalVisible, setBirthdayModalVisible] = useState(false)
    const [statusModalVisible, setStatusModalVisible] = useState(false)
    const [genderModalVisible, setGenderModalVisible] = useState(false)
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return (
        <ScrollView style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
            <TouchableOpacity
                onPress={() => setAvatorModalVisible(true)}
                style={{ flexDirection: 'row', width: '100%', height: 60, justifyContent: 'space-between', backgroundColor: currentTheme.contentColor, marginVertical: SIZE.LittleMargin, alignItems: 'center', paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '500', color: currentTheme.fontColor }}>{formatMessage({ id: 'app.profile.avatar' })}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar source={{ uri: currentUser.avator }} size={40} />
                    {/* <Entypo name="chevron-right" size={18} style={{ marginLeft: 10 }} color="black" /> */}
                    {ICON.right(18, currentTheme.fontColor)}
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setNameModalVisible(true)}
                style={{ flexDirection: 'row', width: '100%', height: 60, justifyContent: 'space-between', backgroundColor: currentTheme.contentColor, marginBottom: SIZE.LittleMargin, alignItems: 'center', paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '500', color: currentTheme.fontColor }}>{formatMessage({ id: 'app.profile.userName' })}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: COLORS.commentText }}>{currentUser.name}</Text>
                    {/* <Entypo name="chevron-right" size={18} style={{ marginLeft: 10 }} color="black" /> */}
                    {ICON.right(18, currentTheme.fontColor)}
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setGenderModalVisible(true)}
                style={{ flexDirection: 'row', width: '100%', height: 60, justifyContent: 'space-between', backgroundColor: currentTheme.contentColor, marginBottom: SIZE.LittleMargin, alignItems: 'center', paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '500', color: currentTheme.fontColor }}>{formatMessage({ id: 'app.profile.gender' })}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    {currentUser.gender && (currentUser.gender === GENDER.male ? ICON.male(24, COLORS.primary) : ICON.female(24, COLORS.pink))}
                    {/* <Entypo name="chevron-right" size={18} style={{ marginLeft: 10 }} color="black" /> */}
                    {ICON.right(18, currentTheme.fontColor)}
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setStatusModalVisible(true)}
                style={{ flexDirection: 'row', width: '100%', height: 60, justifyContent: 'space-between', backgroundColor: currentTheme.contentColor, marginBottom: SIZE.LittleMargin, alignItems: 'center', paddingHorizontal: 20 }}>
                 <Text style={{ fontSize: 18, fontWeight: '500', color: currentTheme.fontColor }}>{formatMessage({ id: 'app.profile.status' })}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: COLORS.commentText }}>{currentUser.personalStatus && currentUser.personalStatus}</Text>
                    {/* <Entypo name="chevron-right" size={18} style={{ marginLeft: 10 }} color="black" /> */}
                    {ICON.right(18, currentTheme.fontColor)}
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setBirthdayModalVisible(true)}
                style={{ flexDirection: 'row', width: '100%', height: 60, justifyContent: 'space-between', backgroundColor: currentTheme.contentColor, marginBottom: SIZE.LittleMargin, alignItems: 'center', paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '500', color: currentTheme.fontColor }}>{formatMessage({ id: 'app.profile.birthday' })}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: COLORS.commentText }}>{currentUser.birthday && formatTimeToChinese(currentUser.birthday)}</Text>
                    {/* <Entypo name="chevron-right" size={18} style={{ marginLeft: 10 }} color="black" /> */}
                    {ICON.right(18, currentTheme.fontColor)}
                </View>
            </TouchableOpacity>
            <AvatorModal visible={avatorModalVisible} setVisible={setAvatorModalVisible} />
            <GenderModal visible={genderModalVisible} setVisible={setGenderModalVisible} />
            <NameModal visible={nameModalVisible} setVisible={setNameModalVisible} />
            <StatusModal visible={statusModalVisible} setVisible={setStatusModalVisible} />
            <BirthdayModal visible={birthdayModalVisible} setVisible={setBirthdayModalVisible} />
        </ScrollView>
    )
}

export default PersonalDetail