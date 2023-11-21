import React from 'react'
import { useSelector } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
    Image,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import COLORS from '../constants/COLORS';
import { useNavigation } from '@react-navigation/native';

const TutorialVerticalView = ({ tutorial }) => {
    const { navigate } = useNavigation()
    const { cover, level, colorie, brief, name, duration, _id } = tutorial
    return (
        <TouchableOpacity onPress={() => navigate('SpecificTutorial', { tutorial })}>
            <View
                style={{
                    flex: 1,
                    borderRadius: 15,
                    backgroundColor: '#fff',
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
                        backgroundColor: 'white',
                        width: '100%',
                        padding: 10,
                        borderRadius: 15,
                        overflow: 'hidden'
                    }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 10 }}>
                        {name}
                    </Text>
                    <Text numberOfLines={1} style={{ marginBottom: 2 }}>
                        {brief}
                    </Text>
                </View>
            </View>
        </TouchableOpacity >

    )
}

export default TutorialVerticalView
