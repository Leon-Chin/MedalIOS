import { Alert, Dimensions, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SIZE from '../../../../../constants/SIZE'
import COLORS from '../../../../../constants/COLORS'
import { ICON } from '../../../../../constants/SVG/ICON'
import Percentage from '../../../components/Percentage'
import useHealthKit from '../../../../../hooks/useHealthkit'
import { useEffect, useState } from 'react'
import { updatedistancetarget, updatesteptarget } from '../../../../../api/user.api'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../../../../../redux/userSlice'
import useUserTheme from '../../../../../hooks/useUserTheme'
import APPTHEME from '../../../../../constants/COLORS/APPTHEME'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { ERROR_Alert, INFO_Alert } from '../../../../../constants/ERRORMessage'
import { useIntl } from 'react-intl'

const { width } = Dimensions.get('screen')
const HeaderCard = () => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const [ModalGoalVisible, setModalGoalVisible] = useState(false)
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [Goal, setGoal] = useState()
    const { distance } = useHealthKit()
    const [prevGoal, setPrevGoal] = useState()

    useEffect(() => {
        currentUser?.distanceTarget && setPrevGoal(currentUser.distanceTarget)
    }, [currentUser])
    const handleSetGoal = async () => {
        if (Goal) {
            const data = {
                distanceTarget: parseFloat(Goal) * 1000
            }
            await updatedistancetarget(data).then(res => {
                if (res.status !== false) {
                    dispatch(loginSuccess(res))
                    setModalGoalVisible(false)
                } else {
                    Toast.show(ERROR_Alert(formatMessage({ id: 'error.errorMsg' })))
                }
            })
        } else {
            Toast.show(INFO_Alert(formatMessage({ id: "error.plsInputValidInfo" })))
        }
    }
    return (
        <View style={{ backgroundColor: currentTheme.contentColor, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14 }}>
            <View style={{ marginBottom: SIZE.NormalMargin }}>
                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.commentText }}>{formatMessage({ id: 'app.statistic.todayRecord' })}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginRight: SIZE.NormalMargin }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SIZE.NormalMargin }}>
                        <Text style={{ fontSize: SIZE.ExtarSmallTitle, color: currentTheme.fontColor, }}>{formatMessage({ id: 'app.statistic.distCover' })}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={{ fontSize: SIZE.ExtraLargerTitle, fontWeight: 'bold', color: currentTheme.fontColor }}>{(distance / 1000).toFixed(2)}</Text>
                        <Text style={{ color: COLORS.commentText, fontSize: SIZE.ExtarSmallTitle }}>{formatMessage({ id: 'app.statistic.distanceUnit' })}</Text>
                    </View>
                </View>
                <View style={{ width: 2, backgroundColor: COLORS.backgroundGray, height: SIZE.ExtraLargerTitle }}></View>
                <View style={{ flex: 3, marginLeft: SIZE.NormalMargin }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SIZE.NormalMargin }}>
                        <Text style={{ fontSize: SIZE.ExtarSmallTitle, color: currentTheme.fontColor, }}>{formatMessage({ id: 'app.statistic.goalDist' })}</Text>
                        <TouchableOpacity
                            onPress={() => setModalGoalVisible(true)}
                            style={{ flexDirection: "row", gap: 4 }}
                        >
                            <Text style={{ fontSize: SIZE.ExtarSmallTitle, color: COLORS.commentText, }}>{formatMessage({ id: 'app.statistic.updateGoal' })}</Text>
                            {ICON.right(14, COLORS.gray)}
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                            {prevGoal ? <Text style={{ fontSize: SIZE.ExtraLargerTitle, fontWeight: 'bold', color: COLORS.primary }}>{prevGoal ? (prevGoal / 1000).toFixed(2) : ""}</Text> :
                                <Text style={{ fontSize: SIZE.ExtraLargerTitle, fontWeight: 'bold', color: COLORS.primary }}>--</Text>}
                            <Text style={{ color: COLORS.commentText, fontSize: SIZE.ExtarSmallTitle }}>{formatMessage({ id: 'app.statistic.distanceUnit' })}</Text>
                        </View>
                        <View style={{ flex: 1, paddingLeft: SIZE.NormalMargin }}>
                            <Percentage current={distance} target={prevGoal} />
                        </View>
                    </View>
                </View>
            </View>
            <Modal
                visible={ModalGoalVisible}
            >
                <LinearGradient
                    style={{ flex: 1 }}
                    colors={['#f8edf2', "#f2f0f5", '#ebf3f9']}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={{ marginHorizontal: '3%' }}>
                            <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', marginBottom: SIZE.NormalMargin, color: COLORS.black }}>{formatMessage({ id: 'app.statistic.goalDist.Form2' })}</Text>
                            <TextInput
                                keyboardType='decimal-pad'
                                onChangeText={setGoal}
                                defaultValue={prevGoal ? (prevGoal / 1000).toFixed(2) : ""}
                                style={{ padding: SIZE.NormalMargin, backgroundColor: COLORS.white, borderRadius: SIZE.CardBorderRadius, marginBottom: SIZE.NormalMargin, fontSize: SIZE.ExtraLargerTitle, height: 50, fontWeight: 'bold' }}
                            />
                            <TouchableOpacity
                                onPress={handleSetGoal}
                                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: SIZE.NormalMargin }}>
                                <View style={{ width: width * 0.4, flexDirection: 'row', justifyContent: 'center', padding: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadiusForBtn, backgroundColor: COLORS.primary }}>
                                    <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.white }}>{formatMessage({ id: 'app.statistic.confirm' })}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setModalGoalVisible(false)}
                                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                <View style={{ width: width * 0.4, flexDirection: 'row', justifyContent: 'center', padding: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadiusForBtn, backgroundColor: COLORS.gray }}>
                                    <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.white }}>{formatMessage({ id: 'app.statistic.cancel' })}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </LinearGradient>
            </Modal>
        </View>
    )
}

export default HeaderCard

const styles = StyleSheet.create({})