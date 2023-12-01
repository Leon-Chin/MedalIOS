import { ScrollView, StyleSheet, View } from 'react-native'
import SIZE from '../../../../constants/SIZE'
import HeaderCard from './components/headerCard'
import StepChart from './components/StepChart'
import BestRecord from './components/BestRecord'
import useUserTheme from '../../../../hooks/useUserTheme'
import APPTHEME from '../../../../constants/COLORS/APPTHEME'

const StepScreen = () => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return (
        <ScrollView style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
            <View style={{ marginHorizontal: '3%', marginTop: SIZE.NormalMargin }}>
                <HeaderCard />
                <StepChart />
                <BestRecord />
            </View>
        </ScrollView>
    )
}

export default StepScreen

const styles = StyleSheet.create({})