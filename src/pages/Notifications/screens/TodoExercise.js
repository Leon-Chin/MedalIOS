import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import useUncompletedTutorials from '../../../hooks/useUncompletedTutorials'
import SIZE from '../../../constants/SIZE'
import COLORS from '../../../constants/COLORS'
import UnDoneTodoItem from '../../Calender/components/UnDoneTodoItem'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import useCompletedTutorials from '../../../hooks/useCompletedTutorials'
import { useNavigation } from '@react-navigation/native'
import TodoNotiPercentage from '../Components/TodoNotiPercentage'

const TodoExercise = () => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const todo = useUncompletedTutorials();
    const doneTutorial = useCompletedTutorials()
    const { navigate } = useNavigation()
    const [noTutorial, setNoTutorial] = useState(todo.length === 0 && doneTutorial.length === 0)
    useEffect(() => {
        setNoTutorial(todo.length === 0 && doneTutorial.length === 0)
    }, [todo, doneTutorial])

    if (todo.length === 0 && doneTutorial.length === 0) {
        return <View style={{ flex: 1, backgroundColor: currentTheme.backgroundColor, alignItems: 'center', justifyContent: 'center' }}>
            {todo.length === 0 &&
                <TouchableOpacity
                    style={{ flexDirection: 'row', justifyContent: 'center', width: 200, padding: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius, backgroundColor: currentTheme.contentColor }}
                    onPress={() => navigate("MyExercise")}
                >
                    <Text style={{ fontSize: SIZE.SmallTitle, fontWeight: 'bold', color: COLORS.commentText }}>
                        没有待练课程, 去添加教程/做些伸展运动休息吧
                    </Text>
                </TouchableOpacity>
            }</View>
    } else {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: currentTheme.backgroundColor, paddingTop: SIZE.NormalMargin, }}>
                {todo.length !== 0 && <><View style={{ gap: SIZE.NormalMargin, padding: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius, backgroundColor: COLORS.primary, marginHorizontal: '3%', marginBottom: SIZE.NormalMargin }}>
                    <Text style={{ fontSize: SIZE.NormalTitle, color: COLORS.white, fontWeight: 'bold' }}>
                        今日完成「{doneTutorial.length}」个教程
                    </Text>
                    <Text style={{ fontSize: SIZE.SmallTitle, color: COLORS.white, fontWeight: 'bold' }}>
                        还有「{todo.length}」个教程就达成目标, 加油！！！
                    </Text>
                    <TodoNotiPercentage />
                </View>
                    <View style={{ marginHorizontal: '3%', marginVertical: SIZE.NormalMargin }}>
                        <Text style={{ color: currentTheme.fontColor }}>剩余待练</Text>
                    </View>
                    <View style={{ flex: 1, marginHorizontal: SIZE.NormalMargin }}>
                        {todo.map((tutorial, index) => <UnDoneTodoItem tutorial={tutorial} key={index} />)}
                    </View></>}
                {todo.length === 0 && doneTutorial.length !== 0 && <View style={{ gap: SIZE.NormalMargin, padding: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius, backgroundColor: COLORS.primary, marginHorizontal: '3%', marginBottom: SIZE.NormalMargin }}>
                    <Text style={{ fontSize: SIZE.NormalTitle, color: COLORS.white, fontWeight: 'bold' }}>
                        今日完成「{doneTutorial.length}」个教程, 达成运动目标
                    </Text>
                    <Text style={{ fontSize: SIZE.NormalTitle, color: COLORS.white, fontWeight: 'bold' }}>
                        Great Job!!!🎊
                    </Text>
                    <TodoNotiPercentage />
                </View>}
            </ScrollView >
        )
    }
}


export default TodoExercise