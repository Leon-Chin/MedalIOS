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

const ModeModal = ({ visible, setVisible }) => {
    const [theme, setTheme] = useState()
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user)
    const { _id, name, personalStatus, age, preferedTheme, preferedLanguage, gender, avator, birthday, hpNum } = currentUser
    useEffect(() => {
        setTheme(preferedTheme)
    }, [preferedTheme])
    const handleUpdate = async () => {
        let handledItems = { preferedTheme: theme }
        await updateuserinfo(currentUser._id, handledItems)
            .then((res) => {
                if (res.status !== false) {
                    console.log(res.preferedTheme);
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
                                    主题
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    preferedTheme !== theme && handleUpdate()
                                }}
                                style={{ backgroundColor: preferedTheme !== theme ? COLORS.primary : COLORS.backgroundGray, borderRadius: SIZE.CardBorderRadius, padding: SIZE.NormalMargin }}
                            >
                                <Text style={{ fontSize: SIZE.NormalTitle, color: preferedTheme !== theme ? COLORS.white : COLORS.gray, fontWeight: 'bold', }}>更改</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: SIZE.LargerMargin }}>
                        <View style={{ flexDirection: 'row', marginBottom: SIZE.NormalMargin }}>
                            <TouchableOpacity
                                onPress={() => setTheme(THEME.light)}
                                style={{ width: 100, flexDirection: 'row', gap: SIZE.NormalMargin, justifyContent: 'center', alignItems: 'center', backgroundColor: theme === THEME.light ? COLORS.primary : COLORS.backgroundGray, padding: SIZE.NormalMargin, borderTopLeftRadius: SIZE.CardBorderRadius, borderBottomLeftRadius: SIZE.CardBorderRadius, }}
                            >
                                {ICON.light(24, COLORS.white)}
                                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: theme === THEME.light ? COLORS.white : COLORS.gray }}>
                                    Light
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setTheme(THEME.dark)}
                                style={{ width: 100, flexDirection: 'row', gap: SIZE.NormalMargin, justifyContent: 'center', alignItems: 'center', backgroundColor: theme === THEME.dark ? COLORS.primary : COLORS.backgroundGray, padding: SIZE.NormalMargin, borderTopRightRadius: SIZE.CardBorderRadius, borderBottomRightRadius: SIZE.CardBorderRadius, }}>
                                {ICON.dark(24, COLORS.white)}
                                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: theme === THEME.dark ? COLORS.white : COLORS.gray }}>
                                    Dark
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </Modal >
    )
}

export default ModeModal

const styles = StyleSheet.create({})