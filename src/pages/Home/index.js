import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
import TutorialLibrary from './components/TutorialLibrary'
import Header from './components/Header';
import AllTutorialsCard from './components/AllTutorialsCard';
import WeightCard from './components/WeightCard';
import ExerciseLogo from './components/ExerciseLogo';
import Exercies from '../../constants/SVG/AllExercises'
import { ScrollView } from 'react-native';
import BlogsPromo from './components/BlogsPromo';
import { useNavigation } from '@react-navigation/native';
import StepCounter from './components/StepCounter';
import DistanceCounter from './components/DistanceCounter';
import ColorieCard from './components/ColorieCard';
import TimeCard from './components/TimeCard';
import useUserTheme from '../../hooks/useUserTheme';
import APPTHEME from '../../constants/COLORS/APPTHEME';
import { useIntl } from 'react-intl';
import SIZE from '../../constants/SIZE';

const Home = () => {
    const intl = useIntl()
    const { navigate } = useNavigation()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
            <View style={{ marginHorizontal: '3%', marginBottom: 10 }}>
                <Header />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: '3%', marginBottom: SIZE.NormalMargin, overflow: 'visible' }}>
                    <FlatList
                        data={Exercies(intl.formatMessage)}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ columnGap: 10 }}
                        renderItem={({ item, index }) => <TouchableOpacity onPress={() => {
                            navigate("AllTutorials", {
                                selectType: {
                                    name: item.name,
                                    value: item.value,
                                }
                            })
                        }}><ExerciseLogo key={index} exerciseName={item.name}>{item.icon}</ExerciseLogo></TouchableOpacity>}
                    />
                </View>
                <View style={{ marginHorizontal: '3%', marginBottom: 10, flexDirection: 'row' }}>
                    <StepCounter />
                    <View style={{ width: 10 }}></View>
                    <DistanceCounter />
                </View>
                <View style={{ marginHorizontal: '3%', marginBottom: 10, flexDirection: 'row' }}>
                    <ColorieCard />
                    <View style={{ width: 10 }}></View>
                    <TimeCard />
                </View>
                <View style={{ marginHorizontal: '3%', flexDirection: 'row' }}>
                    <WeightCard />
                    <View style={{ width: 10 }}></View>
                    <AllTutorialsCard />
                </View>

                <View style={{ marginHorizontal: '3%' }}>
                    <TutorialLibrary />
                </View>

                <View style={{ marginHorizontal: '3%' }}>
                    <BlogsPromo />
                </View>
                <View style={{ height: 70 }}></View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;