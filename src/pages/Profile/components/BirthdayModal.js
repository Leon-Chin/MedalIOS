import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateuserinfo } from '../../../api/user.api'
import { loginSuccess } from '../../../redux/userSlice'
import { ICON } from '../../../constants/SVG/ICON'
import COLORS from '../../../constants/COLORS'
import { Modal, StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Alert, TextInput } from 'react-native'
import SIZE from '../../../constants/SIZE'
import { DatePickerIOSBase } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { DatePickerIOSComponent } from 'react-native'
import { checkTwoDaysIsEqual } from '../../../utils/checkIsToday'

const BirthdayModal = ({ visible, setVisible }) => {
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
                    Alert.alert("出现异常请稍后重试")
                }
            })
            .catch(error => {
                Alert.alert("出现异常请稍后重试")
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
                                    生日
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
                                <Text style={{ fontSize: SIZE.NormalTitle, color: !checkTwoDaysIsEqual(new Date(updatedBirthday), new Date(birthday)) ? COLORS.white : COLORS.gray, fontWeight: 'bold', }}>更改</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: SIZE.LargerMargin }}>
                        {/* <DatePickerIOSBase /> */}
                        <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.black }}>生日日期</Text>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={updatedBirthday}
                            mode="date"
                            is24Hour={true}
                            display="default"
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