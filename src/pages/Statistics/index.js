import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../constants/COLORS'
import { Entypo, Foundation } from '@expo/vector-icons';
import TodayRecord from './components/TodayRecord';
import AllDataCard from './components/AllDataCard';
import PersonalData from './components/PersonalData'

const Statistics = () => {

    const [] = useState()
    useEffect(() => {

    }, [])
    return (
        <ScrollView style={{ flex: 1 }}>
            <TodayRecord />
            <AllDataCard />
            <PersonalData />
        </ScrollView>
    )
}

export default Statistics

const styles = StyleSheet.create({})