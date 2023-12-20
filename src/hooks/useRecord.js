// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { checkTwoDaysIsEqual } from '../utils/checkIsToday';

// // 这是一个自定义Hook
// function useRecord(selectDay) {
//     const { records } = useSelector(state => state.record)
//     const [record, setRecord] = useState({})
//     useEffect(() => {
//         const foundRecord = records.find(record => checkTwoDaysIsEqual(new Date(record.date), selectDay ? selectDay : new Date()))
//         foundRecord && setRecord(foundRecord)
//         // selectDay ? records.map(record => {
//         //     if (checkTwoDaysIsEqual(new Date(session.date), selectDay)) {
//         //         sum += parseInt(record.exerciseDuration)
//         //     }
//         // }) : records.map(record => {
//         //     if (checkTwoDaysIsEqual(new Date(session.date), new Date())) {
//         //         sum += parseInt(record.exerciseDuration)
//         //     }
//         // })
//     }, [selectDay, records]);

//     // 返回状态和设置方法
//     return record;
// }

// export default useRecord;
import { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { checkTwoDaysIsEqual } from '../utils/checkIsToday';
import { getlatestrecord, getrecords } from '../api/record.api';
import { setRecords } from '../redux/RecordSlice';


// 这是一个自定义Hook
function useRecord(selectDay) {
    const [latestRecord, setLatestRecord] = useState({})
    const dispatch = useDispatch()
    const [allRecords, setAllRecords] = useState([])
    const getRecords = async () => {
        await getrecords().then(res => {
            if (res && res?.status !== false) {
                setAllRecords(res)
                dispatch(setRecords(res))
            }
        }).catch(err => {
            console.log(err, 'err');
        })
    }
    const getLatestRecord = async () => {
        await getlatestrecord().then(res => {
            if (res && res?.status !== false) {
                setLatestRecord(res)
            }
        }).catch(err => {
            console.log(err, 'err');
        })
    }
    useEffect(() => {
        getRecords()
        getLatestRecord()
    }, [])
    // useEffect(() => {
    //     if (allRecords.length !== 0) {
    //         const foundRecord = allRecords.find(record => checkTwoDaysIsEqual(new Date(record.date), selectDay ? selectDay : new Date()))
    //         foundRecord && setTodayRecord(foundRecord)
    //     }
    // }, [selectDay, allRecords]);
    const todayRecord = useMemo(() => {
        if (allRecords.length !== 0) {
            const foundRecord = allRecords.find(record => checkTwoDaysIsEqual(new Date(record.date), selectDay ? selectDay : new Date()))
            return foundRecord ? foundRecord : {}
        } else {
            return {}
        }
        // return selectDay && allRecords.find(record =>
        //     checkTwoDaysIsEqual(new Date(record.date), selectDay)
        // );
    }, [selectDay, allRecords]);

    // 返回状态和设置方法
    return { todayRecord, latestRecord };
}

export default useRecord;