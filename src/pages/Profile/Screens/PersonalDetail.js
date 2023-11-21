import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { Avatar } from '@rneui/base'
import { useSelector } from 'react-redux'
import COLORS from '../../../constants/COLORS'
import { formatTimeToChinese } from '../../../utils/formatTime'
import { useNavigation } from '@react-navigation/native'

const PersonalDetail = () => {
    const { currentUser } = useSelector(state => state.user)
    const { navigate } = useNavigation()
    return (
        <ScrollView>
            <TouchableOpacity
                onPress={() => { }}
                style={{ flexDirection: 'row', width: '100%', height: 60, justifyContent: 'space-between', backgroundColor: '#fff', marginBottom: 2, alignItems: 'center', paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '500' }}>头像</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar source={{ uri: currentUser.avator }} size={40} />
                    <Entypo name="chevron-right" size={18} style={{ marginLeft: 10 }} color="black" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { }}
                style={{ flexDirection: 'row', width: '100%', height: 60, justifyContent: 'space-between', backgroundColor: '#fff', marginBottom: 2, alignItems: 'center', paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '500' }}>name</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: COLORS.commentText }}>{currentUser.name}</Text>
                    <Entypo name="chevron-right" size={18} style={{ marginLeft: 10 }} color="black" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { }}
                style={{ flexDirection: 'row', width: '100%', height: 60, justifyContent: 'space-between', backgroundColor: '#fff', marginBottom: 2, alignItems: 'center', paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '500' }}>性别</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: COLORS.commentText }}>{currentUser.gender && currentUser.gender}</Text>
                    <Entypo name="chevron-right" size={18} style={{ marginLeft: 10 }} color="black" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { }}
                style={{ flexDirection: 'row', width: '100%', height: 60, justifyContent: 'space-between', backgroundColor: '#fff', marginBottom: 2, alignItems: 'center', paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '500' }}>个性签名</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: COLORS.commentText }}>{currentUser.personalStatus && currentUser.personalStatus}</Text>
                    <Entypo name="chevron-right" size={18} style={{ marginLeft: 10 }} color="black" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { }}
                style={{ flexDirection: 'row', width: '100%', height: 60, justifyContent: 'space-between', backgroundColor: '#fff', marginBottom: 2, alignItems: 'center', paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '500' }}>生日</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: COLORS.commentText }}>{currentUser.birthday && formatTimeToChinese(currentUser.birthday)}</Text>
                    <Entypo name="chevron-right" size={18} style={{ marginLeft: 10 }} color="black" />
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default PersonalDetail