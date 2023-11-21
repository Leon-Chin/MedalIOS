import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SpecificBlogHeaderLeft = ({ blog, user }) => {
    const navigation = useNavigation()
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                // go to personal page
                onPress={() => { }}
                style={{ flexDirection: 'row', alignItems: 'center' }}
            >
                <Avatar source={{ uri: user.avator }} rounded />
                <Text style={{ marginLeft: 6, fontSize: 18, fontWeight: '500' }}>{user.name}</Text>
            </TouchableOpacity>
            <View></View>
        </View>
    )
}

export default SpecificBlogHeaderLeft