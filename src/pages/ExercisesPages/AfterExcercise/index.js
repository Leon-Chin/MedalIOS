import { ImageBackground, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import SIZE from '../../../constants/SIZE'
import COLORS from '../../../constants/COLORS'
import { ICON } from '../../../constants/SVG/ICON'
import EXERCISETYPE from '../../../constants/EXERCISETYPE'
import PIC from '../../../constants/PIC'
import { useSelector } from 'react-redux'
import { Avatar } from '@rneui/base'
import { secToMin } from '../../../utils/funcs'
import { formatTimeForChartSoloItem } from '../../../utils/formatTime'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'

const AfterExcercise = ({ route }) => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { currentUser } = useSelector(state => state.user)
    const tutorial = route.params.tutorial
    const data = route.params.data
    const { cover, level, colorie, brief, name, duration, _id } = tutorial
    const { navigate } = useNavigation()
    const navigateToCool = () => {
        navigate("AllTutorials", {
            selectType: {
                name: 'Relax',
                value: EXERCISETYPE.cooldown.value,
            }
        })
    }
    return (
        <View style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
            <View style={{ marginHorizontal: '3%' }}>
                <View style={{ padding: SIZE.NormalMargin, backgroundColor: currentTheme.contentColor, marginVertical: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: SIZE.NormalMargin }}>
                        <Avatar
                            size={36}
                            rounded
                            source={{ uri: currentUser?.avator }}
                        />
                        <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: currentTheme.fontColor }}>{currentUser.name}</Text>
                    </View>
                    <View style={{ padding: SIZE.NormalMargin, marginBottom: SIZE.NormalMargin, backgroundColor: currentTheme.backgroundColor, borderRadius: SIZE.CardBorderRadius }}>
                        <Text style={{ color: COLORS.commentText }}>教程名称: </Text>
                        <View style={{ marginVertical: SIZE.NormalMargin }}>
                            <Text numberOfLines={2} style={{ color: currentTheme.fontColor, fontSize: SIZE.NormalTitle, fontWeight: 'bold' }}>{name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: SIZE.NormalMargin, alignItems: 'center' }}>
                            <View style={{ paddingHorizontal: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius, backgroundColor: COLORS.primary }}>
                                <Text numberOfLines={1} style={{ color: COLORS.white, fontSize: SIZE.NormalTitle, fontWeight: 'bold', fontStyle: 'italic' }}>{level}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                <Text numberOfLines={1} style={{ color: currentTheme.fontColor, fontSize: SIZE.NormalTitle, fontWeight: 'bold', fontStyle: 'italic' }}>{duration}</Text>
                                <Text numberOfLines={1} style={{ color: COLORS.commentText }}> min</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', gap: SIZE.NormalMargin }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.colorieOrange }}>{data.calorieConsumption}</Text>
                                {ICON.fire(SIZE.NormalTitle, COLORS.colorieOrange)}
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ color: COLORS.commentText }}>预估消耗(千卡)</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, gap: 3 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                <Text numberOfLines={1} style={{ color: COLORS.commentText }}>训练时长: </Text>
                                <Text numberOfLines={1} style={{ fontSize: SIZE.NormalTitle, color: currentTheme.fontColor }}>{secToMin(data.exerciseDuration)}</Text>
                            </View>
                            <View>
                                <Text numberOfLines={1} style={{ color: COLORS.commentText }}>训练开始时间</Text>
                                <Text numberOfLines={1} style={{ fontSize: SIZE.NormalTitle, color: currentTheme.fontColor }}>{formatTimeForChartSoloItem(data.startTime)}</Text>
                            </View>
                            <View>
                                <Text numberOfLines={1} style={{ color: COLORS.commentText }}>训练结束时间</Text>
                                <Text numberOfLines={1} style={{ fontSize: SIZE.NormalTitle, color: currentTheme.fontColor }}>{formatTimeForChartSoloItem(data.endTime)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{}}>
                    <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.commentText }}>接着做一个伸展运动吧，更有效缓解疲劳</Text>
                    <TouchableOpacity
                        onPress={navigateToCool}
                        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SIZE.NormalMargin, backgroundColor: currentTheme.contentColor, marginTop: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius }}>
                        <View style={{ flexDirection: 'row', alignItems: "center", gap: SIZE.NormalMargin }}>
                            <ImageBackground
                                source={{ uri: PIC.cooldown }}
                                style={{
                                    borderRadius: SIZE.CardBorderRadius, overflow: 'hidden',
                                    height: 50,
                                    width: 50,
                                }}>
                            </ImageBackground>
                            <View>
                                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: currentTheme.fontColor }}>
                                    {EXERCISETYPE.cooldown.label}
                                </Text>
                            </View>
                        </View>
                        {ICON.right(24, currentTheme.fontColor)}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default AfterExcercise

const styles = StyleSheet.create({})