import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import COLORS from '../../../constants/COLORS'
import SIZE from '../../../constants/SIZE'
import { useEffect } from 'react'

const EvaluationQuestion = ({ questionNo, EvaluationItem, setEvaluationAnswer }) => {
    const { question, answers, type, id } = EvaluationItem
    const { currentUser } = useSelector(state => state.user)
    const [selectedAnswer, setSelectedAnswer] = useState({})
    const [selectedIndex, setSelectedIndex] = useState()

    const handleSelectAnswer = (answer, index) => {
        setSelectedIndex(index)
        selectedAnswer[type] = answer.value
        const finalAnswer = selectedAnswer
        console.log("finalAnswer", finalAnswer);
        setEvaluationAnswer(prev => {
            return { ...prev, ...finalAnswer }
        })
    }
    if (questionNo === id) {
        return (
            <View style={styles.questionContainer}>
                <Text style={styles.question}>
                    {currentUser.preferedLanguage === 'en_US' ? question.en : question.zh}
                </Text>
                {answers.map(
                    (answer, index) =>
                        <TouchableOpacity
                            key={index}
                            style={[styles.answerContainer, selectedIndex === index && { backgroundColor: COLORS.primary }]}
                            onPress={() => handleSelectAnswer(answer, index)}
                        >
                            <Text style={[styles.answer, selectedIndex === index && { color: COLORS.white }]}>
                                {currentUser.preferedLanguage === 'en_US' ? answer.en : answer.zh}
                            </Text>
                        </TouchableOpacity>
                )}
            </View>
        )
    } else {
        return <></>
    }

}

export default EvaluationQuestion

const styles = StyleSheet.create({
    questionContainer: {
        marginVertical: SIZE.LargerMargin,
    },
    question: {
        fontSize: SIZE.LargerTitle,
        fontWeight: 'bold',
        marginBottom: SIZE.LargerMargin
    },
    answerContainer: {
        paddingVertical: SIZE.LargerMargin,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginBottom: SIZE.LargerMargin,
        borderRadius: SIZE.CardBorderRadius
    },
    answer: {
        fontSize: SIZE.NormalTitle,
        color: COLORS.commentText,
        fontWeight: 'bold'
    },
})