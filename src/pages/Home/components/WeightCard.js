import React, { useEffect, useMemo, useRef } from 'react'
import { Text, TouchableOpacity, View, } from 'react-native';
import COLORS from '../../../constants/COLORS';
import { useNavigation } from '@react-navigation/native';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';
import { useIntl } from 'react-intl';
import { SvgChart } from '@wuba/react-native-echarts';
import * as echarts from 'echarts/core';
import useMeasurement from '../../../hooks/useMeasurement';
import SIZE from '../../../constants/SIZE';
import useMeasurements from '../../../hooks/useMeasurements';
import debounceFunc from '../../../utils/debounceFunc';
import { ICON } from '../../../constants/SVG/ICON';
const AllCompetitionsCard = () => {
    const { navigate } = useNavigation()
    const theme = useUserTheme()
    const { latestMeasurement, allMeasurements } = useMeasurement()
    const { weightArr, dateArr } = useMeasurements(allMeasurements)
    const weightArrMemo = useMemo(() => { return weightArr }, [weightArr])
    const currentTheme = APPTHEME[theme]
    const { formatMessage } = useIntl()
    const skiaRef = useRef(null);
    const WeightLineOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: COLORS.primary,
                },
            },
        },
        xAxis: {
            type: 'category',
            data: dateArr,
            show: false
        },
        yAxis: {
            type: 'value',
            min: Math.min(...weightArrMemo) - 2,
            max: Math.max(...weightArrMemo) + 2,
            show: false,
            splitLine: {
                show: false // Do not show the split lines
            },
        },
        series: [
            {
                data: weightArrMemo,
                type: 'line',
                name: 'Weight',
                showSymbol: false,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [{
                            offset: 0, color: '#6C96E1' // 0% 处的颜色
                        }, {
                            offset: 1, color: currentTheme.contentColor// 100% 处的颜色
                        }]
                        ),  //背景渐变色 
                    },
                },
                smooth: true
            }
        ],
        backgroundColor: ''
    };
    useEffect(() => {
        let chart;
        const initChart = () => {
            if (skiaRef.current) {
                chart = echarts.init(skiaRef.current, 'vintage', {
                    renderer: 'svg',
                    width: 180,
                    height: 70,
                });
                chart.setOption(WeightLineOption);
            }
        }
        debounceFunc(initChart(), 1000)
        return () => chart?.dispose();
    }, [weightArrMemo, dateArr]);
    return (
        <TouchableOpacity
            onPress={() => navigate("Statistics")}
            style={{
                flex: 1, height: 100, backgroundColor: currentTheme.contentColor, borderRadius: SIZE.NormalMargin, paddingVertical: 8
            }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                    {ICON.weight(14, COLORS.white)}
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: currentTheme.fontColor }}>{formatMessage({ id: 'app.profile.weight' })}</Text>
                </View>
                {/* {ICON.right(24, currentTheme.fontColor)} */}
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: currentTheme.fontColor }}>{latestMeasurement.weight}</Text>
                    <Text style={{ fontSize: 14, color: COLORS.commentText }}>{formatMessage({ id: 'app.profile.weightUnit' })}</Text>
                </View>
            </View>
            <SvgChart ref={skiaRef} />
        </TouchableOpacity>
    );
};
export default AllCompetitionsCard