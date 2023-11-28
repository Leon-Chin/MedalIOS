import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createfeedback, updateuserinfo } from '../../../api/user.api'
import { loginSuccess } from '../../../redux/userSlice'
import { ICON } from '../../../constants/SVG/ICON'
import COLORS from '../../../constants/COLORS'
import { Modal, StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Alert, TextInput } from 'react-native'
import SIZE from '../../../constants/SIZE'

const FeedbackModal = ({ visible, setVisible }) => {
    const [feedbackContent, setFeedbackContent] = useState()
    const handleUpdate = async () => {
        let handledItems = { content: feedbackContent }
        await createfeedback(handledItems)
            .then((res) => {
                console.log("res", res);
                if (res.status !== false) {
                    Alert.alert("感谢您的反馈")
                    setVisible(false)
                } else {
                    Alert.alert("出现异常请稍后重试")
                }
            })
            .catch(error => {
                Alert.alert("出现异常请稍后重试")
            })
    }
    return (
        <Modal
            visible={visible}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ marginHorizontal: '3%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SIZE.NormalMargin, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SIZE.NormalMargin }}>
                            <TouchableOpacity
                                onPress={() => { setVisible(false) }}
                            >
                                {ICON.left(28, COLORS.primary)}
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', color: COLORS.primary }}>
                                    反馈
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    feedbackContent && handleUpdate()
                                }}
                                style={{ backgroundColor: feedbackContent ? COLORS.primary : COLORS.backgroundGray, borderRadius: SIZE.CardBorderRadius, padding: SIZE.NormalMargin }}
                            >
                                <Text style={{ fontSize: SIZE.NormalTitle, color: feedbackContent ? COLORS.white : COLORS.gray, fontWeight: 'bold', }}>发送</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TextInput
                            placeholder='有什么问题反馈给我们让社区更美好'
                            multiline={true}
                            onChangeText={setFeedbackContent}
                            style={{ borderRadius: SIZE.CardBorderRadius, marginBottom: SIZE.NormalMargin, height: 130 }}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </Modal >
    )
}

export default FeedbackModal

const styles = StyleSheet.create({})