import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateuserinfo } from '../../../api/user.api'
import { loginSuccess } from '../../../redux/userSlice'
import { ICON } from '../../../constants/SVG/ICON'
import COLORS from '../../../constants/COLORS'
import { Modal, StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Alert } from 'react-native'
import SIZE from '../../../constants/SIZE'
import THEME from '../../../constants/THEME'
import GENDER from '../../../constants/GENDER'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
<<<<<<< Updated upstream
=======
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { ERROR_MESSAGE } from '../../../constants/ERRORMessage'
import { useIntl } from 'react-intl'
>>>>>>> Stashed changes

const GenderModal = ({ visible, setVisible }) => {
    const { formatMessage } = useIntl()
    const [updatedGender, setUpdatedGender] = useState()
    const dispatch = useDispatch()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { currentUser } = useSelector(state => state.user)
    const { _id, name, personalStatus, age, preferedTheme, preferedLanguage, gender, avator, birthday, hpNum } = currentUser
    useEffect(() => {
        setUpdatedGender(gender)
    }, [gender])
    const handleUpdate = async () => {
        let handledItems = { gender: updatedGender }
        await updateuserinfo(currentUser._id, handledItems)
            .then((res) => {
                if (res.status !== false) {
                    dispatch(loginSuccess(res))
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
                                {formatMessage({ id: 'app.profile.gender' })}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    gender !== updatedGender && handleUpdate()
                                }}
                                style={{ backgroundColor: gender !== updatedGender ? COLORS.primary : currentTheme.contentColor, borderRadius: SIZE.CardBorderRadius, padding: SIZE.NormalMargin }}
                            >
                                <Text style={{ fontSize: SIZE.NormalTitle, color: gender !== updatedGender ? COLORS.white : COLORS.gray, fontWeight: 'bold', }}>{formatMessage({ id: 'app.profile.update' })}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: SIZE.LargerMargin }}>
                        <View style={{ flexDirection: 'row', marginBottom: SIZE.NormalMargin }}>
                            <TouchableOpacity
                                onPress={() => setUpdatedGender(GENDER.male)}
                                style={{ width: 100, flexDirection: 'row', gap: SIZE.NormalMargin, justifyContent: 'center', alignItems: 'center', backgroundColor: updatedGender === GENDER.male ? COLORS.primary : currentTheme.contentColor, padding: SIZE.NormalMargin, borderTopLeftRadius: SIZE.CardBorderRadius, borderBottomLeftRadius: SIZE.CardBorderRadius, }}
                            >
                                {ICON.male(24, updatedGender === GENDER.male ? COLORS.white : COLORS.primary)}
                                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: updatedGender === GENDER.male ? COLORS.white : COLORS.primary }}>
                                {formatMessage({ id: 'app.profile.gender.male' })}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setUpdatedGender(GENDER.female)}
                                style={{ width: 100, flexDirection: 'row', gap: SIZE.NormalMargin, justifyContent: 'center', alignItems: 'center', backgroundColor: updatedGender === GENDER.female ? COLORS.pink : currentTheme.contentColor, padding: SIZE.NormalMargin, borderTopRightRadius: SIZE.CardBorderRadius, borderBottomRightRadius: SIZE.CardBorderRadius, }}>
                                {ICON.female(24, updatedGender !== GENDER.female ? COLORS.pink : COLORS.white)}
                                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: updatedGender !== GENDER.female ? COLORS.pink : COLORS.white }}>
                                {formatMessage({ id: 'app.profile.gender.female' })}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </Modal >
    )
}

export default GenderModal

const styles = StyleSheet.create({})