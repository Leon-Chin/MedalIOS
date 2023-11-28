import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateuserinfo } from '../../../api/user.api'
import { loginSuccess } from '../../../redux/userSlice'
import { ICON } from '../../../constants/SVG/ICON'
import COLORS from '../../../constants/COLORS'
import { Modal, StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Alert, Image } from 'react-native'
import SIZE from '../../../constants/SIZE'
import * as ImagePicker from 'expo-image-picker'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../../../../firebase'

const AvatorModal = ({ visible, setVisible }) => {
    const [updatedAvator, setUpdatedAvator] = useState()
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user)
    const { _id, name, personalStatus, age, preferedTheme, preferedLanguage, gender, avator, birthday, hpNum } = currentUser
    useEffect(() => {
        setUpdatedAvator(avator)
    }, [avator])
    const handleUpdate = async () => {
        let handledItems = { avator: updatedAvator }
        await updateuserinfo(currentUser._id, handledItems)
            .then((res) => {
                if (res.status !== false) {
                    dispatch(loginSuccess(res))
                    setVisible(false)
                } else {
                    Alert.alert("出现异常请稍后重试")
                }
            })
            .catch(error => {
                Alert.alert("出现异常请稍后重试")
            })
    }
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.4,
        })

        if (!result.canceled) {
            await uploadImage(result.assets[0].uri)
        }
    }
    const [progress, setProgress] = useState()
    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob()
        const storageRef = ref(storage, `avator-${name}-${parseInt((new Date().getTime() / 1000).toString())}`);
        const uploadTask = uploadBytesResumable(storageRef, blob);
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress.toFixed(2));
        },
            (error) => {
                Alert.alert('出现异常')
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUpdatedAvator(downloadURL)
                });
            }
        );
    }
    return (
        <Modal
            visible={visible}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
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
                                    头像
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    ((avator !== updatedAvator) && updatedAvator) && handleUpdate()
                                }}
                                style={{ backgroundColor: avator !== updatedAvator ? COLORS.primary : COLORS.backgroundGray, borderRadius: SIZE.CardBorderRadius, padding: SIZE.NormalMargin }}
                            >
                                <Text style={{ fontSize: SIZE.NormalTitle, color: avator !== updatedAvator ? COLORS.white : COLORS.gray, fontWeight: 'bold', }}>更改</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: "100%", flexDirection: 'row', flexWrap: 'wrap', gap: SIZE.NormalMargin, marginBottom: SIZE.NormalMargin }}>
                        {updatedAvator && <TouchableOpacity
                            style={{ width: 110, height: 110, backgroundColor: COLORS.backgroundGray, marginBottom: SIZE.NormalMargin, justifyContent: 'center', alignItems: 'center' }}
                        >
                            <TouchableOpacity
                                onPress={() => setUpdatedAvator('')}
                                style={{ zIndex: 1, position: 'absolute', right: 0, top: 0 }}
                            >
                                {ICON.delete(24, COLORS.gray)}
                            </TouchableOpacity>
                            <Image resizeMode='cover' source={{ uri: updatedAvator, width: "100%", height: '100%' }} />
                        </TouchableOpacity>}
                        <TouchableOpacity
                            onPress={pickImage}
                            style={{ width: 110, height: 110, padding: SIZE.NormalMargin, backgroundColor: COLORS.backgroundGray, marginBottom: SIZE.NormalMargin, justifyContent: 'center', alignItems: 'center' }}
                        >
                            {ICON.edit(36, COLORS.gray)}
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </Modal >
    )
}

export default AvatorModal

const styles = StyleSheet.create({})