import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react';
import {
    BottomSheetModal,
} from '@gorhom/bottom-sheet';
import COLORS from '../../../constants/COLORS';
import { logout } from '../../../redux/userSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


const LogoutModal = ({ visible, setVisible }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        visible && handlePresentModalPress()
    }, [visible])
    const bottomSheetModalRef = useRef(null);
    // variables
    const snapPoints = useMemo(() => ['25%', '30%', '50%'], []);
    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleClose = () => {
        bottomSheetModalRef.current?.dismiss()
        setVisible(false)
    }

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            enablePanDownToClose={false}
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
                    onPress={handleClose}
                    style={{ height: 50, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ fontSize: 18 }}>取消</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetModal>
    )
}

export default LogoutModal