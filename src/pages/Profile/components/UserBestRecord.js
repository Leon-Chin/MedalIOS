import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SIZE from '../../../constants/SIZE'
import COLORS from '../../../constants/COLORS'
import { ICON } from '../../../constants/SVG/ICON'
import LinearGradient from 'react-native-linear-gradient'
import { formatTimeForCharts } from '../../../utils/formatTime'
import useRecordsAnalysis from '../../../hooks/useRecordsAnalysis'
import { secToSpecificMin } from '../../../utils/funcs'
import { useIntl } from 'react-intl'

const UserBestRecord = ({ records }) => {
    const { formatMessage } = useIntl()
    const { maxSteps, maxStepsDate, maxDuration, maxDurationDate, maxCalorie, maxCalorieDate, maxDistance, maxDistanceDate, } = useRecordsAnalysis(records)
    return (
        <View style={{}}>
            <View style={{ marginBottom: SIZE.NormalMargin }}>
                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.commentText }}>{formatMessage({ id: 'app.profile.highRecord' })}</Text>
            </View>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['rgb(134, 162, 242)', "rgb(117, 148, 243)", "rgb(100, 134, 240)"]} // 这里的颜色请根据您的需要进行调整
                style={{ borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14 }}
            >
                <View >
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: SIZE.NormalMargin }}>
                        {ICON.trophy(SIZE.NormalTitle, COLORS.white)}
                        <Text style={{ fontSize: SIZE.SmallTitle, fontWeight: "bold", color: COLORS.white }}>{formatMessage({ id: 'app.profile.singleRecord' })}</Text>
                    </View>
                    <View style={{ marginTop: SIZE.LargerMargin, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        {ICON.fire(16, COLORS.white)}
                        <Text style={{ fontSize: SIZE.SmallTitle, fontWeight: "bold", color: COLORS.white }}>{formatMessage({ id: 'app.profile.calorieName' })}</Text>
                    </View>
                    <View style={{ marginTop: SIZE.NormalMargin, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                            <Text style={{ color: COLORS.white, fontSize: SIZE.NormalTitle, fontWeight: 'bold' }}>{maxCalorie}</Text>
                            <Text style={{ color: COLORS.backgroundGray, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>{formatMessage({ id: 'app.profile.calorieUnit' })}</Text>
                        </View>
                        <View>
                            {maxCalorieDate ? <Text style={{ color: COLORS.white, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>{formatTimeForCharts(maxCalorieDate)}</Text> :
                                <Text style={{ color: COLORS.white, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>--</Text>}
                        </View>
                    </View>


                    <View style={{ marginTop: SIZE.LargerMargin, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        {ICON.stepIcon(16, COLORS.white)}
                        <Text style={{ fontSize: SIZE.SmallTitle, fontWeight: "bold", color: COLORS.white }}>{formatMessage({ id: 'app.profile.step' })}</Text>
                    </View>
                    <View style={{ marginTop: SIZE.NormalMargin, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                            <Text style={{ color: COLORS.white, fontSize: SIZE.NormalTitle, fontWeight: 'bold' }}>{maxSteps}</Text>
                            <Text style={{ color: COLORS.backgroundGray, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>{formatMessage({ id: 'app.profile.stepUnit' })}</Text>
                        </View>
                        <View>
                            {maxCalorieDate ? <Text style={{ color: COLORS.white, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>{formatTimeForCharts(maxStepsDate)}</Text> :
                                <Text style={{ color: COLORS.white, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>--</Text>}
                        </View>
                    </View>


                    <View style={{ marginTop: SIZE.LargerMargin, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        {ICON.distanceIcon(16, COLORS.white)}
                        <Text style={{ fontSize: SIZE.SmallTitle, fontWeight: "bold", color: COLORS.white }}>{formatMessage({ id: 'app.profile.distance' })}</Text>
                    </View>
                    <View style={{ marginTop: SIZE.NormalMargin, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                            <Text style={{ color: COLORS.white, fontSize: SIZE.NormalTitle, fontWeight: 'bold' }}>{maxDistance}</Text>
                            <Text style={{ color: COLORS.backgroundGray, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>{formatMessage({ id: 'app.profile.distanceUnit' })}</Text>
                        </View>
                        <View>
                            {maxCalorieDate ? <Text style={{ color: COLORS.white, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>{formatTimeForCharts(maxDistanceDate)}</Text> :
                                <Text style={{ color: COLORS.white, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>--</Text>}
                        </View>
                    </View>


                    <View style={{ marginTop: SIZE.LargerMargin, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        {ICON.time(16, COLORS.white)}
                        <Text style={{ fontSize: SIZE.SmallTitle, fontWeight: "bold", color: COLORS.white }}>{formatMessage({ id: 'app.profile.singleDuration' })}</Text>
                    </View>
                    <View style={{ marginTop: SIZE.NormalMargin, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                            <Text style={{ color: COLORS.white, fontSize: SIZE.NormalTitle, fontWeight: 'bold' }}>{secToSpecificMin(maxDuration)}</Text>
                            <Text style={{ color: COLORS.backgroundGray, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>{formatMessage({ id: 'app.profile.durationUnit' })}</Text>
                        </View>
                        <View>
                            {maxCalorieDate ? <Text style={{ color: COLORS.white, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>{formatTimeForCharts(maxDurationDate)}</Text> :
                                <Text style={{ color: COLORS.white, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>--</Text>}
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

export default UserBestRecord

const styles = StyleSheet.create({})