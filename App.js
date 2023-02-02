import { RegistrationScreen } from './Screens/RegistrationScreen'
import { StatusBar } from 'expo-status-bar'
import { LoginScreen } from './Screens/LoginScreen'
import { useCallback } from 'react'

import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
SplashScreen.preventAutoHideAsync()

export default function App() {
    const [fontsLoaded] = useFonts({
        'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    })
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    if (!fontsLoaded) {
        return null
    }

    return (
        <>
            <RegistrationScreen onLayoutRootView={onLayoutRootView} />
            {/* <LoginScreen onLayoutRootView={onLayoutRootView} /> */}
            <StatusBar style="auto" />
        </>
    )
}
