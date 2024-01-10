import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TutorialsInLibrary from '../../constants/SVG/TutorialLibrary'
import ExerciseLogo from '../Home/components/ExerciseLogo'
import SIZE from '../../constants/SIZE'
import { useState } from 'react'
import { getalltutorial } from '../../api/user.api'
import { useEffect } from 'react'
import TutorialVerticalView from '../../components/TutorialVerticalView'
import { getrecommandtutorials, getspecifictypetutorials } from '../../api/tutorial.api'
import useUserTheme from '../../hooks/useUserTheme'
import APPTHEME from '../../constants/COLORS/APPTHEME'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { ERROR_Alert } from '../../constants/ERRORMessage'
import { useIntl } from 'react-intl'
import Loading from '../../components/Loading'
import NotFound from '../../components/NotFound'
import COLORS from '../../constants/COLORS'

const TutorialLibrary = ({ route }) => {
    const [loading, setLoading] = useState(false)
    const { formatMessage } = useIntl()
    const intl = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const [selectedType, setSelectedType] = useState()
    useEffect(() => {
        const selectType = route?.params?.selectType
        selectType && setSelectedType(selectType)
    }, [route])
    const [tutorials, setTutorials] = useState([])
    const [recommendedTutorials, setRecommandedTutorials] = useState([])
    const [specificTypeTutorials, setSpecificTutorials] = useState([])

    const getSpecificBlog = async () => {
        setLoading(true)
        const reqBody = { type: selectedType.value }
        await getspecifictypetutorials(reqBody).then(res => {
            if (res.status !== false) {
                setSpecificTutorials(res)
                console.log("res", res);
            } else {
                Toast.show(ERROR_Alert(formatMessage({ id: 'error.errorMsg' })))
            }
        })
        setLoading(false)
    }
    useEffect(() => {
        if (selectedType?.value) {
            if (selectedType.value === "recommand") {
                getRecommandTutorials()
            } else if (selectedType.value === "all") {
                setSpecificTutorials(tutorials)
            } else {
                getSpecificBlog()
            }
        }
    }, [selectedType])
    const getRecommandTutorials = async () => {
        setLoading(true)
        await getrecommandtutorials().then(res => {
            setRecommandedTutorials(res)
        }).catch(err => {
            console.log("err", err);
            setRecommandedTutorials([])
        })
        setLoading(false)
    }

    const getLibs = async () => {
        setLoading(true)
        await getalltutorial().then(res => {
            setTutorials(res)
        }).catch(err => {
            setTutorials([])
        })
        setLoading(false)
    }
    useEffect(() => {
        getLibs()
        getRecommandTutorials()
    }, [])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
            <View style={{ marginLeft: SIZE.NormalMargin, paddingTop: SIZE.NormalMargin, overflow: 'visible' }}>
                <FlatList
                    data={TutorialsInLibrary(intl.formatMessage)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ columnGap: 10 }}
                    renderItem={({ item, index }) => <TouchableOpacity onPress={() => { setSelectedType(item) }}><ExerciseLogo key={index} exerciseName={item.name}>{item.icon}</ExerciseLogo></TouchableOpacity>}
                />
            </View>
            <View style={{ flex: 1, marginHorizontal: '3%' }}>
                {(!selectedType && !loading) &&
                    <View>
                        <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', marginBottom: SIZE.NormalMargin, color: currentTheme.fontColor }}>{formatMessage({ id: 'app.tut.recommendation' })}</Text>
                        {recommendedTutorials.length === 0 && <View>
                            <NotFound />
                            <View style={{ padding: SIZE.NormalMargin, }}>
                                <Text style={{ fontSize: SIZE.NormalTitle, color: COLORS.commentText, fontWeight: 'bold' }}>
                                    {formatMessage({ id: 'app.calendar.noRecommendations' })}
                                </Text>
                            </View>
                        </View>}
                        <FlatList
                            data={recommendedTutorials}
                            renderItem={({ item, index }) => <TutorialVerticalView key={index} tutorial={item} />}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ columnGap: SIZE.NormalMargin }}
                        />
                    </View>
                }
                {(selectedType && !loading) &&
                    <View>
                        <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', marginBottom: SIZE.NormalMargin, color: currentTheme.fontColor }}>{selectedType.name}</Text>
                        {specificTypeTutorials.length === 0 && <View>
                            <NotFound />
                        </View>}
                        <FlatList
                            data={specificTypeTutorials}
                            renderItem={({ item, index }) => <TutorialVerticalView key={index} tutorial={item} />}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ columnGap: SIZE.NormalMargin }}
                        />
                    </View>
                }
                {loading && <Loading />}
            </View>
        </SafeAreaView>
    )
}

export default TutorialLibrary

const styles = StyleSheet.create({})