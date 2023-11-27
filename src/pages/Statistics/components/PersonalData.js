import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../../constants/COLORS'
import { ICON } from '../../../constants/SVG/ICON';
import { useNavigation } from '@react-navigation/native';
import { getlatestmeasurement } from '../../../api/measurement';
import { useEffect } from 'react';
import { useState } from 'react';
import useMeasurement from '../../../hooks/useMeasurement';

const PersonalData = () => {
    const { navigate } = useNavigation()
    // const [latestMeasurement, setLatestMeasurement] = useState({})
    const { latestMeasurement } = useMeasurement()
    // const getLatestMeasurement = async () => {
    //     await getlatestmeasurement().then(res => {
    //         if (res.status !== false) {
    //             setLatestMeasurement(res)
    //         } else {
    //             Alert.alert("出现异常请稍后重试")
    //         }
    //     })
    // }
    // useEffect(() => {
    //     getLatestMeasurement()
    // }, [])
    return (
        <View style={{ marginHorizontal: '3%', marginBottom: 10, backgroundColor: '#fff', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14 }}>
            {/* title */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 14 }}>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        {ICON.weight(22, COLORS.green)}
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.green }}>身高体重</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigate('HeightWeight')}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        {ICON.right(18, COLORS.gray)}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginBottom: 10 }}>
                <Text style={{ marginBottom: 8, fontSize: 14 }}>体重</Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
                    {latestMeasurement?.weight ? <Text style={{ fontSize: 26, fontWeight: 'bold' }}>{latestMeasurement.weight}</Text> :
                        <Text style={{ fontSize: 26, fontWeight: 'bold' }}>--</Text>
                    }
                    <Text>Kg</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, gap: 6 }}>
                    <Text>BMI</Text>
                    {latestMeasurement?.BMI ? <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{latestMeasurement.BMI}</Text> :
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>--</Text>}
                </View>
                <View style={{ flex: 1, gap: 6 }}>
                    <Text>体脂率</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 3 }}>
                        {latestMeasurement?.bodyFatRate ? <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{latestMeasurement.bodyFatRate}</Text> :
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>--</Text>}
                        <Text>%</Text>
                    </View>
                </View>
                <View style={{ flex: 1, gap: 6 }}>
                    <Text>身高</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 3 }}>
                        {latestMeasurement?.height ? <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{latestMeasurement.height}</Text> :
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>--</Text>}
                        <Text>cm</Text>
                    </View>
                </View>
            </View>
        </View >
    )
}

export default PersonalData

const styles = StyleSheet.create({})