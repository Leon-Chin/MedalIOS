import { Alert, Dimensions, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SIZE from '../../../../../constants/SIZE'
import COLORS from '../../../../../constants/COLORS'
import { ICON } from '../../../../../constants/SVG/ICON'
import Percentage from '../../../components/Percentage'
import { useEffect, useState } from 'react'
import { updatecalorietarget, updatedurationtarget } from '../../../../../api/user.api'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../../../../../redux/userSlice'
import useTodayExerciseDuration from '../../../../../hooks/useTodayExerciseDuration'
import { secToMin, secToSpecificMin } from '../../../../../utils/funcs'
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
    const duration = useTodayExerciseDuration()
    const [prevGoal, setPrevGoal] = useState()

    useEffect(() => {
        currentUser?.durationTarget && setPrevGoal(currentUser.durationTarget)
    }, [currentUser])
    const handleSetGoal = async () => {
        if (Goal) {
            const data = {
                durationTarget: parseInt(Goal) * 60
            }
            await updatedurationtarget(data).then(res => {
                if (res && res.status !== false) {
                    console.log(res.durationTarget);
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
                        <Text style={{ fontSize: SIZE.ExtarSmallTitle, color: currentTheme.fontColor, }}>{formatMessage({ id: 'app.statistic.timeTake' })}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={{ fontSize: SIZE.ExtraLargerTitle, fontWeight: 'bold', color: currentTheme.fontColor }}>{secToMin(duration)}</Text>
                        <Text style={{ color: COLORS.commentText, fontSize: SIZE.ExtarSmallTitle }}>{formatMessage({ id: 'app.statistic.durationUnit' })}</Text>
                    </View>
                </View>
                <View style={{ width: 2, backgroundColor: COLORS.commentText, height: SIZE.ExtraLargerTitle }}></View>
                <View style={{ flex: 3, marginLeft: SIZE.NormalMargin }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SIZE.NormalMargin }}>
                        <Text style={{ fontSize: SIZE.ExtarSmallTitle, color: currentTheme.fontColor, }}>{formatMessage({ id: 'app.statistic.goalDuration' })}</Text>
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
                            {prevGoal ? <Text style={{ fontSize: SIZE.ExtraLargerTitle, fontWeight: 'bold', color: COLORS.primary }}>{prevGoal ? secToSpecificMin(prevGoal) : ""}</Text> :
                                <Text style={{ fontSize: SIZE.ExtraLargerTitle, fontWeight: 'bold', color: COLORS.primary }}>--</Text>}
                            <Text style={{ color: COLORS.commentText, fontSize: SIZE.ExtarSmallTitle }}>min</Text>
                        </View>
                        <View style={{ flex: 1, paddingLeft: SIZE.NormalMargin }}>
                            <Percentage current={duration} target={prevGoal} />
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
                            <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', marginBottom: SIZE.NormalMargin, color: COLORS.black }}>{formatMessage({ id: 'app.statistic.goalDuration.Form2' })}</Text>
                            <TextInput
                                keyboardType='number-pad'
                                onChangeText={setGoal}
                                defaultValue={prevGoal ? secToSpecificMin(prevGoal) + "" : ""}
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