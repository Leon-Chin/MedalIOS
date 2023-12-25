import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SIZE from '../../../constants/SIZE'
import NoTutorialToday from './NoTutorialToday'
import COLORS from '../../../constants/COLORS'
import { ICON } from '../../../constants/SVG/ICON'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useEffect } from 'react'
import { getalltutorial } from '../../../api/user.api'
import TutorialHorizontal from '../../../components/TutorialHorizontal'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
<<<<<<< Updated upstream
=======
import { getrecommandtutorials } from '../../../api/tutorial.api'
import { useSelector } from 'react-redux'
import { isEmptyObj } from '../../../utils/getDuration'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { ERROR_MESSAGE } from '../../../constants/ERRORMessage'
import { useIntl } from 'react-intl'
>>>>>>> Stashed changes

const PersonalRecommend = ({ selectDay }) => {
    const { navigate } = useNavigation()
    const [recommandTutorials, setRecommandTutorials] = useState()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
<<<<<<< Updated upstream
=======
    const [recommandTutorials, setRecommandTutorials] = useState([])
    const { currentUser } = useSelector(state => state.user)
    const { formatMessage } = useIntl()
>>>>>>> Stashed changes
    const getRecommandTutorials = async () => {
        await getalltutorial().then(res => {
            if (res.status !== false) {
                setRecommandTutorials(res)
            } else {
                Alert.alert("出现异常请稍后重试")
            }
        }).catch(err => {
            Alert.alert("出现异常请稍后重试")
        })
    }
    useEffect(() => {
        getRecommandTutorials()
    }, [])

    return (
        <>
            <View style={{ paddingHorizontal: 20, marginBottom: SIZE.NormalMargin }}>
                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: currentTheme.fontColor }}>{formatMessage({ id: 'app.calendar.personalRecommendation' })}</Text>
            </View>
            <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, borderRadius: SIZE.CardBorderRadius, backgroundColor: COLORS.primary, marginBottom: 10, }}
                onPress={() => navigate('Evaluation')}
            >
                <Text style={{ color: COLORS.white }}>{formatMessage({ id: 'app.calendar.fitnessAssessmentBtn' })}</Text>
                {ICON.right(18, COLORS.white)}
            </TouchableOpacity>
            {recommandTutorials && recommandTutorials.map((item, index) => (
                <TutorialHorizontal key={index} tutorial={item} withCalender={true} selectDay={selectDay} />
            ))}
<<<<<<< Updated upstream
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ color: COLORS.commentText }}>--没有更多了--</Text>
            </View>
            <View style={{ height: 70 }}></View>
=======
            {recommandTutorials && recommandTutorials.length === 0 && <View style={{ marginBottom: SIZE.NormalMargin, padding: SIZE.NormalMargin, alignItems: 'center', borderRadius: SIZE.CardBorderRadius, backgroundColor: currentTheme.contentColor }}>
                <Text style={{ fontSize: SIZE.NormalTitle, color: currentTheme.fontColor }}>{formatMessage({ id: 'app.calendar.noRecommendations' })}</Text>
            </View>}
            {(recommandTutorials.length === 0 && (!currentUser?.personalPrefer || isEmptyObj(currentUser?.personalPrefer))) && (
                <View style={{ marginTop: SIZE.LargerMargin, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30, borderRadius: SIZE.CardBorderRadius, backgroundColor: currentTheme.contentColor }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.commentText }}>{formatMessage({ id: 'app.calendar.recomAlert' })}</Text>
                </View>
            )}
>>>>>>> Stashed changes
        </>
    )
}

export default PersonalRecommend

const styles = StyleSheet.create({})