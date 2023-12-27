import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import COLORS from '../constants/COLORS';
import { useNavigation } from '@react-navigation/native';
import useUserTheme from '../hooks/useUserTheme';
import APPTHEME from '../constants/COLORS/APPTHEME';
import useUserLocale from '../hooks/useUserLocale';

const TutorialVerticalView = ({ tutorial }) => {
    const locale = useUserLocale()
    const { navigate } = useNavigation()
    const { cover, level, colorie, brief, zh_brief, name, zh_name, duration, _id } = tutorial
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return (
        <TouchableOpacity onPress={() => navigate('SpecificTutorial', { tutorial })}>
            <View
                style={{
                    flex: 1,
                    borderRadius: 15,
                    backgroundColor: currentTheme.contentColor,
                    overflow: 'hidden',
                    marginBottom: 10
                }}>
                <View style={{ borderRadius: 10, width: '100%', overflow: 'hidden' }}>
                    <ImageBackground
                        source={{ uri: cover }}
                        style={{
                            height: 150,
                            width: '100%',
                        }}
                        resizeMode="center"
                    >
                    </ImageBackground>
                    {/* tutorial level */}
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 5,
                            left: 10,
                            backgroundColor: COLORS.primary,
                            paddingHorizontal: 6,
                            paddingVertical: 4,
                            borderRadius: 6
                        }}>
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: '800'
                            }}>
                            {level}
                        </Text>
                    </View>
                    {/* tutorial duration */}
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 5,
                            right: 10,
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            paddingHorizontal: 6,
                            paddingVertical: 4,
                            borderRadius: 6
                        }}>
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: '800'
                            }}>
                            {duration} min
                        </Text>
                    </View>
                    {/* favorate */}
                    <View
                        style={{
                            position: 'absolute',
                            backgroundColor: '#fff',
                            padding: 5,
                            right: 10,
                            top: 10,
                            borderRadius: 5,
                        }}>
                        <MaterialCommunityIcons name="star" size={16} color={COLORS.primary} />
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: currentTheme.contentColor,
                        width: '100%',
                        padding: 10,
                        borderRadius: 15,
                        overflow: 'hidden'
                    }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 10, color: currentTheme.fontColor }}>
                        {locale === "en" ? name : zh_name}
                    </Text>
                    <Text numberOfLines={1} style={{ marginBottom: 2, color: currentTheme.fontColor }}>
                        {locale === "en" ? brief : zh_brief}
                    </Text>
                </View>
            </View>
        </TouchableOpacity >

    )
}

export default TutorialVerticalView
