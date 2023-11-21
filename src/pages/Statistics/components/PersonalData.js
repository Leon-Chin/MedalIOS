import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../../constants/COLORS'
import { ICON } from '../../../constants/SVG/ICON';
import { useNavigation } from '@react-navigation/native';

const PersonalData = () => {
    const { navigate } = useNavigation()
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
                    <Text style={{ fontSize: 26, fontWeight: 'bold' }}>78.0</Text>
                    <Text>Kg</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, gap: 6 }}>
                    <Text>BMI</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>--</Text>
                </View>
                <View style={{ flex: 1, gap: 6 }}>
                    <Text>体脂率</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 3 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>--</Text>
                        <Text>%</Text>
                    </View>
                </View>
                <View style={{ flex: 1, gap: 6 }}>
                    <Text>身高</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 3 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>177.0</Text>
                        <Text>cm</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default PersonalData

const styles = StyleSheet.create({})