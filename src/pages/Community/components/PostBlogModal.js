import { Alert, Dimensions, Image, Keyboard, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SIZE from '../../../constants/SIZE'
import { ICON } from '../../../constants/SVG/ICON'
import COLORS from '../../../constants/COLORS'
import { TextInput } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../../../../firebase'
import { postblog } from '../../../api/user.api'
import { Video, ResizeMode } from 'expo-av';
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { ERROR_Alert, SUCCESS_Alert } from '../../../constants/ERRORMessage'
import { useIntl } from 'react-intl'
import UploadProgressModal from '../../../components/UploadProgressModal'

const { width } = Dimensions.get('screen')

const PostBlogModal = ({ visible, setVisible }) => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [blogType, setBlogType] = useState('text')
    const [blogImgs, setBlogImgs] = useState([])
    const [blogVideo, setBlogVideo] = useState({})

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 0.6,
            })

            if (!result.canceled) {
                const imageHeight = result.assets[0].height
                const imageWidth = result.assets[0].width
                await uploadImage(result.assets[0].uri, "picture", imageHeight, imageWidth)
            }
        } catch (e) {
            Toast.show(ERROR_Alert(formatMessage({ id: 'error.errorMsg' })))
            Alert.alert("Error")
            // console.error("image erro", e);
        }

    }
    const pickVideo = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: false,
                quality: 0.4,
            })

            if (!result.canceled) {
                const videoHeight = result.assets[0].height
                const videoWidth = result.assets[0].width
                console.log("videoHeight", videoHeight);
                console.log("videoWidth", videoWidth);
                await uploadImage(result.assets[0].uri, "video", videoHeight, videoWidth)
            }
        } catch (e) {
            Alert.alert("Cannot handle the type of picked image")
            Toast.show(ERROR_Alert(formatMessage({ id: 'error.errorMsg' })))
            console.error("video erro", e);
        }
    }
    const [progress, setProgress] = useState(null)
    const uploadImage = async (uri, fileType, height, width) => {
        const response = await fetch(uri);
        const blob = await response.blob()
        const storageRef = ref(storage, `mobile-message-${fileType}-${parseInt((new Date().getTime() / 1000).toString())}`);
        const uploadTask = uploadBytesResumable(storageRef, blob);
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress.toFixed(2))
        },
            (error) => {
                Toast.show(ERROR_Alert(formatMessage({ id: 'error.errorMsg' })))
                setProgress(null)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('already exsity', downloadURL);
                    if (fileType === "picture") {
                        setBlogImgs(preImgs => {
                            if (preImgs.length === 0) {
                                return [{ id: 1, url: downloadURL, height, width }]
                            } else {
                                return [...preImgs, { id: preImgs[preImgs.length - 1].id + 1, url: downloadURL, height, width }]
                            }
                        })
                    } else {
                        setBlogVideo({ url: downloadURL, height, width })
                    }
                    setProgress(null)
                });
            }
        );
    }

    const postBlog = async () => {
        let handledItems = {
            title,
            content,
            blogType,
        }
        if (blogType) {
            if (blogType === 'picture') {
                const imgUrl = blogImgs.map(item => item.url)
                handledItems = { ...handledItems, imgUrl, width: blogImgs[0].imgWidth, height: blogImgs[0].imgHeight }
            } else if (blogType === 'video') {
                const { height, width, url } = blogVideo
                handledItems = { ...handledItems, videoUrl: url, height, width }
            } else if (blogType === 'text') {
                handledItems = { ...handledItems }
            } else {
                Toast.show(ERROR_Alert(formatMessage({ id: 'error.errorMsg' })))
                return
            }
        }
        try {
            console.log("handledItems", handledItems);
            await postblog(handledItems).then(res => {
                console.log("res", res);
                if (res.status !== false) {
                    Toast.show(SUCCESS_Alert(formatMessage({ id: "success.publishSuccess" })))
                    setVisible(false)
                    setBlogImgs([])
                    setBlogVideo({})
                    setTitle(null)
                    setContent(null)
                } else {
                    Toast.show(ERROR_Alert(formatMessage({ id: 'error.errorMsg' })))
                }
            })
        } catch (error) {
            console.log("error", error);
            Toast.show(ERROR_Alert(formatMessage({ id: 'error.errorMsg' })))
        }
    }
    const handleDeletePic = (deletedImg) => {
        const filteredBlogImgs = blogImgs.filter(item => item.id !== deletedImg.id);
        setBlogImgs(filteredBlogImgs)
    }
    return (
        <Modal
            visible={visible}
            style={{ flex: 1 }}
        >
            <TouchableOpacity
                activeOpacity={1} // 设置为1以避免触摸反馈的变暗效果
                onPress={() => {
                    Keyboard.dismiss();
                }}
                style={{ flex: 1 }}
            >
                {progress && <UploadProgressModal visible={true} progress={progress} />}
                <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
                    <View style={{ marginHorizontal: '3%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SIZE.NormalMargin, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: SIZE.NormalMargin }}>
                                <TouchableOpacity
                                    onPress={() => { setVisible(false) }}
                                >
                                    {ICON.left(28, COLORS.primary)}
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', color: COLORS.primary }}>
                                        {formatMessage({ id: 'app.blog.postBlog' })}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => { (title && content) && postBlog() }}
                                    style={{ backgroundColor: (title && content) ? COLORS.primary : currentTheme.contentColor, borderRadius: SIZE.CardBorderRadius, padding: SIZE.NormalMargin }}
                                >
                                    <Text style={{ fontSize: SIZE.NormalTitle, color: (title && content) ? COLORS.white : COLORS.gray, fontWeight: 'bold', }}>{formatMessage({ id: 'app.blog.postBtn' })}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', color: COLORS.commentText }}>{formatMessage({ id: 'app.blog.blogTitle' })}</Text>
                                <TextInput
                                    onChangeText={setTitle}
                                    returnKeyType='done'
                                    placeholderTextColor={COLORS.commentText}
                                    placeholder={formatMessage({ id: 'app.blog.titleAlert' })}
                                    style={{ borderRadius: SIZE.CardBorderRadius, color: currentTheme.fontColor, height: 50 }}
                                />
                            </View>
                            <View>
                                <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', marginBottom: SIZE.NormalMargin, color: COLORS.commentText }}>{formatMessage({ id: 'app.blog.blogContent' })}</Text>
                                <TextInput
                                    placeholder={formatMessage({ id: 'app.blog.contentAlert' })}
                                    placeholderTextColor={COLORS.commentText}
                                    multiline={true}
                                    onChangeText={setContent}
                                    style={{ borderRadius: SIZE.CardBorderRadius, color: currentTheme.fontColor, marginBottom: SIZE.NormalMargin, height: 130 }}
                                />
                            </View>

                            {/* 选择图片或者视频 */}
                            <View style={{ flexDirection: 'row', marginBottom: SIZE.NormalMargin }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (blogType === "picture") {
                                            setBlogType("text")
                                        } else {
                                            setBlogType("picture")
                                        }
                                    }}
                                    style={{ backgroundColor: blogType === 'picture' ? COLORS.primary : currentTheme.contentColor, padding: SIZE.NormalMargin, borderTopLeftRadius: SIZE.CardBorderRadius, borderBottomLeftRadius: SIZE.CardBorderRadius, }}
                                >

                                    {ICON.picture(24, blogType === 'picture' ? COLORS.white : COLORS.gray)}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (blogType === "video") {
                                            setBlogType("text")
                                        } else {
                                            setBlogType("video")
                                        }
                                    }}
                                    style={{ backgroundColor: blogType === 'video' ? COLORS.primary : currentTheme.contentColor, padding: SIZE.NormalMargin, borderTopRightRadius: SIZE.CardBorderRadius, borderBottomRightRadius: SIZE.CardBorderRadius, }}>
                                    {ICON.video(24, blogType === 'video' ? COLORS.white : COLORS.gray)}
                                </TouchableOpacity>
                            </View>
                            {/* 图片 */}
                            {blogType !== "text" && <View style={{ width: "100%", flexDirection: 'row', flexWrap: 'wrap', gap: SIZE.NormalMargin, marginBottom: SIZE.NormalMargin }}>
                                {blogType === "picture" && blogImgs.map((item, index) => <TouchableOpacity
                                    key={index}
                                    style={{ width: 110, height: 110, backgroundColor: COLORS.backgroundGray, marginBottom: SIZE.NormalMargin, justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <TouchableOpacity
                                        onPress={() => handleDeletePic(item)}
                                        style={{ zIndex: 1, position: 'absolute', right: 0, top: 0 }}
                                    >
                                        {ICON.delete(24, COLORS.gray)}
                                    </TouchableOpacity>
                                    <Image resizeMode='cover' source={{ uri: item.url, width: "100%", height: '100%' }} />
                                </TouchableOpacity>)}
                                {(blogType === "video" && Object.keys(blogVideo).length !== 0) && <View
                                    style={{ width: width * 0.8, height: width * 0.8, backgroundColor: COLORS.backgroundGray, marginBottom: SIZE.NormalMargin, justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <TouchableOpacity
                                        onPress={() => setBlogVideo({})}
                                        style={{ position: 'absolute', right: 10, top: 10 }}
                                    >
                                        {ICON.delete(24, COLORS.gray)}
                                    </TouchableOpacity>
                                    <Video
                                        style={{ width: width * 0.6, height: '100%' }}
                                        source={{
                                            uri: blogVideo.url,
                                        }}
                                        useNativeControls={false}
                                        resizeMode={ResizeMode.COVER}
                                    />
                                </View>}
                                <TouchableOpacity
                                    onPress={blogType === "picture" ? pickImage : pickVideo}
                                    style={{ width: 110, height: 110, padding: SIZE.NormalMargin, backgroundColor: COLORS.backgroundGray, marginBottom: SIZE.NormalMargin, justifyContent: 'center', alignItems: 'center' }}
                                >
                                    {ICON.plus(36, COLORS.gray)}
                                </TouchableOpacity>
                            </View>}

                        </View>
                    </View>
                </SafeAreaView>
            </TouchableOpacity>
        </Modal >
    )
}

export default PostBlogModal

const styles = StyleSheet.create({})