import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../../../constants/COLORS';
import { useNavigation } from '@react-navigation/native';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';
import { useIntl } from 'react-intl';

const couple = require('../../../../assets/images/couple.jpg');

const AllTutorialsCard = () => {
    const { formatMessage } = useIntl()
    const navigation = useNavigation()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return (
        <TouchableOpacity
            onPress={() => { navigation.navigate('AllTutorials') }}
            style={{
                flex: 1,
                flexDirection: 'row',
                height: 100,
                paddingVertical: 4,
                backgroundColor: currentTheme.contentColor,
                justifyContent: 'space-around',
                alignItems: 'center',
                borderRadius: 10,
            }}>
            <View style={{}}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: currentTheme.fontColor }}>
                    {formatMessage({ id: 'app.tut.allTut' })}
                </Text>
                <Text style={{ fontSize: 10, marginTop: 6, color: COLORS.commentText, fontFamily: 'Poppins-Light' }}>
                    {formatMessage({ id: 'app.tut.briefCard' })}
                </Text>
            </View>
            <View style={{ height: 70, width: 70, borderRadius: 10, overflow: 'hidden' }}>
                <View style={{ height: '100%', width: '100%' }}><Image source={couple} resizeMode="cover" style={{ height: '100%', width: '100%' }}></Image></View>
            </View>
        </TouchableOpacity>
    );
};
export default AllTutorialsCard