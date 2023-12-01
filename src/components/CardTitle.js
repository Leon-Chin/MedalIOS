import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../constants/COLORS'
import useUserTheme from '../hooks/useUserTheme'
import APPTHEME from '../constants/COLORS/APPTHEME'

const CardTitle = ({ title, extra }) => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return (
        <View style={styles.cardTitle}>
            <View style={styles.cardTitleLeft}>
                <View style={styles.cardTitleLine}></View>
                <Text style={{
                    fontSize: 28,
                    fontWeight: '600',
                    color: currentTheme.fontColor
                }}>{title}</Text>
            </View>
            <View style={styles.extra}>
                {extra}
            </View>
        </View>
    )
}

export default CardTitle

const styles = StyleSheet.create({
    cardTitle: {
        paddingVertical: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
        justifyContent: 'space-between'
    },
    cardTitleLeft: {
        display: 'flex',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardTitleLine: {
        width: 10,
        height: '100%',
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: COLORS.primary,
    },
    titleContent: {
        fontSize: 28,
        fontWeight: '600',
    },
    extra: {
        height: 40,
        width: 40,
        marginRight: 10,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    }
})