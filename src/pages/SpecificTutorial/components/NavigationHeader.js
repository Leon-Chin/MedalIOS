import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from '../style'
import { ICON } from '../../../constants/SVG/ICON'
import { useNavigation } from '@react-navigation/native'
import COLORS from '../../../constants/COLORS'

const NavigationHeader = ({ handleModelOpen }) => {
    const { goBack } = useNavigation()
    return (
        <View style={styles.navigationBar}>
            <TouchableOpacity onPress={() => goBack()}>
                <View style={styles.btn}>
                    {/* <Ionicons name='chevron-back' size={30} color={'black'} /> */}
                    {ICON.left(30, COLORS.black)}
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleModelOpen}
            >
                <View style={styles.btn}>
                    {ICON.more(28, COLORS.black)}
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default NavigationHeader