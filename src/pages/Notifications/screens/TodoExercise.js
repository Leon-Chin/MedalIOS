import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import useUncompletedTutorials from '../../../hooks/useUncompletedTutorials'
import SIZE from '../../../constants/SIZE'
import COLORS from '../../../constants/COLORS'
import UnDoneTodoItem from '../../Calender/components/UnDoneTodoItem'

const TodoExercise = () => {
    const todo = useUncompletedTutorials();
    if (todo.length === 0) {
        return <View style={{ flex: 1, marginTop: SIZE.NormalMargin, alignItems: 'center', justifyContent: 'center' }}>
            {todo.length === 0 && <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.commentText }}>
                今日没有待练课程
            </Text>}</View>
    } else {
        return (
            <ScrollView style={{ flex: 1, paddingTop: SIZE.NormalMargin, }}>
                <View style={{ flex: 1, marginHorizontal: SIZE.NormalMargin }}>
                    {todo.map((tutorial, index) => <UnDoneTodoItem tutorial={tutorial} key={index} />)}
                </View>
            </ScrollView >
        )
    }
}


export default TodoExercise