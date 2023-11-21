import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import COLORS from '../../../constants/COLORS';
import { Input } from '@rneui/base';

const SpecificBlogBottomBar = ({ blog }) => {
    const { currentUser } = useSelector(state => state.user)
    const { userID, title, likesUsers, imgUrl, blogType, videoUrl, width, height } = blog
    const { _id } = currentUser
    const [liked, setLiked] = useState(likesUsers.includes(_id))
    const [likedNum, setLikeNum] = useState(likesUsers.length)
    return (
        <View style={styles.bottomBar}>
            
        </View >
    )
}

export default SpecificBlogBottomBar

const styles = StyleSheet.create({
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0.2,
        borderTopColor: COLORS.commentText,
        flexDirection: 'row'
    }
})