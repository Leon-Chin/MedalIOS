import { Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons';
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

const MyBlogsCard = () => {
    const { formatMessage } = useIntl()
    const { navigate } = useNavigation()
    const { currentUser } = useSelector(state => state.user)
    const [likeBlogs, setLikeBlogs] = useState([])
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const [favoriteBlogs, setFavoriteBlogs] = useState([])
    useEffect(() => {
        if (currentUser?.likeBlogs && currentUser?.likeBlogs.length !== 0) {
            setLikeBlogs(currentUser.likeBlogs)
        }
        if (currentUser?.favoriteBlogs && currentUser?.favoriteBlogs.length !== 0) {
            setFavoriteBlogs(currentUser.favoriteBlogs)
        }
    }, [currentUser])
    return (
        <View style={{ backgroundColor: currentTheme.contentColor, marginHorizontal: '3%', marginBottom: 10, padding: '3%', borderRadius: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: currentTheme.fontColor }}>{formatMessage({ id: 'app.profile.myBlogs' })}</Text>
            <View style={{ flexDirection: 'row', height: 80 }}>
                <TouchableOpacity
                    onPress={() => navigate('MyBlogsOverview', { screen: 'LikeBlogs' })}
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
                        <Feather name="file-text" size={30} color="#fff" />
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: currentTheme.fontColor }}>
                        {formatMessage({ id: 'app.profile.likedBlogs' })}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 6, }}>
                            <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: currentTheme.fontColor }}>{likeBlogs.length}</Text>
                            <Text style={{ fontSize: 10, color: COLORS.commentText, fontFamily: 'Poppins-Light' }}>
                            {formatMessage({ id: 'app.profile.blogEnd' })}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate('MyBlogsOverview', { screen: 'FavoriteBlogs' })}
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
                        <Feather name="file-plus" size={30} color="#fff" />
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: currentTheme.fontColor }}>
                        {formatMessage({ id: 'app.profile.favBlogs' })}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 6, }}>
                            <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: currentTheme.fontColor }}>{favoriteBlogs.length}</Text>
                            <Text style={{ fontSize: 10, color: COLORS.commentText, fontFamily: 'Poppins-Light' }}>
                            {formatMessage({ id: 'app.profile.blogEnd' })}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default MyBlogsCard