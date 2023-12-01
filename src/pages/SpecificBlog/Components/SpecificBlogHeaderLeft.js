import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';
import { ICON } from '../../../constants/SVG/ICON';

const SpecificBlogHeaderLeft = ({ blog, user }) => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { goBack, navigate } = useNavigation()
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => goBack()}>
                {ICON.left(24, currentTheme.fontColor)}
            </TouchableOpacity>
            <TouchableOpacity
                // go to personal page
                onPress={() => { navigate('UserPage', { userID: user._id }) }}
                style={{ flexDirection: 'row', alignItems: 'center' }}
            >
                <Avatar source={{ uri: user.avator }} rounded />
                <Text style={{ marginLeft: 6, fontSize: 18, fontWeight: '500', color: currentTheme.fontColor }}>{user.name}</Text>
            </TouchableOpacity>
            <View></View>
        </View>
    )
}

export default SpecificBlogHeaderLeft