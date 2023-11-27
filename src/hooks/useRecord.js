import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { checkTwoDaysIsEqual } from '../utils/checkIsToday';

// 这是一个自定义Hook
function useRecord(selectDay) {
    const { records } = useSelector(state => state.record)
    const [record, setRecord] = useState({})
    useEffect(() => {
        const foundRecord = records.find(record => checkTwoDaysIsEqual(new Date(record.date), selectDay ? selectDay : new Date()))
        foundRecord && setRecord(foundRecord)
        // selectDay ? records.map(record => {
        //     if (checkTwoDaysIsEqual(new Date(session.date), selectDay)) {
        //         sum += parseInt(record.exerciseDuration)
        //     }
        // }) : records.map(record => {
        //     if (checkTwoDaysIsEqual(new Date(session.date), new Date())) {
        //         sum += parseInt(record.exerciseDuration)
        //     }
        // })
    }, [selectDay, records]);

    // 返回状态和设置方法
    return record;
}

export default useRecord;
