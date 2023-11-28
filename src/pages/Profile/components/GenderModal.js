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

const GenderModal = ({ visible, setVisible }) => {
    const [updatedGender, setUpdatedGender] = useState()
    const dispatch = useDispatch()
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
            <SafeAreaView style={{ flex: 1 }}>
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
                                    性别
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    gender !== updatedGender && handleUpdate()
                                }}
                                style={{ backgroundColor: gender !== updatedGender ? COLORS.primary : COLORS.backgroundGray, borderRadius: SIZE.CardBorderRadius, padding: SIZE.NormalMargin }}
                            >
                                <Text style={{ fontSize: SIZE.NormalTitle, color: gender !== updatedGender ? COLORS.white : COLORS.gray, fontWeight: 'bold', }}>更改</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: SIZE.LargerMargin }}>
                        <View style={{ flexDirection: 'row', marginBottom: SIZE.NormalMargin }}>
                            <TouchableOpacity
                                onPress={() => setUpdatedGender(GENDER.male)}
                                style={{ width: 100, flexDirection: 'row', gap: SIZE.NormalMargin, justifyContent: 'center', alignItems: 'center', backgroundColor: updatedGender === GENDER.male ? COLORS.primary : COLORS.backgroundGray, padding: SIZE.NormalMargin, borderTopLeftRadius: SIZE.CardBorderRadius, borderBottomLeftRadius: SIZE.CardBorderRadius, }}
                            >
                                {ICON.male(24, updatedGender === GENDER.male ? COLORS.white : COLORS.primary)}
                                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: updatedGender === GENDER.male ? COLORS.white : COLORS.primary }}>
                                    Male
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setUpdatedGender(GENDER.female)}
                                style={{ width: 100, flexDirection: 'row', gap: SIZE.NormalMargin, justifyContent: 'center', alignItems: 'center', backgroundColor: updatedGender === GENDER.female ? COLORS.pink : COLORS.backgroundGray, padding: SIZE.NormalMargin, borderTopRightRadius: SIZE.CardBorderRadius, borderBottomRightRadius: SIZE.CardBorderRadius, }}>
                                {ICON.female(24, updatedGender !== GENDER.female ? COLORS.pink : COLORS.white)}
                                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: updatedGender !== GENDER.female ? COLORS.pink : COLORS.white }}>
                                    Female
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