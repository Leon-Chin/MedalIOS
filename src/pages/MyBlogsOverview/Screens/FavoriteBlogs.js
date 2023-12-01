import { ScrollView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import SIZE from '../../../constants/SIZE';
import BlogCardWithID from '../../../components/BlogCardWithID';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';

const FavoriteBlogs = () => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { currentUser } = useSelector(state => state.user)
    const [favoriteBlogs, setFavoriteTutorials] = useState([])
    useEffect(() => {
        if (currentUser?.favoriteBlogs && currentUser?.favoriteBlogs.length !== 0) {
            setFavoriteTutorials(currentUser.favoriteBlogs)
        }
    }, [currentUser])
    const { navigate } = useNavigation()
    return (
        <View style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
            <ScrollView style={{ flex: 1, marginHorizontal: '3%', marginTop: SIZE.NormalMargin }}>
                {favoriteBlogs.map((item, index) => <BlogCardWithID blogID={item} key={index} />)}
            </ScrollView>
        </View>
    )
}

export default FavoriteBlogs