import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SystemNotifications from './screens/SystemNotifications'
import Messages from './screens/Messages'
import TodoExercise from './screens/TodoExercise'
import { useState } from 'react';
import { getunreadedmessage } from '../../api/user.api'
import { getnotifications } from '../../api/notification.api'
import useUncompletedTutorials from '../../hooks/useUncompletedTutorials';
import { TouchableOpacity } from 'react-native';
import COLORS from '../../constants/COLORS';
import { ICON } from '../../constants/SVG/ICON';
import TabSettingModel from './Components/TabSettingModel';
import { useSelector } from 'react-redux';
import useUserTheme from '../../hooks/useUserTheme';
import APPTHEME from '../../constants/COLORS/APPTHEME';
import { useIntl } from 'react-intl';

const Tab = createMaterialTopTabNavigator();

const Notifications = () => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { systemMsgsTabShow, messagesTabShow, todosTabShow } = useSelector(state => state.notificationTab)
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadedMsgs, setUnreadedMsgs] = useState([])
    const todo = useUncompletedTutorials()

    const [modalVisible, setModalVisible] = useState(false);

    const getNotice = async () => {
        setLoading(true);
        const unreadedMsgs = await getunreadedmessage()
        setUnreadedMsgs(unreadedMsgs)
        const notifications = await getnotifications()
        setNotifications(notifications)
        setLoading(false);
    };

    useEffect(() => {
        getNotice();
        const interval = setInterval(getNotice, 3000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    useEffect(() => {
    }, [notifications, unreadedMsgs, todo]);

    return (
        <>
            <Tab.Navigator
                initialRouteName="Todos"
                screenOptions={{
                    tabBarStyle: { backgroundColor: currentTheme.contentColor },
                    tabBarLabelStyle: { fontSize: 14, color: currentTheme.fontColor, fontWeight: 'bold', textTransform: 'none' },
                }}
            >
                {systemMsgsTabShow && <Tab.Screen
                    name="System Notifications"
                    component={SystemNotifications}
                    initialParams={{ notifications: notifications }}
                    options={{ tabBarLabel: `${formatMessage({ id: 'app.news.tab.system' })} ${notifications && notifications.length === 0 ? '' : '(' + notifications.length + ')'}` }}
                />}
                {messagesTabShow && <Tab.Screen
                    name="Messages"
                    component={Messages}
                    initialParams={{ unreadedMsgs: unreadedMsgs }}
                    options={{ tabBarLabel: `${formatMessage({ id: 'app.news.tab.pm' })} ${unreadedMsgs && unreadedMsgs.length === 0 ? '' : '(' + unreadedMsgs.length + ')'}` }}
                />}
                {todosTabShow && <Tab.Screen
                    name="Todos"
                    component={TodoExercise}
                    options={{ tabBarLabel: `${formatMessage({ id: 'app.news.tab.todos' })} ${todo && todo.length === 0 ? '' : '(' + todo.length + ')'}` }}
                />}
            </Tab.Navigator>
            <TouchableOpacity
                onPress={() => { setModalVisible(true) }}
                style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', position: 'absolute', bottom: 60, right: 20, width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.primary }}>
                {ICON.more(30, COLORS.white)}
            </TouchableOpacity>
            <TabSettingModel visible={modalVisible} setVisible={setModalVisible} />
        </>

    )
}

export default Notifications