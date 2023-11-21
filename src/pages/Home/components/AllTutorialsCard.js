import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../../../constants/COLORS';
import { useNavigation } from '@react-navigation/native';
const couple = require('../../../../assets/images/couple.jpg');

const AllTutorialsCard = () => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            onPress={() => { navigation.navigate('AllTutorials') }}
            style={{
                flex: 1,
                flexDirection: 'row',
                height: 100,
                paddingVertical: 4,
                paddingHorizontal: 10,
                backgroundColor: '#fff',
                justifyContent: 'space-around',
                alignItems: 'center',
                borderRadius: 10,
            }}>
            <View>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>
                    {'全部课程'}
                </Text>
                <Text style={{ fontSize: 10, marginTop: 6, color: COLORS.commentText, fontFamily: 'Poppins-Light' }}>
                    {'分类 详解'}
                </Text>
            </View>
            <View style={{ height: 70, width: 70, borderRadius: 10, overflow: 'hidden' }}>
                <View style={{ height: '100%', width: '100%' }}><Image source={couple} resizeMode="cover" style={{ height: '100%', width: '100%' }}></Image></View>
            </View>
        </TouchableOpacity>
    );
};
export default AllTutorialsCard