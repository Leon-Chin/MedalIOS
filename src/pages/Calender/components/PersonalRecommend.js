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
import { ERROR_MESSAGE } from '../../../constants/ERRORMessage'

const PersonalRecommend = ({ selectDay }) => {
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
                Toast.show(ERROR_MESSAGE)
            }
        }).catch(err => {
            Toast.show(ERROR_MESSAGE)
        })
    }
    useEffect(() => {
        getRecommandTutorials()
    }, [currentUser])

    return (
        <>
            <View style={{ paddingHorizontal: 20, marginBottom: SIZE.NormalMargin }}>
                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: currentTheme.fontColor }}>个性化推荐</Text>
            </View>
            <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, borderRadius: SIZE.CardBorderRadius, backgroundColor: COLORS.primary, marginBottom: 10, }}
                onPress={() => navigate('Evaluation')}
            >
                <Text style={{ color: COLORS.white }}>参与运动健康评估，更加个性化为您推荐</Text>
                {ICON.right(18, COLORS.white)}
            </TouchableOpacity>
            {recommandTutorials && recommandTutorials.length !== 0 && recommandTutorials.map((item, index) => (
                <TutorialHorizontal key={index} tutorial={item} withCalender={true} selectDay={selectDay} />
            ))}
            {recommandTutorials && recommandTutorials.length === 0 && <View style={{ marginBottom: SIZE.NormalMargin, padding: SIZE.NormalMargin, alignItems: 'center', borderRadius: SIZE.CardBorderRadius, backgroundColor: currentTheme.contentColor }}>
                <Text style={{ fontSize: SIZE.NormalTitle, color: currentTheme.fontColor }}>暂无匹配您的推荐课程</Text>
            </View>}
            {(recommandTutorials.length === 0 && (!currentUser?.personalPrefer || isEmptyObj(currentUser?.personalPrefer))) && (
                <View style={{ marginTop: SIZE.LargerMargin, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30, borderRadius: SIZE.CardBorderRadius, backgroundColor: currentTheme.contentColor }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.commentText }}>请做一下喜好问卷，来为您个性化推荐适合您喜好的教程</Text>
                </View>
            )}
        </>
    )
}

export default PersonalRecommend

const styles = StyleSheet.create({})