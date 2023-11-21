import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react';
import { BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import styles from './style'
import CardTitle from '../../components/CardTitle'
import Tag from '../../components/Tag'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import COLORS from '../../constants/COLORS';
import { ICON } from '../../constants/SVG/ICON';
import OptionsInModal from './components/OptionsInModal';
import NavigationHeader from './components/NavigationHeader';


const SpecificTutorial = ({ navigation, route }) => {
    const { tutorial } = route.params
    const { cover, level, colorie, brief, name, duration, _id } = tutorial
    const bottomSheetModalRef = useRef(null);
    // variables
    const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);
    // callbacks
    const handleModelOpen = useCallback(() => bottomSheetModalRef.current?.present(), []);
    const handleModelClose = () => bottomSheetModalRef.current?.dismiss()

    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>

                <NavigationHeader handleModelOpen={handleModelOpen} />
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
                        <Tag content={['零噪音', "nihao"]} />
                        <View style={styles.tutorialIntro}>
                            <View style={styles.tutorialIntroLeft}>
                                <View style={{ marginRight: 6 }}>
                                    <Text className='commentText'>{level}</Text>
                                </View>
                                <View>
                                    <Text>{duration} <Text>min</Text></Text>
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
                            {/* {equipments.map(item => <View className="specificTutorialPage-detail-equipments-item">{item}</View>)} */}
                            <Tag content={tutorial.equipments} />
                        </View>
                        {/* to do */}
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 600 }}>练习频次: need to do</Text>
                            <Text>3-5次/周</Text>
                        </View>
                        <View style={{ height: 100 }}></View>
                    </ScrollView>
                </View >
                <View style={styles.BottomBar}>
                    <TouchableOpacity
                        style={styles.startBtn}
                        onPress={() => handleModelOpen()}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 500, color: '#fff' }}>Start Exercise</Text>
                    </TouchableOpacity>
                </View>
            </View >

            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                enablePanDownToClose
                snapPoints={snapPoints}
            >
                <OptionsInModal handleModelClose={handleModelClose} tutorial={tutorial} />
            </BottomSheetModal>
        </BottomSheetModalProvider >
    )
}

export default SpecificTutorial