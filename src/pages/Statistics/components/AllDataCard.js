import { StyleSheet, Text, View } from 'react-native'
import COLORS from '../../../constants/COLORS'
import { exerciseLogo } from '../../../constants/SVG/ExerciseLogo';
import useHealthKit from '../../../hooks/useHealthkit';
import useTodayExerciseDuration from '../../../hooks/useTodayExerciseDuration';
import { secToMin } from '../../../utils/funcs';
import { ICON } from '../../../constants/SVG/ICON';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';
import { useIntl } from 'react-intl';

const AllDataCard = () => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { steps, distance, calorie } = useHealthKit()
    const duration = useTodayExerciseDuration()
    return (
        <View style={{ marginHorizontal: '3%', marginBottom: 10, backgroundColor: currentTheme.contentColor, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14 }}>
            {/* title */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: currentTheme.fontColor }}>{formatMessage({ id: 'app.statistic.summary' })}</Text>
            </View>
            {/* first row */}
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, backgroundColor: currentTheme.backgroundColor, padding: 10, borderRadius: 10, marginBottom: 10 }}>
                    <View style={{ marginBottom: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            {/* icon */}
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: 26, height: 26, backgroundColor: COLORS.primary, borderRadius: 9 }}>
                                {exerciseLogo.run(18)}
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.primary }}>{formatMessage({ id: 'app.statistic.distanceCover' })}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>{(distance / 1000).toFixed(2)}</Text>
                        <Text style={{ color: currentTheme.fontColor, fontSize: 14, fontWeight: 'bold' }}>{formatMessage({ id: 'app.statistic.distanceUnit' })}</Text>
                    </View>
                </View>
                <View style={{ width: 10 }}></View>
                <View style={{ flex: 1, backgroundColor: currentTheme.backgroundColor, padding: 10, borderRadius: 10, marginBottom: 10 }}>
                    <View style={{ marginBottom: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            {/* icon */}
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: 26, height: 26, backgroundColor: COLORS.primary, borderRadius: 9 }}>
                                {exerciseLogo.walk(18)}
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.primary }}>{formatMessage({ id: 'app.statistic.step' })}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>{steps}</Text>
                        <Text style={{ color: currentTheme.fontColor, fontSize: 14, fontWeight: 'bold' }}>{formatMessage({ id: 'app.statistic.stepUnit' })}</Text>
                    </View>
                </View>
            </View>
            {/* second row */}
            <View style={{ flexDirection: 'row' }}>
                {/* colorie */}
                <View style={{ flex: 1, backgroundColor: currentTheme.backgroundColor, padding: 10, borderRadius: 10, marginBottom: 10 }}>
                    <View style={{ marginBottom: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            {/* icon */}
                            <View style={{ width: 26, height: 26, backgroundColor: COLORS.colorieOrange, alignItems: 'center', justifyContent: 'center', borderRadius: 9 }}>
                                {ICON.fire(16, COLORS.white)}
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.colorieOrange }}>{formatMessage({ id: 'app.statistic.calorie' })}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>{calorie}</Text>
                        <Text style={{ color: currentTheme.fontColor, fontSize: 14, fontWeight: 'bold' }}>{formatMessage({ id: 'app.statistic.calorieUnit' })}</Text>
                    </View>
                </View>
                <View style={{ width: 10 }}></View>
                {/* 健身 */}
                <View style={{ flex: 1, backgroundColor: currentTheme.backgroundColor, padding: 10, borderRadius: 10, marginBottom: 10 }}>
                    <View style={{ marginBottom: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            {/* icon */}
                            <View style={{ width: 26, height: 26, backgroundColor: COLORS.purple, borderRadius: 9, justifyContent: 'center', alignItems: 'center' }}>
                                {ICON.lightning(18, COLORS.white)}
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.purple }}>{formatMessage({ id: 'app.statistic.duration' })}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>{secToMin(duration)}</Text>
                        <Text style={{ color: currentTheme.fontColor, fontSize: 14, fontWeight: 'bold' }}>{formatMessage({ id: 'app.statistic.durationUnit' })}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default AllDataCard

const styles = StyleSheet.create({})