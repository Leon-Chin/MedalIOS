import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { formatTimeToChinese } from '../../../utils/formatTime'
import { useDispatch, useSelector } from 'react-redux'
import useCheckFavorTutorialIsExist from '../../../hooks/useCheckFavorTutorialIsExist'
import useIsTutorialHasAlr from '../../../hooks/useIsTutorialHasAlr'
import { createsession } from '../../../api/session.api'
import { loginSuccess } from '../../../redux/userSlice'
import { setSessions } from '../../../redux/SessionSlice'
import { addtutorialtofavor } from '../../../api/tutorial.api'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'

const OptionsInModal = ({ handleModelClose, tutorial }) => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { cover, level, colorie, brief, name, duration, _id } = tutorial
    const { userSelectDay } = useSelector(state => state.calendar)
    const isExit = useCheckFavorTutorialIsExist(_id)
    const dispatch = useDispatch()

    const isTodayHasAlr = useIsTutorialHasAlr(_id)// 暂时只做今天的 todo

    const handleAddToCalendar = async () => {
        if (isTodayHasAlr) {
            Alert.alert("今日已有这个训练了")
        } else {
            const newSession = {
                date: new Date(userSelectDay),
                tutorial: _id,
            }
            await createsession(newSession).then(res => {
                if (res.status === false) {
                    Alert.alert("出现异常, 请稍后再试")
                } else {
                    dispatch(loginSuccess(res.user))
                    dispatch(setSessions(res.updatedSessions))
                    handleModelClose
                    Alert.alert('添加成功')
                }
            })
        }
    }
    const handleAddTutorialTofavor = async () => {
        if (isExit) {
            Alert.alert("你已收藏教程")
        } else {
            await addtutorialtofavor(_id).then(res => {
                if (res.status === false) {
                    Alert.alert("出现异常，请稍后再试")
                } else {
                    dispatch(loginSuccess(res))
                    Alert.alert('收藏成功')
                }
            })
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                onPress={handleAddTutorialTofavor}
                style={{ height: 50, marginTop: 10, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            >
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: currentTheme.fontColor }}>收藏</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleAddToCalendar}
                style={{ height: 50, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            >
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: currentTheme.fontColor }}>添加到{formatTimeToChinese(userSelectDay)}待练</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleModelClose}
                style={{ height: 50, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            >
                <Text style={{ fontSize: 16, color: currentTheme.fontColor }}>取消</Text>
            </TouchableOpacity>
        </View>
    )
}

export default OptionsInModal

const styles = StyleSheet.create({})