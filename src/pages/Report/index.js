import { StyleSheet, Text, View, TextInput, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { createreport } from '../../api/user.api'
import useUserTheme from '../../hooks/useUserTheme'
import APPTHEME from '../../constants/COLORS/APPTHEME'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { ERROR_Alert, INFO_Alert, SUCCESS_Alert } from '../../constants/ERRORMessage'
import COLORS from '../../constants/COLORS'
import { useIntl } from 'react-intl'

const Report = ({ route }) => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { type, target } = route.params
    const [reportReason, setReportReason] = useState()
    const handleReport = async () => {
        reportReason ? await createreport({ type, targetID: target._id, content: reportReason })
            .then(() => {
                Toast.show(SUCCESS_Alert(formatMessage({ id: "Success.thanksForFeedback" })))
                setReportReason('')
            }).catch(err => {
                Toast.show(ERROR_Alert(formatMessage({ id: 'error.errorMsg' })))
            }) : Toast.show(INFO_Alert(formatMessage({ id: "error.plsInputValidInfo" })))
    }
    return (
        <View style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
            <View style={{ flex: 1, marginHorizontal: '3%', marginVertical: '3%', }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: currentTheme.fontColor }}>{formatMessage({ id: 'app.report.reportReason' })}</Text>
                <TextInput
                    placeholder={formatMessage({ id: 'app.report.reportField' })}
                    placeholderTextColor={COLORS.commentText}
                    returnKeyType='send'
                    multiline
                    blurOnSubmit
                    onChangeText={(reportReason) => setReportReason(reportReason)}
                    value={reportReason}
                    style={{ height: 200, backgroundColor: currentTheme.contentColor, padding: 10, borderRadius: 10, color: currentTheme.fontColor }}
                    onSubmitEditing={() => handleReport()}
                />
            </View>
        </View>
    )
}

export default Report

const styles = StyleSheet.create({})