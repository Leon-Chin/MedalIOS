import { ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import SIZE from '../../../constants/SIZE';
import BlogCardWithID from '../../../components/BlogCardWithID';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';

const LikeBlogs = () => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { currentUser } = useSelector(state => state.user)
    const [likeBlogs, setLikeBlogs] = useState([])
    useEffect(() => {
        if (currentUser?.likeBlogs && currentUser?.likeBlogs.length !== 0) {
            setLikeBlogs(currentUser.likeBlogs)
        }
    }, [currentUser])
    return (
        <View style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
            <ScrollView style={{ flex: 1, marginHorizontal: '3%', marginTop: SIZE.NormalMargin }}>
                {likeBlogs.map((item, index) => <BlogCardWithID blogID={item} key={index} />)}
            </ScrollView>
        </View>
    )
}

export default LikeBlogs