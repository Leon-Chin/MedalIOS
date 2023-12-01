import { Alert, ScrollView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import TutorialHorizontalWithID from '../../../components/TutorialHorizontalWithID';
import SIZE from '../../../constants/SIZE';
import BlogCardWithID from '../../../components/BlogCardWithID';
import { getmyblog } from '../../../api/user.api';
import BlogCard from '../../../components/BlogCard';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';

const MyBlogs = () => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { currentUser } = useSelector(state => state.user)
    const [blogs, setBlogs] = useState([])

    const getBlogs = async () => {
        await getmyblog().then(res => {
            if (res.status !== false) {
                setBlogs(res)
            } else {
                Alert.alert("出现异常请稍后重试")
            }
        })
    }
    useEffect(() => {
        getBlogs()
    }, [currentUser])

    return (
        <View style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
            <ScrollView style={{ flex: 1, marginHorizontal: '3%', marginTop: SIZE.NormalMargin }}>
                {blogs.map((item, index) => <BlogCard blog={item} key={index} />)}
            </ScrollView>
        </View>
    )
}

export default MyBlogs