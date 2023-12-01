import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TutorialsInLibrary from '../../constants/SVG/TutorialLibrary'
import { useNavigation } from '@react-navigation/native'
import ExerciseLogo from '../Home/components/ExerciseLogo'
import SIZE from '../../constants/SIZE'
import { useState } from 'react'
import { getalltutorial } from '../../api/user.api'
import { useEffect } from 'react'
import TutorialVerticalView from '../../components/TutorialVerticalView'
import { getspecifictypetutorials } from '../../api/tutorial.api'
import useUserTheme from '../../hooks/useUserTheme'
import APPTHEME from '../../constants/COLORS/APPTHEME'

const TutorialLibrary = ({ route }) => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { navigate } = useNavigation()
    const [selectedType, setSelectedType] = useState()
    useEffect(() => {
        const selectType = route?.params?.selectType
        selectType && setSelectedType(selectType)
    }, [route])
    const [tutorials, setTutorials] = useState([])
    const [specificTypeTutorials, setSpecificTutorials] = useState([])

    const getSpecificBlog = async () => {
        const reqBody = { type: selectedType.value }
        console.log(reqBody);
        await getspecifictypetutorials(reqBody).then(res => {
            if (res.status !== false) {
                setSpecificTutorials(res)
                console.log("res", res);
            } else {
                Alert.alert("出现异常，请稍后重试")
            }
        })
    }
    useEffect(() => {
        if (selectedType?.value) {
            if (selectedType.value === "recommand") {

            } else if (selectedType.value === "all") {
                setSpecificTutorials(tutorials)
            } else {
                getSpecificBlog()
            }
        }
    }, [selectedType])

    const getLibs = async () => {
        await getalltutorial().then(res => {
            setTutorials(res)
        }).catch(err => {
            setTutorials([])
        })
    }
    useEffect(() => {
        getLibs()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
            <View style={{ paddingHorizontal: '3%', paddingVertical: 10, overflow: 'visible' }}>
                <FlatList
                    data={TutorialsInLibrary}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ columnGap: 10 }}
                    renderItem={({ item, index }) => <TouchableOpacity onPress={() => { setSelectedType(item) }}><ExerciseLogo key={index} exerciseName={item.name}>{item.icon}</ExerciseLogo></TouchableOpacity>}
                />
            </View>
            <View style={{ flex: 1, marginHorizontal: '3%' }}>
                {!selectedType &&
                    <View>
                        <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', marginBottom: SIZE.NormalMargin, color: currentTheme.fontColor }}>为您精选</Text>
                        <FlatList
                            data={tutorials}
                            renderItem={({ item, index }) => <TutorialVerticalView key={index} tutorial={item} />}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ columnGap: 10 }}
                        />
                    </View>
                }
                {selectedType &&
                    <View>
                        <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', marginBottom: SIZE.NormalMargin, color: currentTheme.fontColor }}>{selectedType.name}</Text>
                        <FlatList
                            data={specificTypeTutorials}
                            renderItem={({ item, index }) => <TutorialVerticalView key={index} tutorial={item} />}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ columnGap: 10 }}
                        />
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

export default TutorialLibrary

const styles = StyleSheet.create({})