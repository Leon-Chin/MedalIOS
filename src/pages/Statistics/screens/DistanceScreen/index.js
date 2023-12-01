import { ScrollView, StyleSheet, View } from 'react-native'
import SIZE from '../../../../constants/SIZE'
import HeaderCard from './components/headerCard'
import Chart from './components/Chart'
import BestRecord from './components/BestRecord'
import useUserTheme from '../../../../hooks/useUserTheme'
import APPTHEME from '../../../../constants/COLORS/APPTHEME'

const DistanceScreen = () => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return (
        <ScrollView style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
            <View style={{ marginHorizontal: '3%', marginTop: SIZE.NormalMargin }}>
                <HeaderCard />
                <Chart />
                <BestRecord />
            </View>
        </ScrollView>
    )
}

export default DistanceScreen

const styles = StyleSheet.create({})