import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ICON } from '../../../constants/SVG/ICON'
import COLORS from '../../../constants/COLORS'
import SIZE from '../../../constants/SIZE'
import { useIntl } from 'react-intl'
const { width } = Dimensions.get('screen')
const AddStatisticBtn = ({ handlePresentModalPress }) => {
    const { formatMessage } = useIntl()
    return (
        <View style={styles.bottomBar}>
            <TouchableOpacity
                onPress={handlePresentModalPress}
                style={styles.bottomBtn}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {ICON.edit(24, COLORS.white)}
                    <Text style={{ fontSize: SIZE.LargerTitle, fontWeight: 'bold', color: COLORS.white }}>
                        {formatMessage({ id: 'app.statistic.addData' })}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default AddStatisticBtn

const styles = StyleSheet.create({
    bottomBar: {
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        width,
    },
    bottomBtn: {
        borderRadius: SIZE.CardBorderExtraRadius,
        backgroundColor: COLORS.primary,
        width: width * 0.6,
        padding: SIZE.LargerMargin,
        flexDirection: 'row',
        justifyContent: 'center',
    },
})