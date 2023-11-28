import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useUncompletedTutorials from '../../../hooks/useUncompletedTutorials'
import useCompletedTutorials from '../../../hooks/useCompletedTutorials'
import SIZE from '../../../constants/SIZE'
import NoTutorialToday from './NoTutorialToday'
import Percentage from './Percentage'
import { useState } from 'react'
import { useEffect } from 'react'
import UnDoneTodoItem from './UnDoneTodoItem'
import DoneTodoItem from './DoneTodoItem'
import { useIntl } from 'react-intl'

const TodayTodo = ({ selectDay }) => {
    const yetDoneTutorial = useUncompletedTutorials(selectDay)
    const doneTutorial = useCompletedTutorials(selectDay)
    const { formatMessage } = useIntl()
    const [noTutorial, setNoTutorial] = useState(yetDoneTutorial.length === 0 && doneTutorial.length === 0)
    useEffect(() => {
        const noTutorial = yetDoneTutorial.length === 0 && doneTutorial.length === 0
        setNoTutorial(noTutorial)
    }, [yetDoneTutorial, doneTutorial])
    return (
        <View style={{ marginBottom: SIZE.LargerMargin }}>
            <View style={{ paddingHorizontal: 20, marginBottom: SIZE.NormalMargin }}>
                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold' }}>{formatMessage({ id: 'todaySessions' })}</Text>
            </View>
            {!noTutorial && <Percentage selectDay={selectDay} />}
            {noTutorial && <NoTutorialToday />}
            {yetDoneTutorial.length !== 0 && <><Text style={{ marginBottom: SIZE.NormalMargin }}>未完成</Text>
                {yetDoneTutorial.map((tutorial, index) => <UnDoneTodoItem tutorial={tutorial} key={index} />)}
            </>}
            {doneTutorial.length !== 0 && <><Text style={{ marginBottom: SIZE.NormalMargin }}>已完成</Text>
                {doneTutorial.map((tutorial, index) => <DoneTodoItem tutorial={tutorial} key={index} />)}
            </>}
        </View>
    )
}

export default TodayTodo

const styles = StyleSheet.create({})