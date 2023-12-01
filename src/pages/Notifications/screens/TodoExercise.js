import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import useUncompletedTutorials from '../../../hooks/useUncompletedTutorials'
import SIZE from '../../../constants/SIZE'
import COLORS from '../../../constants/COLORS'
import UnDoneTodoItem from '../../Calender/components/UnDoneTodoItem'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'

const TodoExercise = () => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const todo = useUncompletedTutorials();
    if (todo.length === 0) {
        return <View style={{ flex: 1, backgroundColor: currentTheme.backgroundColor, marginTop: SIZE.NormalMargin, alignItems: 'center', justifyContent: 'center' }}>
            {todo.length === 0 && <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.commentText }}>
                今日没有待练课程
            </Text>}</View>
    } else {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: currentTheme.backgroundColor, paddingTop: SIZE.NormalMargin, }}>
                <View style={{ flex: 1, marginHorizontal: SIZE.NormalMargin }}>
                    {todo.map((tutorial, index) => <UnDoneTodoItem tutorial={tutorial} key={index} />)}
                </View>
            </ScrollView >
        )
    }
}


export default TodoExercise