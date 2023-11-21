import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Label from '../../../../components/Label'
import BlogCard from '../../../../components/BlogCard'
import { useNavigation } from '@react-navigation/native'
import { getrandomblog } from '../../../../api/user.api'
import COLORS from '../../../../constants/COLORS'
import { AntDesign } from '@expo/vector-icons';

const BlogsPromo = () => {
    const { navigate } = useNavigation()
    const [blogs, setBlogs] = useState([])
    const getRecommandBlogs = async () => {
        const blogs = await getrandomblog()
        setBlogs(blogs)
    }
    useEffect(() => {
        getRecommandBlogs()
    }, [])
    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Label>Blog</Label>
                <TouchableOpacity onPress={() => navigate('Community')} >
                    <Text style={{ opacity: 0.5, fontSize: 12, }}>View All</Text>
                </TouchableOpacity>
            </View>
            {blogs ? blogs?.map((blog, index) => <BlogCard key={index} blog={blog} />) : <View />}
            <TouchableOpacity onPress={() => navigate('Community')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: COLORS.commentText }}>Go to 「Community」 to see more</Text><AntDesign name="arrowright" size={20} color={COLORS.commentText} /></TouchableOpacity>
        </>
    )
}

export default BlogsPromo

const styles = StyleSheet.create({})