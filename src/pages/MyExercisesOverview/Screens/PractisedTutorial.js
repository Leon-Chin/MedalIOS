import { ScrollView, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import TutorialHorizontalWithID from '../../../components/TutorialHorizontalWithID';
import SIZE from '../../../constants/SIZE';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';


const PractisedTutorial = () => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { currentUser } = useSelector(state => state.user)
    const [practicedTutorials, setPracticedTutorials] = useState([])
    useEffect(() => {
        if (currentUser?.practicedTutorials && currentUser?.practicedTutorials.length !== 0) {
            setPracticedTutorials(currentUser.practicedTutorials)
        }
    }, [currentUser])
    return (
        <View style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
            <ScrollView style={{ flex: 1, marginHorizontal: '3%', marginTop: SIZE.NormalMargin }}>
                {practicedTutorials.map((item, index) => <TutorialHorizontalWithID withCalender={true} tutorialID={item} key={index} />)}
            </ScrollView>
        </View>
    )
}

export default PractisedTutorial