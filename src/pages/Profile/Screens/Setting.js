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

    return (
        <BottomSheetModalProvider>
            <View style={{ flex: 1 }}>

                <TouchableOpacity
                    onPress={() => { }}
                    style={{ flexDirection: 'row', width: '100%', height: 60, justifyContent: 'space-between', backgroundColor: '#fff', marginBottom: 2, alignItems: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>Language</Text>
                    <Entypo name="chevron-right" size={18} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { }}
                    style={{ flexDirection: 'row', width: '100%', height: 60, justifyContent: 'space-between', backgroundColor: '#fff', marginBottom: 2, alignItems: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>Mode</Text>
                    <Entypo name="chevron-right" size={18} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { }}
                    style={{ flexDirection: 'row', width: '100%', height: 60, justifyContent: 'space-between', backgroundColor: '#fff', marginBottom: 2, alignItems: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>帮助与反馈</Text>
                    <Entypo name="chevron-right" size={18} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handlePresentModalPress}
                    style={{ width: '100%', height: 60, backgroundColor: '#fff', marginBottom: 2, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>Logout</Text>
                </TouchableOpacity>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    enablePanDownToClose
                    snapPoints={snapPoints}
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: COLORS.commentText }}>确定要退出登录么？</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(logout())
                            }}
                            style={{ height: 50, marginTop: 10, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Text style={{ fontSize: 18, color: 'red', fontWeight: 'bold' }}>确认退出</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                bottomSheetModalRef.current?.dismiss()
                            }}
                            style={{ height: 50, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Text style={{ fontSize: 18 }}>取消</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider >
    )
}

export default Setting