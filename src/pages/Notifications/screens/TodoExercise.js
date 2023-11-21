import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import useUncompletedTutorials from '../../../hooks/useUncompletedTutorials'
import NoTutorialToday from '../../Calender/components/NoTutorialToday'
import SIZE from '../../../constants/SIZE'
import COLORS from '../../../constants/COLORS'
import { ICON } from '../../../constants/SVG/ICON'
import { useNavigation } from '@react-navigation/native'

const TodoExercise = () => {
    const todo = useUncompletedTutorials();
    const { navigate } = useNavigation()
    if (todo.length === 0) {
        return <View style={{ flex: 1, marginTop: SIZE.NormalMargin, alignItems: 'center', justifyContent: 'center' }}>
            {todo.length === 0 && <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.commentText }}>
                今日没有待练课程
            </Text>}</View>
    } else {
        return (
            <ScrollView style={{ flex: 1, paddingTop: SIZE.NormalMargin, }}>
                <View style={{ flex: 1, marginHorizontal: SIZE.NormalMargin }}>
                    {todo.map((tutorial, index) => <TouchableOpacity
                        onPress={() => navigate("SpecificTutorial", { tutorial })}
                        key={index}
                        style={{ marginBottom: SIZE.NormalMargin, padding: 10, flexDirection: 'row', gap: 10, borderRadius: SIZE.CardBorderRadius, backgroundColor: "#fff" }}
                    >
                        <View style={{ height: '100%', width: 6, borderRadius: 3, backgroundColor: COLORS.primary }}></View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text numberOfLines={1} style={{ fontSize: SIZE.NormalTitle, marginBottom: SIZE.LittleMargin }}>{tutorial.name}</Text>
                                <Text numberOfLines={1} style={{ fontSize: 12, color: COLORS.commentText }}>{tutorial.brief} </Text>
                            </View>
                            <TouchableOpacity>
                                {/* {ICON.addToCalender(24, COLORS.primary)} */}
                                {ICON.circle(22, COLORS.gray)}
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>)}
                </View>

            </ScrollView >
        )
    }
}


export default TodoExercise