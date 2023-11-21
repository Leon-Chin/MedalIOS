import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../../constants/COLORS'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { exerciseLogo } from '../../../constants/SVG/AllExercises';

const AllDataCard = () => {
    return (
        <View style={{ marginHorizontal: '3%', marginBottom: 10, backgroundColor: '#fff', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14 }}>
            {/* title */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.black }}>各项运动数据</Text>
            </View>
            {/* first row */}
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, backgroundColor: COLORS.backgroundGray, padding: 10, borderRadius: 10, marginBottom: 10 }}>
                    <View style={{ marginBottom: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            {/* icon */}
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: 26, height: 26, backgroundColor: COLORS.primary, borderRadius: 9 }}>
                                {exerciseLogo.run(18)}
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.primary }}>跑步</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={{ color: COLORS.black, fontSize: 26, fontWeight: 'bold' }}>0</Text>
                        <Text style={{ color: COLORS.black, fontSize: 14, fontWeight: 'bold' }}>公里</Text>
                    </View>
                </View>
                <View style={{ width: 10 }}></View>
                <View style={{ flex: 1, backgroundColor: COLORS.backgroundGray, padding: 10, borderRadius: 10, marginBottom: 10 }}>
                    <View style={{ marginBottom: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            {/* icon */}
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: 26, height: 26, backgroundColor: COLORS.primary, borderRadius: 9 }}>
                                {exerciseLogo.walk(18)}
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.primary }}>步行</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={{ color: COLORS.black, fontSize: 26, fontWeight: 'bold' }}>0</Text>
                        <Text style={{ color: COLORS.black, fontSize: 14, fontWeight: 'bold' }}>步</Text>
                    </View>
                </View>
            </View>
            {/* second row */}
            <View style={{ flexDirection: 'row' }}>
                {/* colorie */}
                <View style={{ flex: 1, backgroundColor: COLORS.backgroundGray, padding: 10, borderRadius: 10, marginBottom: 10 }}>
                    <View style={{ marginBottom: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            {/* icon */}
                            <View style={{ width: 26, height: 26, backgroundColor: COLORS.colorieOrange, alignItems: 'center', justifyContent: 'center', borderRadius: 9 }}>
                                <FontAwesome5 name="fire" size={16} color="#fff" />
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.colorieOrange }}>卡路里</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={{ color: COLORS.black, fontSize: 26, fontWeight: 'bold' }}>0</Text>
                        <Text style={{ color: COLORS.black, fontSize: 14, fontWeight: 'bold' }}>千卡</Text>
                    </View>
                </View>
                <View style={{ width: 10 }}></View>
                {/* 健身 */}
                <View style={{ flex: 1, backgroundColor: COLORS.backgroundGray, padding: 10, borderRadius: 10, marginBottom: 10 }}>
                    <View style={{ marginBottom: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            {/* icon */}
                            <View style={{ width: 26, height: 26, backgroundColor: COLORS.purple, borderRadius: 9, justifyContent: 'center', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="lightning-bolt" size={18} color="#fff" />
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.purple }}>健身</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={{ color: COLORS.black, fontSize: 26, fontWeight: 'bold' }}>0</Text>
                        <Text style={{ color: COLORS.black, fontSize: 14, fontWeight: 'bold' }}>分钟</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default AllDataCard

const styles = StyleSheet.create({})