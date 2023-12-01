import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import useRecords from '../../../../../hooks/useRecords';
import { BarChart, LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import {
    ToolboxComponent,
    LegendComponent,
    TooltipComponent,
    DataZoomComponent,
} from 'echarts/components';
import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import * as echarts from 'echarts/core';
import SIZE from '../../../../../constants/SIZE';
import COLORS from '../../../../../constants/COLORS';
import debounceFunc from '../../../../../utils/debounceFunc';
import { chartsTwoItemsOptions } from '../../../utils/chartsTwoItemsOptions';
import useUserTheme from '../../../../../hooks/useUserTheme';
import APPTHEME from '../../../../../constants/COLORS/APPTHEME';

echarts.use([ToolboxComponent, TooltipComponent, DataZoomComponent, LegendComponent, SVGRenderer, LineChart, BarChart, GridComponent]);
const { width } = Dimensions.get("screen")
const Chart = () => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { calorieArr, tutorialCalorieArr, dateArr } = useRecords()
    const skiaRef = useRef(null);
    useEffect(() => {
        let chart;
        const initChart = () => {
            if (skiaRef.current) {
                chart = echarts.init(skiaRef.current, 'vintage', {
                    renderer: 'svg',
                    width: width * 0.9,
                    height: 300,
                });
                chart.setOption(chartsTwoItemsOptions(dateArr, calorieArr, "卡路里消耗(kcal)", tutorialCalorieArr, "课程卡路里消耗(kcal)"));
            }
        }
        debounceFunc(initChart(), 1000)
        return () => chart?.dispose();
    }, [calorieArr, dateArr]);
    return (
        <View style={{
            marginTop: SIZE.NormalMargin,
            padding: SIZE.LargerMargin,
            borderRadius: SIZE.CardBorderRadius,
            backgroundColor: currentTheme.contentColor
        }}>
            <SvgChart ref={skiaRef} />
        </View>
    )
}

export default Chart

const styles = StyleSheet.create({})