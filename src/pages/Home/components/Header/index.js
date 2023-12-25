import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from '@rneui/themed';
import COLORS from '../../../../constants/COLORS';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { checkIsBirthday } from '../../../../utils/checkIsBirthday';
import Notification from './notification'
import { useNavigation } from '@react-navigation/native';
import useUserTheme from '../../../../hooks/useUserTheme';
import APPTHEME from '../../../../constants/COLORS/APPTHEME';
const Header = () => {
    const { currentUser: { avator, name: userName, birthday } } = useSelector(state => state.user)
    const { formatMessage } = useIntl()
    const { navigate } = useNavigation()
    const [isBirthday, setIsBirthday] = useState(checkIsBirthday(birthday))
    useEffect(() => {
        birthday && setIsBirthday(checkIsBirthday(birthday))
    }, [birthday])
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return (
        <View style={styles.header}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigate("Settings")}
            >
                <Avatar
                    size={52}
                    rounded
                    source={{ uri: avator }}
                />
            </TouchableOpacity>
            <View style={styles.title}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: currentTheme.fontColor }}>{isBirthday ? formatMessage({ id: 'happyBirthday' }) : formatMessage({ id: 'hi' })}, <Text style={{ color: COLORS.primary, fontWeight: "800" }}>{userName}</Text>!</Text>
<<<<<<< Updated upstream
                <Text style={{ paddingTop: 4, fontSize: 12, opacity: 0.6, color: currentTheme.commentFontColor }}>欢迎回到Medal~</Text>
=======
                <Text style={{ paddingTop: 4, fontSize: 12, opacity: 0.6, color: currentTheme.commentFontColor }}>{formatMessage({ id: 'welcomeMessage' })}</Text>
>>>>>>> Stashed changes
            </View>
            <Notification />
        </View>
    );
}
const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: { paddingHorizontal: 10, flex: 1, justifyContent: 'center' },
});

export default Header