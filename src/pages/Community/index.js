import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import COLORS from '../../constants/COLORS'
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import BlogCard from '../../components/BlogCard';
import { getrandomblog, searchblog } from '../../api/user.api';
import { Avatar } from '@rneui/base';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import PostBlogModal from './components/PostBlogModal';
import useUserTheme from '../../hooks/useUserTheme';
import APPTHEME from '../../constants/COLORS/APPTHEME';
import { ICON } from '../../constants/SVG/ICON';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { ERROR_MESSAGE } from '../../constants/ERRORMessage';
import useCheckUserStatus from '../../hooks/useCheckUserStatus';
import { useIntl } from 'react-intl';

const Community = () => {
    const { formatMessage } = useIntl()
    const { isMuted, muteDate } = useCheckUserStatus()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { navigate } = useNavigation()
    const scrollViewRef = useRef();
    const { currentUser } = useSelector(state => state.user)
    const [searchText, setSearchText] = useState()
    const [blogs, setBlogs] = useState([])
    const [searchedBlogs, setSearchedBlogs] = useState([])
    const getRecommandBlogs = async () => {
        await getrandomblog().then(blogs => {
            if (blogs && blogs.status !== false) {
                setBlogs(blogs)
            } else {
                Toast.show(ERROR_MESSAGE)
            }
        }).catch(err => {
            console.log("blogsERRRR", err);
            Toast.show(ERROR_MESSAGE)
        })
    }
    useEffect(() => {
        getRecommandBlogs()
    }, [])
    const scrollToTop = () => {
        scrollViewRef.current?.scrollToOffset({ offset: 0, animated: true });
    };
    const handleSearchBlogs = async () => {
        if (searchText) {
            const query = { params: searchText }
            await searchblog(query).then((blogs) => {
                if (blogs.status !== false) {
                    setSearchedBlogs(blogs)
                } else {
                    Toast.show(ERROR_MESSAGE)
                }
            }).catch(err => {
                console.log(err);
                Toast.show(ERROR_MESSAGE)
            })
        } else {
            setSearchedBlogs([])
        }
    }
    const [noMoreBlogs, setNoMoreBlogs] = useState(false);
    const handleEndReached = () => {
        if (!noMoreBlogs) {
            // 这里可以检查是否有更多博客的条件，如果没有更多博客，执行以下操作
            setNoMoreBlogs(true);

            // 滚动到页面顶部
            // scrollToTop();
        }
    };

    const [postBlogModalVisible, setPostBlogVisible] = useState(false)

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        // 可以在这里重新获取 sessions 数据，或者直接更新 selectDay 以触发重载
        // 例如：
        await getrandomblog().then(blogs => {
            if (blogs && blogs.status !== false) {
                setBlogs(blogs)
            } else {
                Toast.show(ERROR_MESSAGE)
            }
        }).catch(err => {
            console.log("blogsERRRR", err);
            Toast.show(ERROR_MESSAGE)
        })

        setRefreshing(false);
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
            <View style={{ paddingHorizontal: 20, flexDirection: 'row', gap: 10, alignItems: 'center', height: 60, paddingBottom: 10, width: '100%' }}>
                <TouchableOpacity
                    onPress={() => navigate('MyBlogsOverview')}
                >
                    <Avatar source={{ uri: currentUser.avator }} rounded size={50} />
                </TouchableOpacity>
                <TextInput
                    placeholder={formatMessage({ id: 'app.blog.searchBlog' })}
                    value={searchText}
                    placeholderTextColor={COLORS.commentText}
                    onChangeText={setSearchText}
                    clearButtonMode='always'
                    style={{ flex: 1, color: currentTheme.commentFontColor, paddingHorizontal: 20, paddingVertical: 6, backgroundColor: currentTheme.contentColor, height: 50, fontSize: 18, borderRadius: 16 }}
                />
                <TouchableOpacity
                    onPress={() => handleSearchBlogs()}
                    style={{ justifyContent: 'center', alignItems: 'center', width: 50, height: 50, backgroundColor: COLORS.primary, borderRadius: 16, }}
                >
                    <Ionicons name="search" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <FlatList
                ref={scrollViewRef}
                data={searchText ? searchedBlogs : blogs}
                style={{ paddingHorizontal: '3%' }}
                renderItem={({ item, index }) => {
                    console.log('item', item);
                    console.log('item', index);
                    return <BlogCard key={item?._id} blog={item} />
                }}
                onEndReached={handleEndReached}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListFooterComponent={
                    <TouchableOpacity
                        onPress={() => {
                            getRecommandBlogs()
                            scrollToTop()
                        }}
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 50, backgroundColor: currentTheme.contentColor, borderRadius: 12 }}
                    >
                        <Text style={{ color: currentTheme.fontColor }}>{formatMessage({ id: 'app.blog.getMoreBlogs' })}</Text>
                        {ICON.refresh(24, currentTheme.fontColor)}
                    </TouchableOpacity>}
            />
            <View style={{ height: 50 }}></View>
            <TouchableOpacity
                onPress={() => {
                    if (!isMuted) {
                        setPostBlogVisible(true)
                    } else {
                        Toast.show({ type: 'error', text1: formatMessage({ id: 'app.blog.banAccountAlert' }), text2: formatMessage({ id: 'app.blog.alertContent' }) + muteDate, duration: 5, topOffset: 50 })
                    }
                }}
                style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 100, right: 20, width: 50, height: 50, backgroundColor: COLORS.primary, borderRadius: 25, zIndex: 1 }}
            >
                <Entypo name="plus" size={28} color="#fff" />
            </TouchableOpacity>
            <PostBlogModal
                visible={postBlogModalVisible}
                setVisible={setPostBlogVisible}
            />
        </SafeAreaView>
    )
}

export default Community

const styles = StyleSheet.create({})