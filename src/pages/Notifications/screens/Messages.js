import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { getunreadedmessage } from '../../../api/user.api';
import { useEffect } from 'react';
import MessageNotification from '../Components/MessageNotification';
import COLORS from '../../../constants/COLORS';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';
import { useIntl } from 'react-intl';

const Messages = () => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const [loading, setLoading] = useState(false);
    const [unreadedMsgs, setUnreadedMsgs] = useState([])
    const getNotice = async () => {
        setLoading(true);
        const unreadedMsgs = await getunreadedmessage()
        setUnreadedMsgs(unreadedMsgs)
        console.log(unreadedMsgs);
        setLoading(false);
    };
    useEffect(() => {
        getNotice();
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
            {unreadedMsgs.length === 0 ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.commentText }}>
                        {formatMessage({id: 'app.news.noNews'})}
                    </Text>
                </View> : <FlatList
                    data={unreadedMsgs}
                    renderItem={({ item, index }) => <MessageNotification message={item} />}
                />
            }

        </View>
    )
}

export default Messages