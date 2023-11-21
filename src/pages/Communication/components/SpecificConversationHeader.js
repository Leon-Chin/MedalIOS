import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Avatar } from '@rneui/base'

const SpecificConversationHeader = ({ contact }) => {
    const navigation = useNavigation()
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: '3%', paddingBottom: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 18 }}>
                <Avatar source={{ uri: contact.avator }} rounded />
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 6 }}>{contact.name}</Text>
            </View>
        </View>
    )
}

export default SpecificConversationHeader