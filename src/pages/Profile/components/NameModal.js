import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateuserinfo } from '../../../api/user.api'
import { loginSuccess } from '../../../redux/userSlice'
import { ICON } from '../../../constants/SVG/ICON'
import COLORS from '../../../constants/COLORS'
import { Modal, StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Alert, TextInput } from 'react-native'
import SIZE from '../../../constants/SIZE'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'

const NameModal = ({ visible, setVisible }) => {
    const dispatch = useDispatch()
    const [updatedName, setUpdatedName] = useState()
    const { currentUser } = useSelector(state => state.user)
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { _id, name, personalStatus, age, preferedTheme, preferedLanguage, gender, avator, birthday, hpNum } = currentUser
    useEffect(() => {
        setUpdatedName(name)
    }, [name])
    const handleUpdate = async () => {
        let handledItems = { name: updatedName }
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
                                    账号名
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    updatedName && handleUpdate()
                                }}
                                style={{ backgroundColor: updatedName !== name ? COLORS.primary : COLORS.backgroundGray, borderRadius: SIZE.CardBorderRadius, padding: SIZE.NormalMargin }}
                            >
                                <Text style={{ fontSize: SIZE.NormalTitle, color: updatedName !== name ? COLORS.white : COLORS.gray, fontWeight: 'bold', }}>更改</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TextInput
                            placeholder='更改账号名'
                            placeholderTextColor={COLORS.commentText}
                            onChangeText={setUpdatedName}
                            defaultValue={name}
                            maxLength={16}
                            style={{ padding: SIZE.NormalMargin, fontSize: SIZE.NormalTitle, fontWeight: 'bold', backgroundColor: currentTheme.contentColor, color: currentTheme.fontColor, borderRadius: SIZE.CardBorderRadius, marginBottom: SIZE.NormalMargin, height: 50 }}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </Modal >
    )
}

export default NameModal

const styles = StyleSheet.create({})