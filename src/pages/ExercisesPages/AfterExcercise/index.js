import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import SIZE from '../../../constants/SIZE'
import COLORS from '../../../constants/COLORS'
import { ICON } from '../../../constants/SVG/ICON'

const AfterExcercise = ({ route }) => {
    const [tutorial, setTutorial] = useState()
    useEffect(() => {
        if (route.params?.tutorial) {
            setTutorial(route.params.tutorial)
        }
    }, [route.params])
    const { navigate } = useNavigation()
    const navigateToWarm = () => {
        navigate("AllTutorials", { selectType: 'cooldown' })
    }
    return (
        <View>
            <Text>AfterExcercise</Text>
            <View
                onPress={() => navigate()}
            >
                <Text>接着做一个伸展运动吧，更有效缓解疲劳</Text>
                <TouchableOpacity
                    onPress={navigateToWarm}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SIZE.NormalMargin, backgroundColor: COLORS.backgroundGray, marginTop: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius }}>
                    <View style={{ flexDirection: 'row', alignItems: "center", gap: SIZE.NormalMargin }}>
                        <ImageBackground
                            source={{ uri: "https://www.popsci.com/uploads/2020/09/29/FWYNMFTCAJBFRBHP7CIRI2O26U.jpg?auto=webp&optimize=high&width=1440" }}
                            style={{
                                borderRadius: SIZE.CardBorderRadius, overflow: 'hidden',
                                height: 50,
                                width: 50,
                            }}>
                        </ImageBackground>
                        <View>
                            <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.black }}>
                                Warm Up
                            </Text>
                        </View>
                    </View>
                    {ICON.right(24, COLORS.black)}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AfterExcercise

const styles = StyleSheet.create({})