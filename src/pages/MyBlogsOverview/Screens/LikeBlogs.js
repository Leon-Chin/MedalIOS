import { ScrollView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import SIZE from '../../../constants/SIZE';
import BlogCardWithID from '../../../components/BlogCardWithID';

const LikeBlogs = () => {
    const { currentUser } = useSelector(state => state.user)
    const [likeBlogs, setLikeBlogs] = useState([])
    useEffect(() => {
        if (currentUser?.likeBlogs && currentUser?.likeBlogs.length !== 0) {
            setLikeBlogs(currentUser.likeBlogs)
        }
    }, [currentUser])
    const { navigate } = useNavigation()
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, marginHorizontal: '3%', marginTop: SIZE.NormalMargin }}>
                {likeBlogs.map((item, index) => <BlogCardWithID blogID={item} key={index} />)}
            </ScrollView>
        </View>
    )
}

export default LikeBlogs