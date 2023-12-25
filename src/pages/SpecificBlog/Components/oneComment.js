import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Avatar } from '@rneui/base';
import { addcomment, cancellikecomment, likecomment } from '../../../api/user.api';
import { AntDesign } from '@expo/vector-icons';
import COLORS from '../../../constants/COLORS';
import { useSelector } from 'react-redux';
import { FormattedTime } from '../../../utils/formatTime'
import { useNavigation } from '@react-navigation/native';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';
import { useIntl } from 'react-intl';

const OneComment = ({ comment }) => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { likedUsers } = comment
    const { currentUser } = useSelector(state => state.user)
    const [liked, setLiked] = useState(likedUsers.includes(currentUser._id))
    const [likedNum, setLikedNum] = useState(likedUsers.length)
    const { navigate } = useNavigation()
    const handleLikeComment = async () => {
        if (liked) {
            await cancellikecomment(comment._id).then(() => {
                setLikedNum((prev) => prev - 1)
                setLiked(false)
            }).catch(() => {
                console.log('err');
            })
        } else {
            await likecomment(comment._id)
                .then(() => {
                    setLikedNum((prev) => prev + 1)
                    setLiked(true)
                }).catch(error => {
                    console.log(error);
                })
        }
    }
    return (
        <View style={{ backgroundColor: currentTheme.contentColor, marginBottom: 8, padding: 10, borderRadius: 10, }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                        <Avatar source={{ uri: comment?.commentUserInfo?.avator }} size={24} rounded />
                        <Text style={{ fontSize: 16, color: currentTheme.fontColor }}>{comment?.commentUserInfo?.name}</Text>
                    </View>
                    <View style={{}}>
                        <Text style={{ color: currentTheme.fontColor }}>{comment.content}</Text>
                    </View>
                </View>
            </View>
            <View style={{ marginTop: 4, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: "row", alignItems: 'center', flex: 1 }}>
                    <View style={{ width: 100, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: COLORS.commentText, fontSize: 12 }}>{FormattedTime(new Date(comment.createdAt))}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => handleLikeComment()}
                            style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row", alignItems: "center", marginHorizontal: 4 }}
                        >
                            <AntDesign name={liked ? "like1" : 'like2'} size={16} color={liked ? COLORS.primary : COLORS.commentText} />
                            {likedNum === 0 ? <Text style={{ color: COLORS.commentText, fontSize: 8, marginLeft: 3 }}>{formatMessage({ id: 'app.blog.like' })}</Text> : <Text style={{ fontSize: 12, marginLeft: 4, color: COLORS.commentText }}>{likedNum}</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => navigate("Report", { type: 'comment', target: comment })}
                    >
                        <AntDesign name="warning" size={14} color={COLORS.commentText} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default OneComment

const styles = StyleSheet.create({})