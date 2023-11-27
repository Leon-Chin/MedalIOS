import { ScrollView, StyleSheet, View } from 'react-native'
import SIZE from '../../../../constants/SIZE'
import HeaderCard from './components/headerCard'
import StepChart from './components/StepChart'
import BestRecord from './components/BestRecord'

const StepScreen = () => {
    return (
        <ScrollView style={{ flex: 1 }}>
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