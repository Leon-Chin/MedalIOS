import { StyleSheet, ImageBackground, TouchableOpacity, View, Image, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar } from '@rneui/base'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { cancellikeblog, getspecificblog, getuser, likeblog } from '../api/user.api'
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import COLORS from '../constants/COLORS'
import { Video, ResizeMode } from 'expo-av';
import SIZE from '../constants/SIZE'
import { ICON } from '../constants/SVG/ICON'
import useUserTheme from '../hooks/useUserTheme'
import APPTHEME from '../constants/COLORS/APPTHEME'

const BlogCardWithID = ({ blogID }) => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { currentUser } = useSelector(state => state.user)
    const [blog, setBlog] = useState({})
    const { userID, title, likesUsers, imgUrl, blogType, videoUrl, width, height } = blog
    const { navigate } = useNavigation()
    const { _id } = currentUser
    const [liked, setLiked] = useState(likesUsers ? likesUsers?.includes(_id) : false)
    const [likedNum, setLikeNum] = useState(likesUsers ? likesUsers?.length : 0)
    const [user, setUser] = useState()
    const getUserData = async () => {
        await getuser(userID)
            .then(user => {
                setUser(user)
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        Object.keys(blog).length !== 0 && getUserData();
    }, [blog])

    const getBlog = async () => {
        await getspecificblog(blogID).then(res => {
            if (res.status !== false) {
                setBlog(res)
            }
        })
    }

    useEffect(() => {
        getBlog()
    }, [blogID])

    const handleLikeBlog = async (blogID) => {
        liked ? await cancellikeblog(blogID).then(() => {
            setLikeNum(likedNum - 1)
            setLiked(false)
        }).catch((err) => {
            console.log(err);
        }) : await likeblog(blogID).then(() => {
            setLikeNum(likedNum + 1)
            setLiked(true)
        }).catch(() => {
            console.log('err');
        })
    }
    return (
        <TouchableOpacity
            style={{
                borderRadius: SIZE.CardBorderRadius,
                marginBottom: 10,
                backgroundColor: currentTheme.contentColor,
            }}
            onPress={() => Object.keys(blog).length !== 0 && navigate('SpecificBlog', { blog, user })}>
            {Object.keys(blog).length !== 0 && <View style={{ flex: 1, borderTopLeftRadius: 15, borderTopRightRadius: 15, overflow: 'hidden' }}>
                {(blogType && blogType === 'video') && <Video
                    style={{ height: 300 }}
                    source={{
                        uri: videoUrl,
                    }}
                    useNativeControls={false}
                    resizeMode={ResizeMode.COVER}
                />}
                {(imgUrl && imgUrl.length !== 0) && <ImageBackground
                    source={{ uri: imgUrl[0] }}
                    resizeMode='cover'
                    style={{ width: '100%', height: 300 }}
                />}
                {(blogType && blogType === 'video') && <FontAwesome style={{ position: 'absolute', top: 10, right: 10 }} name="play-circle" size={36} color={COLORS.commentText} />}
            </View>}
            {Object.keys(blog).length !== 0 ? <View
                style={{
                    backgroundColor: currentTheme.contentColor,
                    width: '100%',
                    padding: 10,
                    borderRadius: 15,
                    overflow: 'hidden'
                }}
            >
                <View style={{ marginBottom: 10 }}>
                    <Text numberOfLines={2} style={{ marginBottom: 2, fontSize: 18, fontWeight: '500', color: currentTheme.fontColor }}>
                        {title && title}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {(user && user) ? <Avatar
                            size={36}
                            rounded
                            source={{ uri: user?.avator }}
                        /> : <Ionicons name="person-circle-sharp" size={36} color="black" />}
                        {user && <Text style={{ marginLeft: 4, fontSize: 16, fontWeight: '600', color: COLORS.commentText }}>{user.name}</Text>}
                    </View>
                    <TouchableOpacity onPress={() => handleLikeBlog(blog._id)}><AntDesign name="like1" size={24} color={liked ? COLORS.primary : COLORS.commentText} /></TouchableOpacity>
                </View>
            </View> : <View style={{
                width: '100%',
                borderRadius: 15,
                overflow: 'hidden',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: SIZE.NormalMargin,
                gap: SIZE.LittleMargin,
                paddingVertical: SIZE.LargerMargin
            }}>
                <Text style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.commentText }}>已无法无法找到该动态</Text>
                {ICON.frowno(24, COLORS.commentText)}
            </View>}
        </TouchableOpacity >
    )
}

export default BlogCardWithID

const styles = StyleSheet.create({})