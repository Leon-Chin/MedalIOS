import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { Avatar } from '@rneui/base';
import COLORS from '../../constants/COLORS';
import MyExercisesCard from './components/MyExercisesCard';
import MyBlogsCard from './components/MyBlogsCard';
import OverallExerciseCard from './components/OverallExerciseCard'
import BodyMetric from './components/BodyMetric'
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
    const { currentUser } = useSelector((state => state.user))
    const { navigate } = useNavigation()
    const { _id, name, personalStatus, age, preferedTheme, preferedLanguage, gender, avator, birthday, hpNum } = currentUser
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ marginHorizontal: '3%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <TouchableOpacity onPress={() => navigate('PersonalDetails')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar source={{ uri: avator }} rounded size={52} />
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 6, color: COLORS.primary }}>{name}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Setting')}>
                    <Ionicons name="settings-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <MyExercisesCard />
            <MyBlogsCard />
            <View style={{ flexDirection: 'row', marginHorizontal: '3%' }}>
                <OverallExerciseCard />
                <View style={{ width: 10 }} />
                <BodyMetric />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: COLORS.commentText, fontSize: 12, marginTop: 10 }}>--没有更多内容--</Text>
            </View>
        </SafeAreaView >
    )
}

export default Profile

const styles = StyleSheet.create({})