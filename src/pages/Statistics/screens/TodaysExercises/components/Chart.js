import { Dimensions, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
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
import debounceFunc from '../../../../../utils/debounceFunc';
import useUserTheme from '../../../../../hooks/useUserTheme';
import APPTHEME from '../../../../../constants/COLORS/APPTHEME';
echarts.use([ToolboxComponent, TooltipComponent, DataZoomComponent, LegendComponent, SVGRenderer, LineChart, BarChart, GridComponent]);
const { width } = Dimensions.get("screen")
const Chart = ({ options }) => {
    const skiaRef = useRef(null);
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    useEffect(() => {
        let chart;
        if (options) {

            const initChart = () => {
                if (skiaRef.current) {
                    chart = echarts.init(skiaRef.current, 'vintage', {
                        renderer: 'svg',
                        width: width * 0.9,
                        height: 300,
                    });
                    chart.setOption(options);
                }
            }
            debounceFunc(initChart(), 1000)
        }
        return () => chart?.dispose();
    }, [options]);
    return (
        <View style={{
            marginTop: SIZE.NormalMargin,
            padding: SIZE.LargerMargin,
            backgroundColor: currentTheme.contentColor,
            borderRadius: SIZE.CardBorderRadius,
        }}>
            {options !== undefined && <SvgChart ref={skiaRef} />}
        </View>
    )
}

export default Chart

const styles = StyleSheet.create({})