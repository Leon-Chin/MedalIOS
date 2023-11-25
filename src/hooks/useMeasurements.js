import { useState, useEffect } from 'react';
import { formatTimeForCharts } from '../utils/formatTime';
// 这是一个自定义Hook
function useMeasurements(allMeasurements) {
    const [weightArr, setWeightArr] = useState([])
    const [heightArr, setHeightArr] = useState([])
    const [BMIArr, setBMIArr] = useState([])
    const [dateArr, setDateArr] = useState([])
    const [bodyFatRateArr, setBodyFatArr] = useState([])
    useEffect(() => {
        const xData = allMeasurements?.length !== 0 ? allMeasurements?.map((item) => formatTimeForCharts(item.date)) : []
        setDateArr(xData)
        const yData = allMeasurements?.length !== 0 ? allMeasurements?.map((item) => item.weight) : []
        setWeightArr(yData)
        const heightData = allMeasurements?.length !== 0 ? allMeasurements?.map((item) => item.height) : []
        setHeightArr(heightData)
        const BMIData = allMeasurements?.length !== 0 ? allMeasurements?.map((item) => item.BMI) : []
        setBMIArr(BMIData)
        const bodyFats = allMeasurements?.length !== 0 ? allMeasurements?.map((item) => item.bodyFatRate ? item.bodyFatRate : null) : []
        setBodyFatArr(bodyFats)
    }, [allMeasurements]);

    // 返回状态和设置方法
    return { weightArr, heightArr, BMIArr, dateArr, bodyFatRateArr };
}

export default useMeasurements;