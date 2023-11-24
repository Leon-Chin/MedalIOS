import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BarChart, LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import {
    ToolboxComponent,
    LegendComponent,
    TooltipComponent,
    DataZoomComponent,
} from 'echarts/components';
import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import { useRef } from 'react';
import { useEffect } from 'react';
import * as echarts from 'echarts/core';
import useMeasurements from '../../../hooks/useMeasurements';
import { chartOption } from '../utils/chartsOptions';
import SIZE from '../../../constants/SIZE';
import COLORS from '../../../constants/COLORS';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { formatTimeForChartSoloItem, formatTimeForCharts } from '../../../utils/formatTime';
import { ICON } from '../../../constants/SVG/ICON';
import { deletemeasurement } from '../../../api/measurement';
import { loginSuccess } from '../../../redux/userSlice';
echarts.use([ToolboxComponent, TooltipComponent, DataZoomComponent, LegendComponent, SVGRenderer, LineChart, BarChart, GridComponent]);
const { width } = Dimensions.get('screen')
const StatisticChart = ({ getData, allMeasurements }) => {
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { weightTarget } = currentUser
    const skiaRef = useRef(null);
    const { heightArr, weightArr, BMIArr, dateArr, bodyFatRateArr } = useMeasurements(allMeasurements)
    const [reversedMeasurements, setReversedMeasurements] = useState([])
    const [collapsed, setCollapsed] = useState(true)
    useEffect(() => {
        if (allMeasurements?.length !== 0) {
            const reveArr = [...allMeasurements].reverse()
            setReversedMeasurements(reveArr)
        }
        let chart;
        if (skiaRef.current) {
            chart = echarts.init(skiaRef.current, 'light', {
                renderer: 'svg',
                width: width * 0.9,
                height: 400,
            });
            chart.setOption(chartOption(dateArr, weightArr, weightTarget, heightArr, BMIArr, bodyFatRateArr));
        }
        return () => chart?.dispose();
    }, [allMeasurements, heightArr, weightArr, BMIArr, dateArr]);

    const handleDeleteMeasurement = async (measurementID) => {
        await deletemeasurement(measurementID).then(res => {
            if (res.status !== false) {
                dispatch(loginSuccess(res.user))
                getData()
            } else {
                Alert.alert("出现异常请稍后重试")
            }
        })
    }

    return (
        <View style={styles.cardContainer}>
            <SvgChart ref={skiaRef} />
            <TouchableOpacity
                onPress={() => setCollapsed(!collapsed)}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius, backgroundColor: collapsed ? COLORS.primary : COLORS.backgroundGray }}>
                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: collapsed ? COLORS.white : COLORS.black }}>数据记录</Text>
                {collapsed ? ICON.right(24, COLORS.white) : ICON.down(24, collapsed ? COLORS.white : COLORS.black)}
            </TouchableOpacity>
            {!collapsed && <View style={styles.records}>
                {reversedMeasurements?.length !== 0 && reversedMeasurements?.map((item, index) => {
                    return <View style={styles.record} key={index}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: SIZE.NormalTitle, color: COLORS.black }}>{formatTimeForChartSoloItem(item.date)}数据</Text>
                            <TouchableOpacity
                                onPress={() => { handleDeleteMeasurement(item._id) }}
                            >
                                {ICON.delete(24, COLORS.gray)}
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 2, }}>
                            <View style={{ flex: 1 }}><Text style={{ color: COLORS.commentText }}>体重: {item.weight}</Text></View>
                            <View style={{ flex: 1 }}><Text style={{ color: COLORS.commentText }}>身高: {item.height}</Text></View>
                            <View style={{ flex: 1 }}><Text style={{ color: COLORS.commentText }}>BMI: {item.BMI}</Text></View>
                            <View style={{ flex: 1 }}>{item.bodyFatRate && <Text style={{ color: COLORS.commentText }}>BFR: {item.bodyFatRate}</Text>}</View>
                        </View>
                    </View>
                })}
            </View>}
        </View >
    )
}

export default StatisticChart

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: '3%',
        marginTop: SIZE.NormalMargin,
        padding: SIZE.NormalMargin,
        borderRadius: SIZE.CardBorderRadius,
        backgroundColor: COLORS.white
    },
    records: {

    },
    record: {
        backgroundColor: COLORS.backgroundGray,
        borderRadius: SIZE.CardBorderRadius,
        padding: SIZE.NormalMargin,
        marginTop: SIZE.NormalMargin,
        gap: SIZE.NormalMargin
    }
})