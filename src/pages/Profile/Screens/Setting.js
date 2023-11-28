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

const Setting = () => {
    const { navigate } = useNavigation()
    const dispatch = useDispatch()

    const bottomSheetModalRef = useRef(null);
    // variables
    const snapPoints = useMemo(() => ['25%'], []);
    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const [logoutModalVisible, setLogoutModalVisible] = useState(false)
    const [languageModalVisible, setLanguageModalVisible] = useState(false)
    const [modeModalVisible, setModeModalVisible] = useState(false)
    const [feedbackModalVisible, setFeedbackModalVisible] = useState(false)

    return (
        <BottomSheetModalProvider>
            <View style={{ flex: 1 }}>

                <TouchableOpacity
                    onPress={() => setLanguageModalVisible(true)}
                    style={{ flexDirection: 'row', width: '100%', height: 60, justifyContent: 'space-between', backgroundColor: '#fff', marginBottom: 2, alignItems: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>Language</Text>
                    <Entypo name="chevron-right" size={18} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setModeModalVisible(true)}
                    style={{ flexDirection: 'row', width: '100%', height: 60, justifyContent: 'space-between', backgroundColor: '#fff', marginBottom: 2, alignItems: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>Mode</Text>
                    <Entypo name="chevron-right" size={18} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setFeedbackModalVisible(true)}
                    style={{ flexDirection: 'row', width: '100%', height: 60, justifyContent: 'space-between', backgroundColor: '#fff', marginBottom: 2, alignItems: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>反馈</Text>
                    <Entypo name="chevron-right" size={18} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { setLogoutModalVisible(true) }}
                    style={{ width: '100%', height: 60, backgroundColor: '#fff', marginBottom: 2, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>Logout</Text>
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