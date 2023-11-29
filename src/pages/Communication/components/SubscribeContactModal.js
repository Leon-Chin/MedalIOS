import { Alert, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SIZE from '../../../constants/SIZE'
import { ICON } from '../../../constants/SVG/ICON'
import COLORS from '../../../constants/COLORS'
import { TextInput } from 'react-native-gesture-handler'
import { useState } from 'react'
import { fuzzysearchuser } from '../../../api/user.api'
import ContactHorizontal from '../../../components/ContactHorizontal'
import { useSelector } from 'react-redux'
import ContactHorizontalWithID from '../../../components/ContactHorizontalWithID'

const SubscribeContactModal = ({ visible, setVisible }) => {
    const { currentUser } = useSelector(state => state.user)
    const [searchText, setSearchText] = useState('')
    const [searchedUsers, setSearchedUsers] = useState([])
    const handleSearchUser = async () => {
        if (searchText) {
            await fuzzysearchuser({ searchText }).then(res => {
                if (res.status !== false) {
                    setSearchText('')
                    setSearchedUsers(res)
                } else {
                    Alert.alert("出现异常请稍后再试")
                }
            }).catch(err => {
                Alert.alert("出现异常请稍后再试")
            })
        } else {
            Alert.alert('请输入你所要查找的内容')
        }
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
                                    用户
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TextInput
                            placeholder={'搜索用户名， 用户ID, 邮箱'}
                            style={{ backgroundColor: COLORS.backgroundGray, padding: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius }}
                            onChangeText={setSearchText}
                            returnKeyType={'done'}
                            onSubmitEditing={handleSearchUser}
                        />
                    </View>
                    {(searchText && searchedUsers.length !== 0) && searchedUsers.map((user, index) => <ContactHorizontal setVisible={setVisible} key={index} contact={user} />)}
                    {!searchText && <View>
                        {currentUser.contactsUsers.length !== 0 && currentUser.contactsUsers.map((contactID, index) => <ContactHorizontalWithID setVisible={setVisible} key={index} contactID={contactID} />)}
                    </View>}
                </View>
            </SafeAreaView>
        </Modal >
    )
}

export default SubscribeContactModal
