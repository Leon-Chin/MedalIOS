import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import COLORS from '../../../constants/COLORS';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/userSlice';
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import LogoutModal from '../components/LogoutModal';
import LanguageModal from '../components/LanguageModal';
import ModeModal from '../components/ModeModal';
import FeedbackModal from '../components/FeedbackModal';
import useUserTheme from '../../../hooks/useUserTheme';
import APPTHEME from '../../../constants/COLORS/APPTHEME';
import { ICON } from '../../../constants/SVG/ICON';

const Setting = () => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const [logoutModalVisible, setLogoutModalVisible] = useState(false)
    const [languageModalVisible, setLanguageModalVisible] = useState(false)
    const [modeModalVisible, setModeModalVisible] = useState(false)
    const [feedbackModalVisible, setFeedbackModalVisible] = useState(false)

    return (
        <BottomSheetModalProvider>
            <View style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>

                <TouchableOpacity
                    onPress={() => setLanguageModalVisible(true)}
                    style={{ flexDirection: 'row', width: '100%', height: 60, justifyContent: 'space-between', backgroundColor: currentTheme.contentColor, marginBottom: 2, alignItems: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '500', color: currentTheme.fontColor }}>Language</Text>
                    {ICON.right(18, currentTheme.fontColor)}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setModeModalVisible(true)}
                    style={{ flexDirection: 'row', width: '100%', height: 60, justifyContent: 'space-between', backgroundColor: currentTheme.contentColor, marginBottom: 2, alignItems: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '500', color: currentTheme.fontColor }}>Mode</Text>
                    {ICON.right(18, currentTheme.fontColor)}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setFeedbackModalVisible(true)}
                    style={{ flexDirection: 'row', width: '100%', height: 60, justifyContent: 'space-between', backgroundColor: currentTheme.contentColor, marginBottom: 2, alignItems: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '500', color: currentTheme.fontColor }}>反馈</Text>
                    {ICON.right(18, currentTheme.fontColor)}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { setLogoutModalVisible(true) }}
                    style={{ width: '100%', height: 60, backgroundColor: currentTheme.contentColor, marginBottom: 2, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '500', color: currentTheme.fontColor }}>Logout</Text>
                </TouchableOpacity>

                <LogoutModal visible={logoutModalVisible} setVisible={setLogoutModalVisible} />
                <LanguageModal visible={languageModalVisible} setVisible={setLanguageModalVisible} />
                <ModeModal visible={modeModalVisible} setVisible={setModeModalVisible} />
                <FeedbackModal visible={feedbackModalVisible} setVisible={setFeedbackModalVisible} />
            </View>
        </BottomSheetModalProvider >
    )
}

export default Setting