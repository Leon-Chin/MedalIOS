import COLORS from "../../../constants/COLORS";

export const chartOption = (dateArr, weightArr, weightTarget, heightArr, BMIArr, bodyFatRateArr) => {

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
                name: '体重',
                type: 'line',
                smooth: true,
                data: weightArr,
            },
            heightArr && {
                name: '身高',
                type: 'line',
                smooth: true,
                data: heightArr,
            },
            BMIArr && {
                name: 'BMI',
                type: 'line',
                smooth: true,
                data: BMIArr,
            },
            weightTarget && {
                name: '目标体重',
                type: 'line',
                data: new Array(dateArr.length).fill(weightTarget),
            },
            bodyFatRateArr && {
                name: 'BFR',
                type: 'line',
                data: bodyFatRateArr,
            },
        ],
    };
}
