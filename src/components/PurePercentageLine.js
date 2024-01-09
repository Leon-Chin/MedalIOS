import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import COLORS from '../constants/COLORS'
import { useEffect } from 'react'
import { useState } from 'react'
const { width, height } = Dimensions.get('screen')
const PurePercentageLine = ({ currentValue }) => {
    const firstTimePercentage = currentValue / 100
    const [percentage, setPercentage] = useState(firstTimePercentage)

    useEffect(() => {
        if ((currentValue / 100) > 1) {
            setPercentage(1)
        } else {
            setPercentage(currentValue / 100)
        }
    }, [currentValue])

    return (
        <View style={{ height: 10, width: width * 0.8, borderRadius: 4, backgroundColor: COLORS.gray }}>
            <View style={{ height: '100%', width: (width * 0.8 * percentage), borderRadius: 4, backgroundColor: COLORS.primary }} />
        </View>
    )
}

export default PurePercentageLine