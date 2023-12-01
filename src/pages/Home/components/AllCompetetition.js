import React from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import COLORS from '../../../constants/COLORS';
import { useNavigation } from '@react-navigation/native';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';
const model = require('../../../../assets/images/model.png');
const AllCompetitionsCard = () => {
    const navigation = useNavigation()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return (
        <TouchableOpacity
            onPress={() => { navigation.navigate('AllCompetitions') }}
            style={{
                flex: 1,
                flexDirection: 'row',
                height: 100,
                paddingVertical: 8,
                paddingHorizontal: 10,
                backgroundColor: currentTheme.contentColor,
                justifyContent: 'space-around',
                alignItems: 'center',
                borderRadius: 10,
            }}>
            <View>
                <Text style={{ fontSize: 16, fontWeight: '600', color: currentTheme.fontColor }}>
                    {'赛事'}
                </Text>
                <Text style={{ fontSize: 10, marginTop: 6, color: COLORS.commentText, fontFamily: 'Poppins-Light' }}>
                    {'卡路里挑战'}
                </Text>
            </View>
            <View style={{ height: 70, width: 70, borderRadius: 10, overflow: 'hidden' }}>
                <View style={{ height: '100%', width: '100%', backgroundColor: COLORS.commentText, transform: [{ rotateY: '180deg' }], }}><Image source={model} resizeMode="cover" style={{ height: '100%', width: '100%' }}></Image></View>
            </View>
        </TouchableOpacity>
    );
};
export default AllCompetitionsCard