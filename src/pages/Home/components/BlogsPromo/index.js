import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Label from '../../../../components/Label'
import BlogCard from '../../../../components/BlogCard'
import { useNavigation } from '@react-navigation/native'
import { getrandomblog } from '../../../../api/user.api'
import COLORS from '../../../../constants/COLORS'
import { AntDesign } from '@expo/vector-icons';
import { useIntl } from 'react-intl'

const BlogsPromo = () => {
    const { formatMessage } = useIntl()
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
                <Label>{formatMessage({ id: 'app.blog.blogLabel' })}</Label>
                <TouchableOpacity onPress={() => navigate('Community')} >
                    <Text style={{ opacity: 0.5, fontSize: 12, color: COLORS.commentText }}>{formatMessage({ id: 'app.viewAll' })}</Text>
                </TouchableOpacity>
            </View>
            {blogs ? blogs?.map((blog, index) => <BlogCard key={index} blog={blog} />) : <View />}
            <TouchableOpacity onPress={() => navigate('Community')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: COLORS.commentText }}>{formatMessage({ id: 'app.blog.communityPortal' })}</Text><AntDesign name="arrowright" size={20} color={COLORS.commentText} /></TouchableOpacity>
        </>
    )
}

export default BlogsPromo

const styles = StyleSheet.create({})