import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import styles from './style'
import CardTitle from '../../components/CardTitle'
import Tag from '../../components/Tag'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NavigationHeader from './components/NavigationHeader';
import SIZE from '../../constants/SIZE';
import { useEffect, useState } from 'react';
import MoreOptionsModal from './components/MoreOptionsModal';
import BeforeStartExerciseModal from './components/BeforeStartExerciseModal';
import useUserTheme from '../../hooks/useUserTheme';
import APPTHEME from '../../constants/COLORS/APPTHEME';
import { ICON } from '../../constants/SVG/ICON';
import { useIntl } from 'react-intl';
const { width } = Dimensions.get('window')

const SpecificTutorial = ({ route }) => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    useEffect(() => {
        setTutorial(route.params.tutorial)
    }, [route.params])
    const [tutorial, setTutorial] = useState(route.params.tutorial)
    const { cover, level, colorie, brief, name, duration, _id } = tutorial
    const [MoreOptionsModalVisible, setMoreOptionsModalVisible] = useState(false)
    const [BeforeStartExerciseModalVisible, setBeforeStartExerciseModalVisible] = useState(false)

    return (
        <BottomSheetModalProvider>
            <View style={{
                flex: 1,
                backgroundColor: currentTheme.backgroundColor
            }}>
                <NavigationHeader setVisible={setMoreOptionsModalVisible} />
                {/* cover of the tutorial */}
                <Image
                    source={{ uri: cover }}
                    style={styles.image}
                />
                {/* detail of the tutorial */}
                <View style={{
                    flex: 1,
                    marginTop: -50,
                    borderTopRightRadius: 25,
                    borderTopLeftRadius: 25,
                    width: width,
                    backgroundColor: currentTheme.contentColor,
                    paddingHorizontal: 16
                }} >
                    <CardTitle title={name} />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                    >
                        <View style={{
                            paddingVertical: 10,
                            backgroundColor: currentTheme.backgroundColor,
                            paddingHorizontal: SIZE.NormalMargin,
                            borderRadius: SIZE.CardBorderRadius,
                            marginBottom: SIZE.NormalMargin,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <View style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}>
                                <View style={{ marginRight: 6 }}>
                                    <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: "bold", fontStyle: 'italic', color: currentTheme.fontColor }}>{level}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                    <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: "bold", fontStyle: 'italic', color: currentTheme.fontColor }}>{duration} </Text><Text style={{ color: currentTheme.fontColor }}>{formatMessage({ id: 'app.exercises.durationUnit' })}</Text>
                                </View>
                            </View>
                            <View style={styles.tutorialIntroRight}>
                                <View style={{ marginRight: 6 }}>
                                    <Text style={{ color: currentTheme.fontColor }}>{tutorial.users.length} <Text style={{ color: currentTheme.fontColor }}>{formatMessage({ id: 'app.exercises.pracCount' })}</Text></Text>
                                </View>
                                <View><Text style={{ color: currentTheme.fontColor }}>{formatMessage({ id: 'app.exercises.noMark' })}</Text></View>
                                {/* {rate.length === 0 ? <View className="specificTutorialPage-detail-statistic-rate"><View className='commentText'>暂无评分</View></View> : <View className="specificTutorialPage-detail-statistic-rate">评分 9.0</View>} */}
                            </View>
                        </View>
                        <Text style={{ textAlign: 'justify', marginBottom: 10, color: currentTheme.fontColor }}>{tutorial.description}</Text>
                        <View style={styles.estimateColorie}>
                            <Text style={{ fontWeight: 500, fontSize: 16, color: currentTheme.fontColor }}>{formatMessage({ id: 'app.exercises.calorieEstimate' })}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 600, color: currentTheme.fontColor }}>
                                    {tutorial.lowerEstimateColorie}~{tutorial.higherEstimateColorie}
                                </Text>
                                <MaterialCommunityIcons name="fire" size={24} color={currentTheme.fontColor} />
                            </View>
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: 600, marginBottom: 10, color: currentTheme.fontColor }}>{formatMessage({ id: 'app.exercises.equipReq' })}</Text>
                        <View style={styles.equipments}>
                            <Tag content={tutorial.equipments} />
                        </View>
                        <View style={{ height: 100 }}></View>
                    </ScrollView>
                </View >
                <View style={styles.BottomBar}>
                    <TouchableOpacity
                        style={styles.startBtn}
                        onPress={() => setBeforeStartExerciseModalVisible(true)}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 500, color: '#fff' }}>{formatMessage({ id: 'app.exercises.startExercise' })}</Text>
                    </TouchableOpacity>
                </View>
            </View >
            <MoreOptionsModal visible={MoreOptionsModalVisible} setVisible={setMoreOptionsModalVisible} tutorial={tutorial} />
            <BeforeStartExerciseModal setTutorial={setTutorial} visible={BeforeStartExerciseModalVisible} setVisible={setBeforeStartExerciseModalVisible} tutorial={tutorial} />
        </BottomSheetModalProvider >
    )
}

export default SpecificTutorial