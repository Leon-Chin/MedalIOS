import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OptionsInModal from './OptionsInModal'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';

const MoreOptionsModal = ({ visible, setVisible, tutorial }) => {
    const bottomSheetModalRef = useRef(null);
    // variables
    const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);
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
            enablePanDownToClose
            snapPoints={snapPoints}
        >
            <OptionsInModal handleModelClose={handleModelClose} tutorial={tutorial} />
        </BottomSheetModal>
    )
}

export default MoreOptionsModal

const styles = StyleSheet.create({})