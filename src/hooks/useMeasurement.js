import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// 这是一个自定义Hook
function useMeasurement() {
    const { measurements, latestMeasurement: SavedMeasuremenst } = useSelector(state => state.measurement)

    const [allMeasurements, setAllMeasurements] = useState([])
    const [latestMeasurement, setLatestMeasurement] = useState({})

    useEffect(() => {
        measurements && setAllMeasurements(measurements)
        setLatestMeasurement(SavedMeasuremenst ? SavedMeasuremenst : {})
    }, [measurements, SavedMeasuremenst]);

    // 返回状态和设置方法
    return { latestMeasurement, allMeasurements }
}

export default useMeasurement;
