import { Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../../../constants/COLORS';
import { ICON } from '../../../constants/SVG/ICON';
import { Modal } from 'react-native';
import SIZE from '../../../constants/SIZE';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import NotificationTabs from '../../../constants/NotificationTabs';
import { setMessages, setNotificationTab, setSystemMsgs, setTodos } from '../../../redux/NotificationSettingSlice';
import { updateNotificationTab } from '../../../api/user.api';
import { useIntl } from 'react-intl';

const TabSettingModel = ({ visible, setVisible }) => {
    const { formatMessage } = useIntl()
    const { systemMsgsTabShow, messagesTabShow, todosTabShow } = useSelector(state => state.notificationTab)
    const dispatch = useDispatch()
    useEffect(() => {
        let selectTab;
        if (!systemMsgsTabShow) {
            selectTab = NotificationTabs[0].name
        }
        if (!messagesTabShow) {
            selectTab = NotificationTabs[1].name
        }
        if (!todosTabShow) {
            selectTab = NotificationTabs[2].name
        }
        if (systemMsgsTabShow && messagesTabShow && todosTabShow) {
            selectTab = "none"
        }
        setSelectTab(selectTab)
    }, [systemMsgsTabShow, messagesTabShow, todosTabShow])
    const [selectTab, setSelectTab] = useState()
    const handleSelectTab = async () => {
        const req = {
            systemMsgsTabShow: true,
            messagesTabShow: true,
            todosTabShow: true,
        }
        switch (selectTab) {
            case NotificationTabs[0].name:
                req.systemMsgsTabShow = false
                break;
            case NotificationTabs[1].name:
                req.messagesTabShow = false
                break;
            case NotificationTabs[2].name:
                req.todosTabShow = false
                break;
            default:
                // Alert.alert("出现异常")
                break;
        }
        console.log(req);
        await updateNotificationTab(req).then(res => {
            console.log("res", res);
            dispatch(setNotificationTab(res));
            setVisible(false)
        })
    }
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
        >
            <SafeAreaView style={{ flex: 1, marginHorizontal: SIZE.NormalMargin, justifyContent: "space-between" }}>
                <View>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SIZE.LargerMargin }}
                        onPress={() => setVisible(false)}
                    >
                        {ICON.left(24, COLORS.black)}
                        <Text style={{ fontSize: SIZE.LargerTitle, color: COLORS.black, fontWeight: 'bold' }}>Exit</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: SIZE.NormalTitle, marginBottom: SIZE.LargerMargin }}>Set one tab you don't want to receive notifications</Text>
                    <View style={{}}>
                        {NotificationTabs.map((item, index) =>
                            <TouchableOpacity
                                key={index}
                                style={{
                                    paddingVertical: SIZE.LargerMargin,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: COLORS.white,
                                    marginBottom: SIZE.NormalMargin,
                                    borderRadius: SIZE.CardBorderRadius,
                                    backgroundColor: selectTab === item.name ? COLORS.commentText : COLORS.backgroundGray
                                }}
                                onPress={() => setSelectTab(item.name)}
                            >
                                <Text style={{
                                    fontSize: SIZE.NormalTitle,
                                    color: selectTab === item.name ? COLORS.white : COLORS.commentText,
                                    fontWeight: 'bold',
                                }}>
                                    {item.value}
                                </Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            style={{
                                paddingVertical: SIZE.LargerMargin,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: COLORS.white,
                                marginBottom: SIZE.NormalMargin,
                                borderRadius: SIZE.CardBorderRadius,
                                backgroundColor: selectTab === "none" ? COLORS.commentText : COLORS.backgroundGray
                            }}
                            onPress={() => setSelectTab("none")}
                        >
                            <Text style={{
                                fontSize: SIZE.NormalTitle,
                                color: selectTab === "none" ? COLORS.white : COLORS.commentText,
                                fontWeight: 'bold',
                            }}>
                                {formatMessage({ id: 'app.news.none' })}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity
                        style={{
                            paddingVertical: SIZE.LargerMargin,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: COLORS.white,
                            marginBottom: SIZE.NormalMargin,
                            borderRadius: SIZE.CardBorderRadius,
                            backgroundColor: COLORS.primary
                        }}
                        onPress={handleSelectTab}>
                        <Text style={{ fontSize: SIZE.NormalTitle, color: COLORS.white, fontWeight: 'bold' }}>{formatMessage({ id: 'app.news.confirm' })}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default TabSettingModel
