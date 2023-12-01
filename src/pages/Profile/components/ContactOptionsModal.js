import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../../constants/COLORS';

const ContactOptionsModal = ({ visible, setVisible, user }) => {
    const bottomSheetModalRef = useRef(null);
    // variables
    const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);
    const { navigate } = useNavigation()
    useEffect(() => {
        visible && handleModelOpen()
    }, [visible])
    // callbacks
    const handleModelOpen = useCallback(() => bottomSheetModalRef.current?.present(), []);
    const handleModelClose = () => {
        setVisible(false)
        bottomSheetModalRef.current?.dismiss()
    }
    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            enablePanDownToClose={false}
            snapPoints={snapPoints}
        >
            <TouchableOpacity
                onPress={() => navigate("Report", { type: "user", target: user })}
                style={{ height: 50, marginTop: 10, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            >
                <Text style={{ fontSize: 18, color: 'red', fontWeight: 'bold' }}>举报</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleModelClose}
                style={{ height: 50, marginTop: 10, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            >
                <Text style={{ fontSize: 18, color: COLORS.commentText, fontWeight: 'bold' }}>取消</Text>
            </TouchableOpacity>
        </BottomSheetModal>
    )
}

export default ContactOptionsModal

const styles = StyleSheet.create({})