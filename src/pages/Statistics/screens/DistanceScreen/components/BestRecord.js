import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SIZE from '../../../../../constants/SIZE'
import COLORS from '../../../../../constants/COLORS'
import { ICON } from '../../../../../constants/SVG/ICON'
import Percentage from '../../../components/Percentage'
import useHealthKit from '../../../../../hooks/useHealthkit'
import LinearGradient from 'react-native-linear-gradient'
import useRecord from '../../../../../hooks/useRecord'
import { formatTimeForChartSoloItem, formatTimeForCharts, formatTimeToChinese } from '../../../../../utils/formatTime'
import useRecords from '../../../../../hooks/useRecords'
import { useIntl } from 'react-intl'

const BestRecord = () => {
    const { formatMessage } = useIntl()
    const record = useRecord()
    const { steps } = useHealthKit()
    const { maxDistance, maxDistanceDate } = useRecords()
    return (
        <View style={{ marginTop: SIZE.LargerMargin, }}>
            <View style={{ marginBottom: SIZE.NormalMargin }}>
                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.commentText }}>{formatMessage({ id: 'app.statistic.highestRecord' })}</Text>
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
                        <Text style={{ fontSize: SIZE.SmallTitle, fontWeight: "bold", color: COLORS.white }}>{formatMessage({ id: 'app.statistic.singleHighRecord' })}</Text>
                    </View>
                    <View style={{ marginTop: SIZE.NormalMargin, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                            <Text style={{ color: COLORS.white, fontSize: SIZE.NormalTitle, fontWeight: 'bold' }}>{maxDistance}</Text>
                            <Text style={{ color: COLORS.backgroundGray, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>{formatMessage({ id: 'app.statistic.distanceUnit' })}</Text>
                        </View>
                        <View>
                            {maxDistanceDate ? <Text style={{ color: COLORS.white, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>{formatTimeForCharts(maxDistanceDate)}</Text> :
                                <Text style={{ color: COLORS.white, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>--</Text>}
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

export default BestRecord

const styles = StyleSheet.create({})