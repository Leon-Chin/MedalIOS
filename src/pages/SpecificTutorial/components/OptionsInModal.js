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
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { ERROR_Alert, INFO_Alert, SUCCESS_Alert } from '../../../constants/ERRORMessage'
import { useIntl } from 'react-intl'

const OptionsInModal = ({ handleModelClose, tutorial }) => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { cover, level, colorie, brief, name, duration, _id } = tutorial
    const { userSelectDay } = useSelector(state => state.calendar)
    const isExit = useCheckFavorTutorialIsExist(_id)
    const dispatch = useDispatch()

    const isTodayHasAlr = useIsTutorialHasAlr(_id)// 暂时只做今天的 todo

    const handleAddToCalendar = async () => {
        if (isTodayHasAlr) {
            Toast.show(INFO_Alert(formatMessage({ id: 'info.tut.added' })))
        } else {
            const newSession = {
                date: new Date(userSelectDay),
                tutorial: _id,
            }
            await createsession(newSession).then(res => {
                if (res && res.status !== false) {
                    dispatch(loginSuccess(res.user))
                    dispatch(setSessions(res.updatedSessions))
                    handleModelClose
                    Toast.show(SUCCESS_Alert(formatMessage({ id: "success.alreadyAdd" })))
                } else {
                    Toast.show(ERROR_Alert(formatMessage({ id: 'error.errorMsg' })))
                }
            })
        }
    }
    const handleAddTutorialTofavor = async () => {
        if (isExit) {
            Toast.show(ERROR_Alert(formatMessage({ id: 'error.tut.favoured' })))
        } else {
            await addtutorialtofavor(_id).then(res => {
                if (res && res.status !== false) {
                    dispatch(loginSuccess(res))
                    Toast.show(SUCCESS_Alert(formatMessage({ id: "success.favorite" })))
                } else {
                    Toast.show(ERROR_Alert(formatMessage({ id: 'error.errorMsg' })))
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
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: currentTheme.fontColor }}>{formatMessage({ id: 'app.exercises.addFav' })}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleAddToCalendar}
                style={{ height: 50, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            >
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: currentTheme.fontColor }}>{formatMessage({ id: 'app.exercises.addTodoPt1' })}{formatTimeToChinese(userSelectDay)}{formatMessage({ id: 'app.exercises.addTodoPt2' })}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleModelClose}
                style={{ height: 50, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            >
                <Text style={{ fontSize: 16, color: currentTheme.fontColor }}>{formatMessage({ id: 'app.exercises.cancel' })}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default OptionsInModal

const styles = StyleSheet.create({})