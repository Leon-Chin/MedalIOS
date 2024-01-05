import { useState } from 'react'
import { createfeedback } from '../../../api/user.api'
import { ICON } from '../../../constants/SVG/ICON'
import COLORS from '../../../constants/COLORS'
import { Modal, StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Alert, TextInput } from 'react-native'
import SIZE from '../../../constants/SIZE'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { ERROR_MESSAGE, ThanksForFeedback_MESSAGE } from '../../../constants/ERRORMessage'
import { useIntl } from 'react-intl'

const FeedbackModal = ({ visible, setVisible }) => {
    const { formatMessage } = useIntl()
    const [feedbackContent, setFeedbackContent] = useState()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const handleUpdate = async () => {
        let handledItems = { content: feedbackContent }
        await createfeedback(handledItems)
            .then((res) => {
                console.log("res", res);
                if (res.status !== false) {
                    Toast.show(ThanksForFeedback_MESSAGE)
                    setVisible(false)
                } else {
                    Toast.show(ERROR_MESSAGE)
                }
            })
            .catch(error => {
                Toast.show(ERROR_MESSAGE)
            })
    }
    return (
        <Modal
            visible={visible}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
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
                                    {formatMessage({ id: 'app.profile.feedback' })}
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
                                <Text style={{ fontSize: SIZE.NormalTitle, color: feedbackContent ? COLORS.white : COLORS.gray, fontWeight: 'bold', }}>{formatMessage({ id: 'app.profile.send' })}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TextInput
                            placeholder={formatMessage({ id: 'app.profile.feedbackAlert' })}
                            placeholderTextColor={COLORS.commentText}
                            multiline={true}
                            onChangeText={setFeedbackContent}
                            style={{ borderRadius: SIZE.CardBorderRadius, marginBottom: SIZE.NormalMargin, color: currentTheme.fontColor, height: 130 }}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </Modal >
    )
}

export default FeedbackModal

const styles = StyleSheet.create({})