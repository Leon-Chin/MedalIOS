import { Alert, Text, TouchableOpacity, View } from 'react-native'
import COLORS from '../../../constants/COLORS'
import { ICON } from '../../../constants/SVG/ICON'
import { useNavigation } from '@react-navigation/native';
import useTodayExerciseDuration from '../../../hooks/useTodayExerciseDuration';
import { secToMin } from '../../../utils/funcs';
import useRecord from '../../../hooks/useRecord';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';
import { useIntl } from 'react-intl';

const CALORIE_TYPE = {
    tutorial: "Tutorial Calorie Consumption",
    total: "Calorie Consumption"
}

const TodayRecord = () => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { navigate } = useNavigation()
    const { todayRecord } = useRecord()
    const duration = useTodayExerciseDuration()
    const handleShowDetail = (title, value) => {
        Alert.alert(`${title}: ${value}`)
    }
    return (
        <View style={{ marginHorizontal: '3%', marginVertical: 10, backgroundColor: currentTheme.contentColor, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14 }}>
            {/* title */}
            <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    {ICON.calender(24, COLORS.green)}
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.green }}>{formatMessage({ id: 'app.statistic.todaySession' })}</Text>
                </View>
                <TouchableOpacity onPress={() => navigate('TodaysExercises')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {ICON.right(18, COLORS.gray)}
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                <Text style={{ color: COLORS.commentText, fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>{formatMessage({ id: 'app.statistic.workoutDuration' })}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        {duration ? <Text style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>{secToMin(duration)}</Text> :
                            <Text style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>0</Text>}
                        <Text style={{ color: currentTheme.fontColor, fontSize: 14, fontWeight: 'bold' }}>{formatMessage({ id: 'app.statistic.durationUnit' })}</Text>
                    </View>
                </View>
                <View style={{ width: 10 }}></View>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: COLORS.commentText, fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>{formatMessage({ id: 'app.statistic.workoutConsumption' })}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <TouchableOpacity
                            onPress={() => { handleShowDetail(CALORIE_TYPE.total, todayRecord?.calorieConsumption ? todayRecord.calorieConsumption : 0) }}
                        >
                            {todayRecord?.calorieConsumption ? <Text style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>{todayRecord.calorieConsumption}</Text> :
                                <Text style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>0</Text>}
                        </TouchableOpacity>
                        <Text style={{ color: currentTheme.fontColor }}>+</Text>
                        <TouchableOpacity
                            onPress={() => { handleShowDetail(CALORIE_TYPE.tutorial, todayRecord?.tutorialCalorieConsumption ? todayRecord.tutorialCalorieConsumption : 0) }}
                        >
                            {todayRecord?.tutorialCalorieConsumption ? <Text style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>{todayRecord.tutorialCalorieConsumption}</Text> :
                                <Text style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>0</Text>}
                        </TouchableOpacity>
                        <Text style={{ color: currentTheme.fontColor, fontSize: 14, fontWeight: 'bold' }}>{formatMessage({ id: 'app.statistic.calorieUnit' })}</Text>
                    </View>
                </View>
            </View>
        </View >
    )
}

export default TodayRecord