import { Text, View } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import COLORS from '../../../constants/COLORS';
import { useNavigation } from '@react-navigation/native';

const MyExercisesCard = () => {
    const { navigate } = useNavigation()
    return (
        <View style={{ backgroundColor: '#fff', marginHorizontal: '3%', marginBottom: 10, padding: '3%', borderRadius: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Exercises</Text>
            <View style={{ flexDirection: 'row', height: 80, justifyContent: 'space-around' }}>
                <TouchableOpacity
                    onPress={() => navigate('ExercisesOverview', { screen: 'FavoriteTutorial' })}
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        height: 100,
                        paddingVertical: 4,
                        paddingHorizontal: 10,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        borderRadius: 10,
                    }}>
                    <View style={{ height: 60, width: 60, borderRadius: 10, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary }}>
                        <Entypo name="add-to-list" size={30} color="#fff" />
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>
                            {'收藏课程'}
                        </Text>
                        <Text style={{ fontSize: 10, marginTop: 6, color: COLORS.commentText, fontFamily: 'Poppins-Light' }}>
                            {'0 节课程'}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate('ExercisesOverview', { screen: 'PractisedTutorial' })}
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        height: 100,
                        paddingVertical: 4,
                        paddingHorizontal: 10,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        borderRadius: 10,
                    }}>
                    <View style={{ height: 60, width: 60, borderRadius: 10, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.gray }}>
                        <Entypo name="list" size={30} color="#fff" />
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>
                            {'练过课程'}
                        </Text>
                        <Text style={{ fontSize: 10, marginTop: 6, color: COLORS.commentText, fontFamily: 'Poppins-Light' }}>
                            {'0 节课程'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default MyExercisesCard