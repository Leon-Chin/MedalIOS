import { useState, useEffect } from 'react';
import { formatTimeForCharts } from '../utils/formatTime';
import { useSelector } from 'react-redux';
import { secConvertToMin, secToSpecificMin } from '../utils/funcs';
// 这是一个自定义Hook
function useRecords() {
    const { records } = useSelector(state => state.record)
    const [dateArr, setDateArr] = useState([])
    const [durationArr, setDurationArr] = useState([])
    const [stepArr, setStepArr] = useState([])
    const [distanceArr, setDistanceArr] = useState([])
    const [calorieArr, setCalorieArr] = useState([])
    const [tutorialCalorieArr, setTutorialCalorieArr] = useState([])

    const [maxSteps, setMaxSteps] = useState(0);
    const [maxStepsDate, setMaxStepsDate] = useState(null);

    const [maxDuration, setMaxDuration] = useState(0);
    const [maxDurationDate, setMaxDurationDate] = useState(null);

    const [maxCalorie, setMaxCalorie] = useState(0);
    const [maxCalorieDate, setMaxCalorieDate] = useState(null);

    const [maxDistance, setMaxDistance] = useState(0);
    const [maxDistanceDate, setMaxDistanceDate] = useState(null);

    useEffect(() => {
        if (records && records.length > 0) {
            console.log("records.length");
            console.log(records);
            let maxdurationInfo = records.reduce((max, record) => (record.duration > max.duration) ? { duration: record.duration, date: record.date } : max, { duration: 0, date: null });
            let maxcalorieConsumptionInfo = records.reduce((max, record) => (record.calorieConsumption > max.calorieConsumption) ? { calorieConsumption: record.calorieConsumption, date: record.date } : max, { calorieConsumption: 0, date: null });
            let maxstepsInfo = records.reduce((max, record) => (record.steps > max.steps) ? { steps: record.steps, date: record.date } : max, { steps: 0, date: null });
            let maxdistanceInfo = records.reduce((max, record) => (record.distance > max.distance) ? { distance: record.distance, date: record.date } : max, { distance: 0, date: null });
            maxdurationInfo.date && setMaxDurationDate(maxdurationInfo.date)
            maxcalorieConsumptionInfo.date && setMaxCalorieDate(maxcalorieConsumptionInfo.date)
            maxstepsInfo.date && setMaxStepsDate(maxstepsInfo.date)
            maxdistanceInfo.date && setMaxDistanceDate(maxdistanceInfo.date)

            setMaxSteps(maxstepsInfo.steps);
            setMaxDistance(maxdistanceInfo.distance);
            setMaxDuration(maxdurationInfo.duration);
            setMaxCalorie(maxcalorieConsumptionInfo.calorieConsumption);
            setDateArr(records.map(item => formatTimeForCharts(item.date)));
            setDurationArr(records.map(item => secConvertToMin(item.duration)));
            setCalorieArr(records.map(item => item.calorieConsumption));
            setStepArr(records.map(item => item.steps));
            setDistanceArr(records.map(item => item.distance));
            setTutorialCalorieArr(records.map(item => item.tutorialCalorieConsumption || 0));
        }
    }, [records]);

    // 返回状态和设置方法
    return { dateArr, durationArr, stepArr, distanceArr, calorieArr, tutorialCalorieArr, maxSteps, maxDuration, maxCalorie, maxDistance, maxStepsDate, maxDurationDate, maxCalorieDate, maxDistanceDate, };
}

export default useRecords;
