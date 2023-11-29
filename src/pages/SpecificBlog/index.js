import { Alert, Dimensions, FlatList, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import SlidePics from './Components/SlidePics';
import Tag from '../../components/Tag'
import { FormattedTime } from '../../utils/formatTime'
import COLORS from '../../constants/COLORS';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import SpecificBlogHeaderLeft from './Components/SpecificBlogHeaderLeft';
import SpecificBlogHeaderRight from './Components/SpecificBlogHeaderRight';
import { cancellikeblog, cancelfavoriteblog, favoriteblog, getblogcomments, likeblog, getuser, addcomment } from '../../api/user.api'
import OneComment from './Components/oneComment'
import { ResizeMode, Video } from 'expo-av';
import { ICON } from '../../constants/SVG/ICON';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { loginSuccess } from '../../redux/userSlice';

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('screen')
const SpecificBlog = ({ route }) => {
    const dispatch = useDispatch()
    // bottem sheet
    const bottomSheetModalRef = useRef(null);
    // variables
    const snapPoints = useMemo(() => ['15%', "25%"], []);
    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const { blog, user } = route.params
    const videoPlayer = useRef(null)
    const [playbackInstanceInfo, setPlaybackInstanceInfo] = useState({
        position: 0,
        duration: 0,
        state: 'Buffering'
    });
    const updatePlaybackCallback = (status) => {
        if (status.isLoaded) {
            setPlaybackInstanceInfo({
                ...playbackInstanceInfo,
                position: status.positionMillis,
                duration: status.durationMillis || 0,
                state: status.didJustFinish ? 'Ended' :
                    status.isBuffering ? 'Buffering' :
                        status.shouldPlay ? 'Playing' : 'Paused'
            })
        } else {
            if (status.isLoaded === false && status.error) {
                const errorMsg = `Encountered a fatal error during playback: ${status.error}`;
                console.log(errorMsg, 'error')
            }
        }
    }

    const { currentUser } = useSelector(state => state.user)
    const [blogID, setBlogID] = useState(blog._id)
    const { userID, title, likesUsers, favoriteUsers, blogType, videoUrl, width, height } = blog
    const { navigate } = useNavigation()
    const { _id } = currentUser
    const [liked, setLiked] = useState(likesUsers.includes(_id))
    const [likedNum, setLikeNum] = useState(likesUsers.length)
    const [favoritedNum, setFavoritedNum] = useState(favoriteUsers.length)
    const [favorited, setFavorited] = useState(favoriteUsers.includes(_id))
    const [comments, setComments] = useState()
    const [commentText, setCommentText] = useState()
    useEffect(() => {
        getBlogComments()
    }, [])
    const getBlogComments = async () => {
        await getblogcomments(blog._id).then(comments => {
            if (comments.status !== false) {
                setComments(comments)
                if (comments.length !== 0) {
                    const usersReqs = comments.map(async (comment) => {
                        return await getuser(comment.userID)
                    })
                    getWholeBlogInfo(usersReqs, comments)
                }
            } else {
                Alert.alert("出现异常请稍后重试")
            }
        }).catch(err => {
            Alert.alert("出现异常请稍后重试")
        })
    }
    const getWholeBlogInfo = async (userReq, comments) => {
        await Promise.all(userReq).then(res => {
            if (res.status !== false) {
                setComments(comments.map((comment, i) => { return { ...comment, commentUserInfo: res[i] } }))
            } else {
                Alert.alert("出现异常请稍后重试")
            }
        })
    }

    const handleLikeBlog = async () => {
        liked ? await cancellikeblog(blogID).then((res) => {
            if (res.status !== false) {
                dispatch(loginSuccess(res))
                setLikeNum(likedNum - 1)
                setLiked(false)
            } else {
                Alert.alert("出现异常请稍后重试")
            }
        }).catch((err) => {
            Alert.alert("出现异常请稍后重试")
        }) : await likeblog(blogID).then((res) => {
            if (res.status !== false) {
                console.log("res", res);
                console.log("res", res.likeBlogs);
                dispatch(loginSuccess(res))
                setLikeNum(likedNum + 1)
                setLiked(true)
            }
        }).catch((err) => {
            Alert.alert("出现异常请稍后重试")
        })
    }
    const handleFavoriteBlog = async () => {
        favorited ? await cancelfavoriteblog(blogID)
            .then((res) => {
                if (res.status !== false) {
                    dispatch(loginSuccess(res))
                    setFavoritedNum(favoritedNum - 1)
                    setFavorited(false)
                }
            }).catch((err) => {
                Alert.alert("出现异常请稍后重试")
            }) : await favoriteblog(blogID)
                .then((res) => {
                    if (res.status !== false) {
                        dispatch(loginSuccess(res))
                        setFavoritedNum(favoritedNum + 1)
                        setFavorited(true)
                    }
                }).catch((err) => {
                    Alert.alert("出现异常请稍后重试")
                })
    }

    const handleAddComment = async () => {
        // 在这里执行你想要的操作
        commentText && await addcomment({ blogID, content: commentText })
            .then((res) => {
                if (res.status !== false) {
                    getBlogComments()
                    setCommentText('')
                } else {
                    Alert.alert("出现异常请稍后重试")
                }
            }).catch(error => {
                Alert.alert("出现异常请稍后重试")
            })
    };
    return (
        <BottomSheetModalProvider>
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' >
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <View style={{ position: 'absolute', zIndex: 999, top: 0, height: 100, width: '100%', paddingHorizontal: '3%', backgroundColor: '#fff', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingBottom: 10 }}>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <SpecificBlogHeaderLeft blog={blog} user={user} />
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => handlePresentModalPress()}>
                                    {ICON.more(24, COLORS.black)}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 100 }}></View>
                        <ScrollView style={{ flex: 1 }}>
                            {blogType === 'picture' && <SlidePics imgs={blog.imgUrl} />}
                            {blogType === 'video' && <View style={{
                                width: ScreenWidth,
                                height: ScreenHeight * 0.6,
                                alignItems: 'center',
                            }}>
                                <Video
                                    ref={videoPlayer}
                                    useNativeControls
                                    resizeMode={ResizeMode.CONTAIN}
                                    style={{ width: '100%', flex: 1 }}
                                    onPlaybackStatusUpdate={updatePlaybackCallback}
                                    source={{ uri: blog.videoUrl }}
                                />
                            </View>
                            }
                            <View style={{ marginHorizontal: '3%' }}>
                                <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>{blog.title}</Text>
                                <Text style={{ marginBottom: 10 }}>{blog.content}</Text>
                                <Tag content={blog.tags} />
                                <Text style={{ color: COLORS.commentText, fontSize: 12, marginVertical: 10 }}>{FormattedTime(new Date(blog.createdAt))}</Text>
                            </View>
                            <View style={{ marginHorizontal: '3%', opacity: 0.4, height: 0.8, backgroundColor: COLORS.commentText }}></View>
                            <View style={{ marginHorizontal: '3%', paddingVertical: 10, }}>
                                <Text style={{ color: COLORS.black, marginBottom: 10 }}>共「<Text style={{ fontWeight: 'bold' }}>{comments && comments.length}</Text>」条评论</Text>
                                {comments && comments.map((item, index) => <OneComment key={index} comment={item} />)}
                            </View>
                        </ScrollView>
                        <View style={{
                            height: 70,
                            flexDirection: 'row',
                            backgroundColor: '#fff',
                            paddingBottom: 10,
                        }}>
                            <View style={{ flex: 0.7, justifyContent: 'center', alignItems: "center" }}>
                                <TextInput
                                    style={{
                                        height: 50,
                                        width: 240,
                                        borderRadius: 20,
                                        padding: 10,
                                    }}
                                    value={commentText}
                                    onChangeText={(commentText) => setCommentText(commentText)}
                                    returnKeyType='send'
                                    onSubmitEditing={handleAddComment}
                                    placeholder='请输入你的评论'
                                />
                            </View>
                            <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-around' }}>
                                <TouchableOpacity
                                    onPress={() => handleLikeBlog()}
                                    style={{ justifyContent: 'center', alignItems: "center", marginHorizontal: 4 }}
                                >
                                    <AntDesign name={liked ? "like1" : 'like2'} size={26} color={liked ? COLORS.primary : COLORS.black} />
                                    {likedNum === 0 ? <Text style={{ fontSize: 12 }}>Like</Text> : <Text style={{ fontSize: 12, marginLeft: 4 }}>{likedNum}</Text>}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleFavoriteBlog()}
                                    style={{ justifyContent: 'center', alignItems: "center", marginHorizontal: 4 }}
                                >
                                    <AntDesign name={favorited ? "star" : 'staro'} size={26} color={favorited ? COLORS.primary : COLORS.black} />
                                    {favoritedNum === 0 ? <Text style={{ fontSize: 12 }}>Favor</Text> : <Text style={{ fontSize: 12, marginLeft: 4 }}>{favoritedNum}</Text>}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView >
            </View >
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                enablePanDownToClose
                snapPoints={snapPoints}
            >
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => navigate("Report", { type: "blog", target: blog })}
                        style={{ height: 50, marginTop: 10, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Text style={{ fontSize: 18, color: 'red', fontWeight: 'bold' }}>举报</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>

    )
}

export default SpecificBlog

const styles = StyleSheet.create({})