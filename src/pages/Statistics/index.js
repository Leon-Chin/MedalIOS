import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../constants/COLORS'
import { Entypo, Foundation } from '@expo/vector-icons';
import TodayRecord from './components/TodayRecord';
import AllDataCard from './components/AllDataCard';
import PersonalData from './components/PersonalData'
import StepCard from './components/StepCard';
import DistanceCard from './components/DistanceCard';
import CalorieCard from './components/CalorieCard';
import DurationCard from './components/DurationCard';

const Statistics = () => {

    return (
        <ScrollView style={{ flex: 1 }}>
            <TodayRecord />
            <PersonalData />
            <AllDataCard />
            <DistanceCard />
            <StepCard />
            <CalorieCard />
            <DurationCard />
            <View style={{ height: 20 }}></View>
        </ScrollView>
    )
}

export default Statistics

const styles = StyleSheet.create({})