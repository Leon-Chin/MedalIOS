import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SIZE from '../../../constants/SIZE'
import COLORS from '../../../constants/COLORS'
import { ICON } from '../../../constants/SVG/ICON'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useEffect } from 'react'
import { getalltutorial } from '../../../api/user.api'
import TutorialHorizontal from '../../../components/TutorialHorizontal'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'

const PersonalRecommend = ({ selectDay }) => {
    const { navigate } = useNavigation()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const [recommandTutorials, setRecommandTutorials] = useState()
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
                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: currentTheme.fontColor }}>个性化推荐</Text>
            </View>
            <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, borderRadius: SIZE.CardBorderRadius, backgroundColor: COLORS.primary, marginBottom: 10, }}
                onPress={() => navigate('Evaluation')}
            >
                <Text style={{ color: COLORS.white }}>参与运动健康评估，更加个性化为您推荐</Text>
                {ICON.right(18, COLORS.white)}
            </TouchableOpacity>
            {recommandTutorials && recommandTutorials.map((item, index) => (
                <TutorialHorizontal key={index} tutorial={item} withCalender={true} selectDay={selectDay} />
            ))}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ color: COLORS.commentText }}>--没有更多了--</Text>
            </View>
            <View style={{ height: 70 }}></View>
        </>
    )
}

export default PersonalRecommend

const styles = StyleSheet.create({})