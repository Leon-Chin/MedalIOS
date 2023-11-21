import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Tag = ({ content }) => {
    return (
        <View style={styles.tagContainer}>
            {content.map((item, index) => <View key={index} style={styles.tag}>
                <Text >{item}</Text>
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