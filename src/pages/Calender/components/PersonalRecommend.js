import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SIZE from '../../../constants/SIZE'
import COLORS from '../../../constants/COLORS'
import { ICON } from '../../../constants/SVG/ICON'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useEffect } from 'react'
import TutorialHorizontal from '../../../components/TutorialHorizontal'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import { getrecommandtutorials } from '../../../api/tutorial.api'
import { useSelector } from 'react-redux'
import { isEmptyObj } from '../../../utils/getDuration'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { ERROR_Alert } from '../../../constants/ERRORMessage'
import { useIntl } from 'react-intl'
import NotFound from '../../../components/NotFound'

const PersonalRecommend = ({ selectDay }) => {
    const { formatMessage } = useIntl()
    const { navigate } = useNavigation()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const [recommandTutorials, setRecommandTutorials] = useState([])
    const { currentUser } = useSelector(state => state.user)
    const getRecommandTutorials = async () => {
        await getrecommandtutorials().then(res => {
            if (res.status !== false) {
                setRecommandTutorials(res)
            } else {
                Toast.show(ERROR_Alert(formatMessage({ id: 'error.errorMsg' })))
            }
        }).catch(err => {
            console.log(err, "2233");
            Toast.show(ERROR_Alert(formatMessage({ id: 'error.errorMsg' })))
        })
    }
    useEffect(() => {
        getRecommandTutorials()
    }, [currentUser])

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
            {recommandTutorials && recommandTutorials.length !== 0 && recommandTutorials.map((item, index) => (
                <TutorialHorizontal key={index} tutorial={item} withCalender={true} selectDay={selectDay} />
            ))}
            {recommandTutorials && recommandTutorials.length === 0 && <View style={{ marginBottom: SIZE.NormalMargin, padding: SIZE.NormalMargin, alignItems: 'center', borderRadius: SIZE.CardBorderRadius, backgroundColor: currentTheme.contentColor }}>
                <NotFound />
                <Text style={{ fontSize: SIZE.NormalTitle, color: currentTheme.fontColor, fontWeight: 'bold' }}>
                    {formatMessage({ id: 'app.calendar.noRecommendations' })}
                </Text>
            </View>}
            {(recommandTutorials.length === 0 && (!currentUser?.personalPrefer || isEmptyObj(currentUser?.personalPrefer))) && (
                <View style={{ marginTop: SIZE.LargerMargin, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30, borderRadius: SIZE.CardBorderRadius, backgroundColor: currentTheme.contentColor }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.commentText }}>{formatMessage({ id: 'app.calendar.recomAlert' })}</Text>
                </View>
            )}
        </>
    )
}

export default PersonalRecommend

const styles = StyleSheet.create({})