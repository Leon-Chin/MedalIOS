import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import COLORS from '../../../constants/COLORS'
import { ICON } from '../../../constants/SVG/ICON'
import { useNavigation } from '@react-navigation/native';
import useTodayExerciseDuration from '../../../hooks/useTodayExerciseDuration';
import { secToMin, secToSpecificMin } from '../../../utils/funcs';
import useRecordsAnalysis from '../../../hooks/useRecordsAnalysis';
import SIZE from '../../../constants/SIZE';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';

const CALORIE_TYPE = {
    tutorial: "Tutorial Calorie Consumption",
    total: "Calorie Consumption"
}

const UserRecordSum = ({ records }) => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { navigate } = useNavigation()
    const { durationSum, calorieSum, tutorialCalorieSum } = useRecordsAnalysis(records)
    const handleShowDetail = (title, value) => {
        Alert.alert(`${title}: ${value}`)
    }
    return (
        <View style={{ marginBottom: SIZE.NormalMargin, backgroundColor: currentTheme.contentColor, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14 }}>
            {/* title */}
            <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    {ICON.calender(24, COLORS.green)}
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.green }}>运动记录</Text>
                </View>
                <TouchableOpacity onPress={() => navigate('TodaysExercises')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {ICON.right(18, COLORS.gray)}
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: COLORS.commentText, fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>总运动时长</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        {durationSum ? <Text style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>{secToSpecificMin(durationSum)}</Text> :
                            <Text style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>0</Text>}
                        <Text style={{ color: currentTheme.fontColor, fontSize: 14, fontWeight: 'bold' }}>分钟</Text>
                    </View>
                </View>
                <View style={{ width: 10 }}></View>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: COLORS.commentText, fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>总运动消耗</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <TouchableOpacity
                            onPress={() => { handleShowDetail(CALORIE_TYPE.total, calorieSum ? calorieSum : 0) }}
                        >
                            {calorieSum ? <Text style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>{calorieSum}</Text> :
                                <Text style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>0</Text>}
                        </TouchableOpacity>
                        <Text>+</Text>
                        <TouchableOpacity
                            onPress={() => { handleShowDetail(CALORIE_TYPE.tutorial, tutorialCalorieSum ? tutorialCalorieSum : 0) }}
                        >
                            {tutorialCalorieSum ? <Text style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>{tutorialCalorieSum}</Text> :
                                <Text style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>0</Text>}
                        </TouchableOpacity>
                        <Text style={{ color: currentTheme.fontColor, fontSize: 14, fontWeight: 'bold' }}>千卡</Text>
                    </View>
                </View>
            </View>
        </View >
    )
}

export default UserRecordSum

const styles = StyleSheet.create({})