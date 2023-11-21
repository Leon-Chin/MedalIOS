import { View, Text } from 'react-native'
import React from 'react'
import { Octicons } from '@expo/vector-icons';
import { Avatar } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SpecificBlogHeaderRight = ({ blog, user }) => {
    const navigation = useNavigation()
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => { }}>
                <Octicons name="share" size={24} color="black" />
            </TouchableOpacity>
        </View >
    )
}

export default SpecificBlogHeaderRight