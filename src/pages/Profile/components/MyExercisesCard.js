import { Text, View } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import COLORS from '../../../constants/COLORS';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import SIZE from '../../../constants/SIZE';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';
import { useIntl } from 'react-intl';

<<<<<<< Updated upstream
const MyExercisesCard = () => {
=======
const MyExercisesCard = ({ noMargin, noTitle }) => {
    const { formatMessage } = useIntl()
>>>>>>> Stashed changes
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { currentUser } = useSelector(state => state.user)
    const [favoriteTutorials, setFavoriteTutorials] = useState([])
    const [practicedTutorials, setPracticedTutorials] = useState([])
    useEffect(() => {
        if (currentUser?.favoriteTutorials && currentUser?.favoriteTutorials.length !== 0) {
            setFavoriteTutorials(currentUser.favoriteTutorials)
        }
        if (currentUser?.practicedTutorials && currentUser?.practicedTutorials.length !== 0) {
            setPracticedTutorials(currentUser.practicedTutorials)
        }
    }, [currentUser])
    const { navigate } = useNavigation()
    return (
<<<<<<< Updated upstream
        <View style={{ backgroundColor: currentTheme.contentColor, marginHorizontal: '3%', marginBottom: 10, padding: '3%', borderRadius: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: currentTheme.fontColor }}>Exercises</Text>
=======
        <View style={{ backgroundColor: currentTheme.contentColor, marginHorizontal: noMargin ? "0" : '3%', marginBottom: 10, padding: '3%', borderRadius: 20 }}>
            {!noTitle && <Text style={{ fontSize: 20, fontWeight: 'bold', color: currentTheme.fontColor }}>{formatMessage({ id: 'app.profile.exercises' })}</Text>}
>>>>>>> Stashed changes
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
                        <Text style={{ fontSize: 16, fontWeight: '600', color: currentTheme.fontColor }}>
                        {formatMessage({ id: 'app.profile.favExe' })}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 6, }}>
                            <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: currentTheme.fontColor }}>{favoriteTutorials.length}</Text>
                            <Text style={{ fontSize: 10, color: COLORS.commentText, fontFamily: 'Poppins-Light', }}>
                            {formatMessage({ id: 'app.profile.exerciseEnd' })}
                            </Text>
                        </View>
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
                        <Text style={{ fontSize: 16, fontWeight: '600', color: currentTheme.fontColor }}>
                        {formatMessage({ id: 'app.profile.pracExe' })}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 6, }}>
                            <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: currentTheme.fontColor }}>{practicedTutorials.length}</Text>
                            <Text style={{ fontSize: 10, color: COLORS.commentText, fontFamily: 'Poppins-Light', }}>
                            {formatMessage({ id: 'app.profile.exerciseEnd' })}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default MyExercisesCard