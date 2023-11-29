import { ScrollView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import TutorialHorizontalWithID from '../../../components/TutorialHorizontalWithID';
import SIZE from '../../../constants/SIZE';

const FavoriteTutorial = () => {
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
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, marginHorizontal: '3%', marginTop: SIZE.NormalMargin }}>
                {favoriteTutorials.map((item, index) => <TutorialHorizontalWithID tutorialID={item} key={index} />)}
            </ScrollView>
        </View>
    )
}

export default FavoriteTutorial