import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateuserinfo } from '../../../api/user.api'
import { loginSuccess } from '../../../redux/userSlice'
import { ICON } from '../../../constants/SVG/ICON'
import COLORS from '../../../constants/COLORS'
import { Modal, StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Alert, TextInput } from 'react-native'
import SIZE from '../../../constants/SIZE'
import DateTimePicker from '@react-native-community/datetimepicker';
import { checkTwoDaysIsEqual } from '../../../utils/checkIsToday'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { ERROR_Alert } from '../../../constants/ERRORMessage'
import { useIntl } from 'react-intl'
import useUserLocale from '../../../hooks/useUserLocale'

const BirthdayModal = ({ visible, setVisible }) => {
    const { formatMessage } = useIntl()
    const userLocale = useUserLocale()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const dispatch = useDispatch()
    const [updatedBirthday, setUpdatedBirthday] = useState()
    const { currentUser } = useSelector(state => state.user)
    const { _id, name, personalStatus, age, preferedTheme, preferedLanguage, gender, avator, birthday, hpNum } = currentUser
    useEffect(() => {
        setUpdatedBirthday(new Date(birthday))
    }, [birthday])
    const handleUpdate = async () => {
        let handledItems = { birthday: updatedBirthday }
        await updateuserinfo(currentUser._id, handledItems)
            .then((res) => {
                if (res.status !== false) {
                    dispatch(loginSuccess(res))
                    setVisible(false)
                } else {
                    Toast.show(ERROR_Alert(formatMessage({ id: 'error.errorMsg' })))
                }
            })
            .catch(error => {
                Toast.show(ERROR_Alert(formatMessage({ id: 'error.errorMsg' })))
            })
    }
    const handleChangeDay = (e, selectedDate) => {
        setUpdatedBirthday(new Date(selectedDate))
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
                                    {formatMessage({ id: 'app.profile.birthday' })}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    !checkTwoDaysIsEqual(new Date(updatedBirthday), new Date(birthday)) && handleUpdate()
                                }}
                                style={{ backgroundColor: !checkTwoDaysIsEqual(new Date(updatedBirthday), new Date(birthday)) ? COLORS.primary : COLORS.backgroundGray, borderRadius: SIZE.CardBorderRadius, padding: SIZE.NormalMargin }}
                            >
                                <Text style={{ fontSize: SIZE.NormalTitle, color: !checkTwoDaysIsEqual(new Date(updatedBirthday), new Date(birthday)) ? COLORS.white : COLORS.gray, fontWeight: 'bold', }}>{formatMessage({ id: 'app.profile.update' })}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: SIZE.LargerMargin }}>
                        <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: currentTheme.fontColor }}>{formatMessage({ id: 'app.profile.birthdate' })}</Text>
                        <DateTimePicker
                            themeVariant={theme}
                            testID="dateTimePicker"
                            value={updatedBirthday}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            locale={userLocale === "zh" && 'zh_CN'}
                            onChange={handleChangeDay}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </Modal >
    )
}

export default BirthdayModal

const styles = StyleSheet.create({})