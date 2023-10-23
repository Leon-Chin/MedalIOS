import { Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
    const { currentTheme, userLocale } = useSelector(state => state.user)
    return (
        <SafeAreaView>
            <Text>{currentTheme}</Text>
        </SafeAreaView>
    )
}