import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { checkTwoDaysIsEqual } from '../utils/checkIsToday';

// 这是一个自定义Hook
function useUncompletedTutorials(selectDay) {
    const { sessions } = useSelector(state => state.session)
    const [completedtutorials, setCompletedTutorials] = useState([])

    useEffect(() => {
        let tutorials = []
        selectDay ?
            sessions.map(session => {
                if (checkTwoDaysIsEqual(new Date(session.date), selectDay)) {
                    if (session.completed === false) {
                        tutorials.push(session.tutorial)
                    }
                }
            }) : sessions.map(session => {
                if (checkTwoDaysIsEqual(new Date(session.date), new Date())) {
                    if (session.completed === false) {
                        tutorials.push(session.tutorial)
                    }
                }
            })
        setCompletedTutorials(tutorials)
    }, [selectDay, sessions]);

    // 返回状态和设置方法
    return completedtutorials;
}

export default useUncompletedTutorials