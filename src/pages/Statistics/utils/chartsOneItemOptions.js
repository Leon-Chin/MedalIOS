import COLORS from "../../../constants/COLORS";

export const chartsOneItemOptions = (dateArr, dataArr, title) => {

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
        grid: {
            left: '46',
        },
        legend: {},
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
            min: 0,
        },
        series: [
            {
                name: title,
                type: 'line',
                smooth: true,
                data: dataArr,
            },
        ],
    };
}
