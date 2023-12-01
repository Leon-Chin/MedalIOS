import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useUserTheme from '../hooks/useUserTheme'
import APPTHEME from '../constants/COLORS/APPTHEME'

const Tag = ({ content }) => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return (
        <View style={styles.tagContainer}>
            {content.map((item, index) => <View key={index} style={styles.tag}>
                <Text style={{ color: currentTheme.fontColor }}>{item}</Text>
            </View>)}
        </View>
    )
}

export default Tag

const styles = StyleSheet.create({
    tagContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    tag: {
        paddingHorizontal: 6,
        borderRadius: 6,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: 'gray',
        marginRight: 6,
    }
})