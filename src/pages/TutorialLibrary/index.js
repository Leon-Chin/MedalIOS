import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TutorialsInLibrary from '../../constants/SVG/TutorialLibrary'
import { useNavigation } from '@react-navigation/native'
import ExerciseLogo from '../Home/components/ExerciseLogo'
import SIZE from '../../constants/SIZE'
import { useState } from 'react'
import { getalltutorial } from '../../api/user.api'
import { useEffect } from 'react'
import TutorialVerticalView from '../../components/TutorialVerticalView'

const TutorialLibrary = ({ route }) => {
    useEffect(() => {
        const selectType = route?.params?.selectType
        selectType && setSelectedType(selectType)
    }, [route])

    const { navigate } = useNavigation()
    const [selectedType, setSelectedType] = useState()
    const [tutorials, setTutorials] = useState([])
    const getLibs = async (type) => {
        await getalltutorial().then(res => {
            setTutorials(res)
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        getLibs()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: '3%', paddingVertical: 10, overflow: 'visible' }}>
                <FlatList
                    data={TutorialsInLibrary}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ columnGap: 10 }}
                    renderItem={({ item, index }) => <TouchableOpacity onPress={() => { setSelectedType(item.name) }}><ExerciseLogo key={index} exerciseName={item.name}>{item.icon}</ExerciseLogo></TouchableOpacity>}
                />
            </View>
            <View style={{ flex: 1, marginHorizontal: '3%' }}>
                {!selectedType &&
                    <View>
                        <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', marginBottom: SIZE.NormalMargin }}>为您精选</Text>
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
                        <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', marginBottom: SIZE.NormalMargin }}>{selectedType}</Text>
                        <FlatList
                            data={tutorials}
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