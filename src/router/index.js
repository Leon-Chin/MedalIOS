import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../pages/Home'
import Login from '../pages/Login'
import StepCounter from '../pages/StepCounter'
import { useSelector } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { localeConfig } from '../locale'

const Stack = createNativeStackNavigator();

export default function MyRouter() {
    const { userLocale } = useSelector((state) => state.user)
    const Language = userLocale ? userLocale.substring(0, 2) : 'en'
    return (
        <IntlProvider locale={Language} messages={localeConfig[Language]}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='StepCounter'>
                    <Stack.Screen name="Login" component={Login} options={{ title: 'Overdview', headerShown: false }} />
                    <Stack.Screen name="Home" component={Home} options={{ title: 'Home', headerShown: false }} />
                    <Stack.Screen name="StepCounter" component={StepCounter} options={{ title: 'Home', headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </IntlProvider>
    )
}