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
import { setLatestMeasurement, setMeasurements } from '../../../redux/MeasurementSlice';
import useMeasurement from '../../../hooks/useMeasurement';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';
<<<<<<< Updated upstream
=======
import UpdateMeasurementModal from './UpdateMeasurementModal';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { ERROR_MESSAGE } from '../../../constants/ERRORMessage';
import { useIntl } from 'react-intl';
>>>>>>> Stashed changes
echarts.use([ToolboxComponent, TooltipComponent, DataZoomComponent, LegendComponent, SVGRenderer, LineChart, BarChart, GridComponent]);
const { width } = Dimensions.get('screen')
const StatisticChart = () => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { allMeasurements } = useMeasurement()
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { weightTarget } = currentUser
    const { heightArr, weightArr, BMIArr, dateArr, bodyFatRateArr } = useMeasurements(allMeasurements)
    const [reversedMeasurements, setReversedMeasurements] = useState([])
    const [collapsed, setCollapsed] = useState(true)

    const skiaRef = useRef(null);
    useEffect(() => {
        if (allMeasurements?.length !== 0) {
            const reveArr = [...allMeasurements].reverse()
            setReversedMeasurements(reveArr)
        } else {
            setReversedMeasurements([])
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
                dispatch(setLatestMeasurement(res.measurement))
                dispatch(setMeasurements(res.updatedMeasurements))
            } else {
                Alert.alert("出现异常请稍后重试")
            }
        })
    }

    return (
        <View style={{
            marginHorizontal: '3%',
            marginTop: SIZE.NormalMargin,
            padding: SIZE.NormalMargin,
            borderRadius: SIZE.CardBorderRadius,
            backgroundColor: currentTheme.contentColor
        }}>
            <SvgChart ref={skiaRef} />
            <TouchableOpacity
                onPress={() => setCollapsed(!collapsed)}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius, backgroundColor: collapsed ? COLORS.primary : currentTheme.backgroundColor }}>
                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: collapsed ? COLORS.white : currentTheme.fontColor }}>{formatMessage({ id: 'app.statistic.dataRecords' })}</Text>
                {collapsed ? ICON.right(24, COLORS.white) : ICON.down(24, collapsed ? COLORS.white : currentTheme.fontColor)}
            </TouchableOpacity>
            {!collapsed && <View>
                {reversedMeasurements?.length !== 0 && reversedMeasurements?.map((item, index) => {
                    return <View style={{
                        backgroundColor: currentTheme.backgroundColor,
                        borderRadius: SIZE.CardBorderRadius,
                        padding: SIZE.NormalMargin,
                        marginTop: SIZE.NormalMargin,
                        gap: SIZE.NormalMargin
                    }} key={index}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
<<<<<<< Updated upstream
                            <Text style={{ fontSize: SIZE.NormalTitle, color: currentTheme.fontColor }}>{formatTimeForChartSoloItem(item.date)}数据</Text>
                            <TouchableOpacity
                                onPress={() => { handleDeleteMeasurement(item._id) }}
                            >
                                {ICON.delete(24, COLORS.gray)}
                            </TouchableOpacity>
=======
                            <Text style={{ fontSize: SIZE.NormalTitle, color: currentTheme.fontColor }}>{formatTimeForChartSoloItem(item.date)}{formatMessage({ id: 'app.statistic.record' })}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    onPress={() => handleEditMeasurement(item)}
                                >
                                    {ICON.edit(24, COLORS.gray)}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { handleDeleteMeasurement(item._id) }}
                                >
                                    {ICON.delete(24, COLORS.gray)}
                                </TouchableOpacity>
                            </View>
>>>>>>> Stashed changes
                        </View>
                        <View style={{ flexDirection: 'row', gap: 2, }}>
                            <View style={{ flex: 1 }}><Text style={{ color: COLORS.commentText }}>{formatMessage({ id: 'app.statistic.weightForm2' })}{item.weight}</Text></View>
                            <View style={{ flex: 1 }}><Text style={{ color: COLORS.commentText }}>{formatMessage({ id: 'app.statistic.heightForm2' })}{item.height}</Text></View>
                            <View style={{ flex: 1 }}><Text style={{ color: COLORS.commentText }}>{formatMessage({ id: 'app.statistic.bmiForm2' })}{item.BMI}</Text></View>
                            <View style={{ flex: 1 }}>{item.bodyFatRate && <Text style={{ color: COLORS.commentText }}>{formatMessage({ id: 'app.statistic.bfrForm2' })}{item.bodyFatRate}</Text>}</View>
                        </View>
                    </View>
                })}
            </View>}
        </View >
    )
}

export default StatisticChart