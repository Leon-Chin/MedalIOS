import { StyleSheet, Text, View, TextInput, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { createreport } from '../../api/user.api'

const Report = ({ route }) => {
    const { type, target } = route.params
    const [reportReason, setReportReason] = useState()
    const handleReport = async () => {
        console.log('diaoyongle ');
        reportReason ? await createreport({ type, targetID: target._id, content: reportReason })
            .then(() => {
                // message.success('We received your report, we will inform you the results later')
                Alert.alert('We received your report, we will inform you the results later')
                setReportReason('')
            }).catch(err => {
                // console.log(err);
                Alert.alert('error happens, failed to report')
            }) : Alert.alert('please write the reason of the report')
    }
    return (
        <View style={{ flex: 1, marginHorizontal: '3%', marginVertical: '3%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Report Reason:</Text>
            <TextInput
                placeholder='Please Enter'
                returnKeyType='send'
                multiline
                blurOnSubmit
                onChangeText={(reportReason) => setReportReason(reportReason)}
                value={reportReason}
                style={{ height: 200, backgroundColor: '#fff', padding: 10, borderRadius: 10 }}
                onSubmitEditing={() => handleReport()}
            />
        </View>
    )
}

export default Report

const styles = StyleSheet.create({})