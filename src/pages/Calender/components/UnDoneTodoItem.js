import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import SIZE from '../../../constants/SIZE'
import COLORS from '../../../constants/COLORS'
import { ICON } from '../../../constants/SVG/ICON'
import { deletesession } from '../../../api/session.api'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../../redux/userSlice'
import { setSessions } from '../../../redux/SessionSlice'

const UnDoneTodoItem = ({ tutorial }) => {
    const dispatch = useDispatch()
    const { navigate } = useNavigation()
    const handleDelete = async () => {
        await deletesession(tutorial.sessionID).then(res => {
            if (res.status !== false) {
                const { user, updatedSessions } = res
                dispatch(loginSuccess(user))
                dispatch(setSessions(updatedSessions))
            }
        })
    }
    return (
        <TouchableOpacity
            onPress={() => navigate("SpecificTutorial", { tutorial })}
            style={{ marginBottom: SIZE.NormalMargin, padding: 10, flexDirection: 'row', gap: 10, borderRadius: SIZE.CardBorderRadius, backgroundColor: COLORS.white }}
        >
            <View style={{ height: '100%', width: 6, borderRadius: 3, backgroundColor: COLORS.primary }}></View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={{ fontSize: SIZE.NormalTitle, marginBottom: SIZE.LittleMargin }}>{tutorial.name}</Text>
                    <Text numberOfLines={1} style={{ fontSize: 12, color: COLORS.commentText }}>{tutorial.brief} </Text>
                </View>
                <TouchableOpacity
                    onPress={handleDelete}
                >
                    {ICON.delete(22, COLORS.gray)}
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default UnDoneTodoItem

const styles = StyleSheet.create({})