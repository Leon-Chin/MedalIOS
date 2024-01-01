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
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import useUserLocale from '../../../hooks/useUserLocale'

const UnDoneTodoItem = ({ tutorial }) => {
    const locale = useUserLocale()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
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
            style={{ marginBottom: SIZE.NormalMargin, padding: 10, flexDirection: 'row', gap: 10, borderRadius: SIZE.CardBorderRadius, backgroundColor: currentTheme.contentColor }}
        >
            <View style={{ height: '100%', width: 6, borderRadius: 3, backgroundColor: COLORS.primary }}></View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    {!tutorial?.zh_name ? <Text numberOfLines={1} style={{ fontSize: SIZE.NormalTitle, marginBottom: SIZE.LittleMargin, color: currentTheme.fontColor }}>
                        {tutorial.name}
                    </Text> :
                        <Text numberOfLines={1} style={{ fontSize: SIZE.NormalTitle, marginBottom: SIZE.LittleMargin, color: currentTheme.fontColor }}>
                            {locale === "en" ? tutorial.name : tutorial.zh_name}
                        </Text>}
                    {tutorial?.zh_brief ? <Text numberOfLines={1} style={{ fontSize: 12, color: COLORS.commentText }}>
                        {locale === "en" ? tutorial?.brief : tutorial?.zh_brief}
                    </Text> :
                        <Text numberOfLines={1} style={{ fontSize: 12, color: COLORS.commentText }}>{tutorial.brief} </Text>}
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