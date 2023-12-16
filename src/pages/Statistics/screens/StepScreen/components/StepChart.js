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
import { chartsOneItemOptions } from '../../../utils/chartsOneItemOptions';
import SIZE from '../../../../../constants/SIZE';
import debounceFunc from '../../../../../utils/debounceFunc';
import useUserTheme from '../../../../../hooks/useUserTheme';
import APPTHEME from '../../../../../constants/COLORS/APPTHEME';

echarts.use([ToolboxComponent, TooltipComponent, DataZoomComponent, LegendComponent, SVGRenderer, LineChart, BarChart, GridComponent]);
const { width } = Dimensions.get("screen")
const StepChart = () => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { stepArr, dateArr } = useRecords()
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
                chart.setOption(chartsOneItemOptions(dateArr, stepArr, "步数"));
            }
        }
        debounceFunc(initChart(), 1000)
        return () => chart?.dispose();
    }, [stepArr, dateArr]);
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

export default StepChart

const styles = StyleSheet.create({})