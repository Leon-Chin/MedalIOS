import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import styles from './style'
import CardTitle from '../../components/CardTitle'
import Tag from '../../components/Tag'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NavigationHeader from './components/NavigationHeader';
import SIZE from '../../constants/SIZE';
import { useState } from 'react';
import MoreOptionsModal from './components/MoreOptionsModal';
import BeforeStartExerciseModal from './components/BeforeStartExerciseModal';


const SpecificTutorial = ({ route }) => {
    const { tutorial } = route.params
    const { cover, level, colorie, brief, name, duration, _id } = tutorial
    const [MoreOptionsModalVisible, setMoreOptionsModalVisible] = useState(false)
    const [BeforeStartExerciseModalVisible, setBeforeStartExerciseModalVisible] = useState(false)

    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <NavigationHeader setVisible={setMoreOptionsModalVisible} />
                {/* cover of the tutorial */}
                <Image
                    source={{ uri: cover }}
                    style={styles.image}
                />
                {/* detail of the tutorial */}
                <View style={styles.details} >
                    <CardTitle title={name} />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                    >
                        <View style={styles.tutorialIntro}>
                            <View style={styles.tutorialIntroLeft}>
                                <View style={{ marginRight: 6 }}>
                                    <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: "bold", fontStyle: 'italic', }}>{level}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                    <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: "bold", fontStyle: 'italic', }}>{duration} </Text><Text>min</Text>
                                </View>
                            </View>
                            <View style={styles.tutorialIntroRight}>
                                <View style={{ marginRight: 6 }}>
                                    <Text>{tutorial.users.length} <Text style={styles.commentText}>人练过</Text></Text>
                                </View>
                                <View><Text>暂无评分</Text></View>
                                {/* {rate.length === 0 ? <View className="specificTutorialPage-detail-statistic-rate"><View className='commentText'>暂无评分</View></View> : <View className="specificTutorialPage-detail-statistic-rate">评分 9.0</View>} */}
                            </View>
                        </View>
                        <Text style={styles.tutorialDescription}>{tutorial.description}</Text>
                        <View style={styles.estimateColorie}>
                            <Text style={{ fontWeight: 500, fontSize: 16 }}>预估消耗(千卡)</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 600 }}>
                                    {tutorial.lowerEstimateColorie}~{tutorial.higherEstimateColorie}
                                </Text>
                                <MaterialCommunityIcons name="fire" size={24} color="black" />
                            </View>
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>Equipments Requirement:</Text>
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
                        <Text style={{ fontSize: 20, fontWeight: 500, color: '#fff' }}>Start Exercise</Text>
                    </TouchableOpacity>
                </View>
            </View >
            <MoreOptionsModal visible={MoreOptionsModalVisible} setVisible={setMoreOptionsModalVisible} tutorial={tutorial} />
            <BeforeStartExerciseModal visible={BeforeStartExerciseModalVisible} setVisible={setBeforeStartExerciseModalVisible} tutorial={tutorial} />
        </BottomSheetModalProvider >
    )
}

export default SpecificTutorial