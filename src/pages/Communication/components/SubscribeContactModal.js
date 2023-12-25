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
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
<<<<<<< Updated upstream
=======
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { ERROR_MESSAGE, PleaseInputSearchContent_MESSAGE } from '../../../constants/ERRORMessage'
import { useIntl } from 'react-intl'
>>>>>>> Stashed changes

const SubscribeContactModal = ({ visible, setVisible }) => {
    const { formatMessage } = useIntl()
    const { currentUser } = useSelector(state => state.user)
    const [searchText, setSearchText] = useState('')
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
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
            style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}
        >
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
                                {formatMessage({ id: 'app.comu.user' })}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TextInput
                            placeholder={formatMessage({ id: 'app.comu.searchBar' })}
                            placeholderTextColor={COLORS.commentText}
                            style={{ backgroundColor: currentTheme.contentColor, color: currentTheme.fontColor, padding: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius, marginBottom: SIZE.NormalMargin }}
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
