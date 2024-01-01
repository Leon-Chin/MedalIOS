import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../constants/COLORS'
import { useIntl } from 'react-intl'

const NothingMore = () => {
    const { formatMessage } = useIntl()
    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ color: COLORS.commentText }}>{formatMessage({ id: 'app.profile.noMore' })}</Text>
            </View>
            <View style={{ height: 70 }}></View>
        </>
    )
}

export default NothingMore