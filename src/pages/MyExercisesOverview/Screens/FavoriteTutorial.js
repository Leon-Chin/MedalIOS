import { ScrollView, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import TutorialHorizontalWithID from '../../../components/TutorialHorizontalWithID';
import SIZE from '../../../constants/SIZE';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';

const FavoriteTutorial = () => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { currentUser } = useSelector(state => state.user)
    const [favoriteTutorials, setFavoriteTutorials] = useState([])
    useEffect(() => {
        if (currentUser?.favoriteTutorials && currentUser?.favoriteTutorials.length !== 0) {
            setFavoriteTutorials(currentUser.favoriteTutorials)
        }
    }, [currentUser])
    return (
        <View style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
            <ScrollView style={{ flex: 1, marginHorizontal: '3%', marginTop: SIZE.NormalMargin }}>
                {favoriteTutorials.map((item, index) => <TutorialHorizontalWithID tutorialID={item} key={index} />)}
            </ScrollView>
        </View>
    )
}

export default FavoriteTutorial