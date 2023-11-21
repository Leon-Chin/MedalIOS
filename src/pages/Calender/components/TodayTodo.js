import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useUncompletedTutorials from '../../../hooks/useUncompletedTutorials'
import useCompletedTutorials from '../../../hooks/useCompletedTutorials'
import SIZE from '../../../constants/SIZE'
import NoTutorialToday from './NoTutorialToday'
import COLORS from '../../../constants/COLORS'
import { ICON } from '../../../constants/SVG/ICON'
import { useNavigation } from '@react-navigation/native'

const TodayTodo = ({ selectDay }) => {
    const { navigate } = useNavigation()
    const yetDoneTutorial = useUncompletedTutorials(selectDay)
    const doneTutorial = useCompletedTutorials(selectDay)

    return (
        <View style={{ marginBottom: SIZE.LargerMargin }}>
            <View style={{ paddingHorizontal: 20, marginBottom: SIZE.NormalMargin }}>
                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold' }}>今日日程</Text>
            </View>
            {(yetDoneTutorial.length === 0 && doneTutorial.length === 0) && <NoTutorialToday />}
            {yetDoneTutorial.length !== 0 && <><Text style={{ marginBottom: SIZE.NormalMargin }}>未完成</Text>
                {yetDoneTutorial.map((tutorial, index) => <TouchableOpacity
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
            </>}
            {doneTutorial.length !== 0 && <><Text style={{ marginBottom: SIZE.NormalMargin }}>已完成</Text>
                {doneTutorial.map((tutorial, index) => <TouchableOpacity
                    onPress={() => navigate("SpecificTutorial", { tutorial })}
                    key={index}
                    style={{ padding: 10, flexDirection: 'row', gap: 10, borderRadius: SIZE.CardBorderRadius, backgroundColor: "#fff" }}
                >
                    <View style={{ height: '100%', width: 6, borderRadius: 3, backgroundColor: COLORS.primary }}></View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text numberOfLines={1} style={{ fontSize: SIZE.NormalTitle, marginBottom: SIZE.LittleMargin }}>{tutorial.name}</Text>
                            <Text numberOfLines={1} style={{ fontSize: 12, color: COLORS.commentText }}>{tutorial.brief} </Text>
                        </View>
                        <TouchableOpacity>
                            {/* {ICON.addToCalender(24, COLORS.primary)} */}
                            {ICON.doneCircle(22, COLORS.green)}
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>)}
            </>}
        </View>
    )
}

export default TodayTodo

const styles = StyleSheet.create({})