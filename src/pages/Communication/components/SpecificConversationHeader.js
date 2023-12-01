import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Avatar } from '@rneui/base'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import { ICON } from '../../../constants/SVG/ICON'

const SpecificConversationHeader = ({ contact }) => {
    const { navigate, goBack } = useNavigation()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: '3%', paddingBottom: 10 }}>
            <TouchableOpacity onPress={() => goBack()}>
                {ICON.left(24, currentTheme.fontColor)}
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigate('UserPage', { userID: contact._id })
                }}
                style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 18 }}>
                <Avatar source={{ uri: contact.avator }} rounded />
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 6, color: currentTheme.fontColor }}>{contact.name}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SpecificConversationHeader