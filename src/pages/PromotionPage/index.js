import { View, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native'
import { useIntl } from 'react-intl';

const { width } = Dimensions.get('window')
export default function PromotionPage() {
    const { formatMessage } = useIntl()
    const { navigate } = useNavigation()
    const handleDone = () => {
        navigate("Login")
    }
    return (
        <View style={style.container}>
            <Onboarding
                onDone={() => handleDone()}
                onSkip={() => handleDone()}
                pages={[
                    {
                        backgroundColor: '#fff',
                        image: <View style={style.lottie}>
                            <Lottie source={require('../../../assets/lottie/animation_lo3qpt4m.json')} autoPlay loop />
                        </View>,
                        title: formatMessage({ id: 'app.promo.onBoarding' }),
                        subtitle:formatMessage({ id: 'app.promo.contentPt1' }),
                    },
                    {
                        backgroundColor: '#fff',
                        image: <View style={style.lottie}>
                            <Lottie source={require('../../../assets/lottie/game.json')} autoPlay loop />
                        </View>,
                        title: 'Onboarding',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },
                    {
                        backgroundColor: '#fff',
                        image: <View style={style.lottie}>
                            <Lottie source={require('../../../assets/lottie/personalize.json')} autoPlay loop />
                        </View>,
                        title: 'Onboarding',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },
                    {
                        backgroundColor: '#fff',
                        image: <View style={style.lottie}>
                            <Lottie source={require('../../../assets/lottie/tutorial.json')} autoPlay loop />
                        </View>,
                        title: 'Onboarding',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },
                    {
                        backgroundColor: '#fff',
                        image: <View style={style.lottie}>
                            <Lottie source={require('../../../assets/lottie/track.json')} autoPlay loop />
                        </View>,
                        title: 'Onboarding',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },
                ]}
            />
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1
    },
    lottie: {
        width: width * 0.9,
        height: width
    },
})