import { FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import COLORS from '../../constants/COLORS'
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import BlogCard from '../../components/BlogCard';
import { getrandomblog, searchblog } from '../../api/user.api';
import { Avatar } from '@rneui/base';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import PostBlogModal from './components/PostBlogModal';

const Community = () => {
    const { navigate } = useNavigation()
    const scrollViewRef = useRef();
    const { currentUser } = useSelector(state => state.user)
    const [searchText, setSearchText] = useState()
    const [blogs, setBlogs] = useState([])
    const [searchedBlogs, setSearchedBlogs] = useState([])
    const getRecommandBlogs = async () => {
        const blogs = await getrandomblog()
        setBlogs(blogs)
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
                setSearchedBlogs(blogs)
            }).catch(err => {
                console.log(err);
                message.error('error happens, can not get the blogs')
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
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 20, flexDirection: 'row', gap: 10, alignItems: 'center', height: 60, paddingBottom: 10, width: '100%' }}>
                <TouchableOpacity
                    onPress={() => navigate('MyBlogsOverview')}
                >
                    <Avatar source={{ uri: currentUser.avator }} rounded size={50} />
                </TouchableOpacity>
                <TextInput
                    placeholder='Search the blog'
                    value={searchText}
                    onChangeText={setSearchText}
                    clearButtonMode='always'
                    style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 6, backgroundColor: '#fff', height: 50, fontSize: 18, borderRadius: 16 }}
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
                renderItem={({ item, index }) => <BlogCard key={index} blog={item} />}
                onEndReached={handleEndReached}
                ListFooterComponent={
                    <TouchableOpacity
                        onPress={() => {
                            getRecommandBlogs()
                            scrollToTop()
                        }}
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 50, backgroundColor: '#fff', borderRadius: 12 }}
                    >
                        <Text>Refresh to get more</Text><MaterialIcons name="refresh" size={18} color="#333" />
                    </TouchableOpacity>}
            />
            <View style={{ height: 50 }}></View>
            <TouchableOpacity
                onPress={() => {
                    setPostBlogVisible(true)
                    // scrollToTop()
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