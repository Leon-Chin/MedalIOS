import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import SIZE from '../../../constants/SIZE'
import COLORS from '../../../constants/COLORS'
import { ICON } from '../../../constants/SVG/ICON'

const DoneTodoItem = ({ tutorial }) => {
    const { navigate } = useNavigation()
    return (
        <TouchableOpacity
            onPress={() => navigate("SpecificTutorial", { tutorial })}
            style={{ padding: 10, flexDirection: 'row', gap: 10, borderRadius: SIZE.CardBorderRadius, backgroundColor: "#fff" }}
        >
            <View style={{ height: '100%', width: 6, borderRadius: 3, backgroundColor: COLORS.primary }}></View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                    <Text numberOfLines={1} style={{ fontSize: SIZE.NormalTitle, marginBottom: SIZE.LittleMargin }}>{tutorial.name}</Text>
                    <Text numberOfLines={1} style={{ fontSize: 12, color: COLORS.commentText }}>{tutorial.brief} </Text>
                </View>
                <TouchableOpacity>
                    {ICON.doneCircle(22, COLORS.green)}
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default DoneTodoItem

const styles = StyleSheet.create({})