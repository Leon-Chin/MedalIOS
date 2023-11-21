import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TutorialLibrary from './components/TutorialLibrary'
import Header from './components/Header';
import AllTutorialsCard from './components/AllTutorialsCard';
import AllCompetitionsCard from './components/AllCompetetition';
import ExerciseLogo from './components/ExerciseLogo';
import Exercies from '../../constants/SVG/AllExercises'
import { ScrollView } from 'react-native';
import BlogsPromo from './components/BlogsPromo';
import { useNavigation } from '@react-navigation/native';
import StepCounter from './components/StepCounter';
import DistanceCounter from './components/DistanceCounter';
import ColorieCard from './components/ColorieCard';
import TimeCard from './components/TimeCard';
const Home = () => {
    const { navigate } = useNavigation()
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ marginHorizontal: '3%', marginBottom: 10 }}>
                <Header />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: '3%', overflow: 'visible' }}>
                    <FlatList
                        data={Exercies}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ columnGap: 10 }}
                        renderItem={({ item, index }) => <TouchableOpacity onPress={() => { navigate(item.name) }}><ExerciseLogo key={index} exerciseName={item.name}>{item.icon}</ExerciseLogo></TouchableOpacity>}
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
                    <AllTutorialsCard />
                    <View style={{ width: 10 }}></View>
                    <AllCompetitionsCard />
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