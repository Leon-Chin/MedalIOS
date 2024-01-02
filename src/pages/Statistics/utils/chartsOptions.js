import COLORS from "../../../constants/COLORS";

export const chartOption = (formatMessage, dateArr, weightArr, weightTarget, heightArr, BMIArr, bodyFatRateArr) => {

    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: COLORS.primary,
                },
            },
        },
        legend: {
            textStyle: {
                color: COLORS.commentText
            }
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { show: false, readOnly: false },
                restore: { show: false, },
            },
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: dateArr,
        },
        yAxis: {
            type: 'value',
            scale: true,
            show: true,
            // name: 'kg',
            min: 0,
        },
        series: [
            {
                name: formatMessage({ id: 'app.statistic.label.weight' }),
                type: 'line',
                smooth: true,
                data: weightArr,
            },
            heightArr && {
                name: formatMessage({ id: 'app.statistic.label.height' }),
                type: 'line',
                smooth: true,
                data: heightArr,
            },
            BMIArr && {
                name: formatMessage({ id: 'app.statistic.label.bmi' }),
                type: 'line',
                smooth: true,
                data: BMIArr,
            },
            weightTarget && {
                name: formatMessage({ id: 'app.statistic.label.weightGoal' }),
                type: 'line',
                data: new Array(dateArr.length).fill(weightTarget),
            },
            bodyFatRateArr && {
                name: formatMessage({ id: 'app.statistic.label.bfr' }),
                type: 'line',
                data: bodyFatRateArr,
            },
        ],
    };
}
