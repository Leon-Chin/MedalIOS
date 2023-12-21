import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../../../constants/COLORS';
import { useNavigation } from '@react-navigation/native';
import { secToSpecificMin } from '../../../utils/funcs';
import useRecords from '../../../hooks/useRecords';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';
import { ICON } from '../../../constants/SVG/ICON';


const OverallExerciseCard = () => {
    const { navigate } = useNavigation()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { durationSum, calorieSum, tutorialCalorieSum } = useRecords()
    return (
        <TouchableOpacity
            onPress={() => navigate("Statistics")}
            style={{ flex: 1, height: 100, backgroundColor: currentTheme.contentColor, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 8 }}
        >
            <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: currentTheme.fontColor }}>总运动</Text>
                {ICON.right(24, currentTheme.fontColor)}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: currentTheme.fontColor }}>{durationSum ? secToSpecificMin(durationSum) : 0}</Text>
                <Text style={{ fontSize: 16, color: COLORS.commentText }}>min</Text>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <Text style={{ fontSize: 10, color: COLORS.commentText }}>总消耗</Text>
                <Text style={{ fontSize: 10, color: COLORS.commentText }}>{calorieSum ? calorieSum.toFixed(0) : 0}({tutorialCalorieSum ? tutorialCalorieSum.toFixed(0) : 0})</Text>
                <Text style={{ fontSize: 10, color: COLORS.commentText }}>千卡</Text>
            </View>
        </TouchableOpacity>
    )
}

export default OverallExerciseCard