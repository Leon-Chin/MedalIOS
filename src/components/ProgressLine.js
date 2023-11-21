import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import COLORS from '../constants/COLORS'
import { useEffect } from 'react'
import { useState } from 'react'
import EvaluationQuestions from '../constants/EvaluationQuestions'
const { width, height } = Dimensions.get('screen')
const ProgressLine = ({ questionNo }) => {
    const firstTimePercentage = questionNo / EvaluationQuestions.length
    const [percentage, setPercentage] = useState(firstTimePercentage)

    useEffect(() => {
        console.log("questionNo", questionNo);
        console.log("EvaluationQuestions.length", EvaluationQuestions.length);
        console.log(questionNo === EvaluationQuestions.length)
        if (questionNo === EvaluationQuestions.length) {
            setPercentage(1)
        } else {
            setPercentage(questionNo / EvaluationQuestions.length)
        }
    }, [questionNo])

    return (
        <View style={{ height: 10, width: width * 0.8, borderRadius: 4, backgroundColor: COLORS.gray }}>
            <View style={{ height: '100%', width: (width * 0.8 * percentage), borderRadius: 4, backgroundColor: COLORS.black }} />
        </View>
    )
}

export default ProgressLine