import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@rneui/themed';
import COLORS from '../../../../constants/COLORS';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { checkIsBirthday } from '../../../../utils/checkIsBirthday';
import Notification from './notification'
const Header = () => {
    const { currentUser: { avator, name: userName, birthday } } = useSelector(state => state.user)
    const { formatMessage } = useIntl()
    const [isBirthday] = useState(checkIsBirthday(birthday))
    return (
        <View style={styles.header}>
            <Avatar
                size={52}
                rounded
                source={{ uri: avator }}
            />
            <View style={styles.title}>
                <Text style={styles.bigTitle}>{isBirthday ? formatMessage({ id: 'happyBirthday' }) : formatMessage({ id: 'hi' })}, <Text style={{ color: COLORS.primary, fontWeight: "800" }}>{userName}</Text>!</Text>
                <Text style={styles.smallTitle}>欢迎回到Medal~</Text>
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
    bigTitle: { fontSize: 20, fontWeight: '700' },
    smallTitle: { paddingTop: 4, fontSize: 12, opacity: 0.6 },
});

export default Header