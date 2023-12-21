import { ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import SIZE from '../../../constants/SIZE';
import { getmyblog } from '../../../api/user.api';
import BlogCard from '../../../components/BlogCard';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { ERROR_MESSAGE } from '../../../constants/ERRORMessage';

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
                Toast.show(ERROR_MESSAGE)
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