import { useFonts } from 'expo-font'

import { useCallback } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RegistrationScreen } from '../Auth/RegistrationScreen'
import { LoginScreen } from '../Auth/LoginScreen'
import { HomeScreen } from '../Home/HomeScreen'

SplashScreen.preventAutoHideAsync()
const Stack = createNativeStackNavigator()

export const useRoute = (isAuth) => {
    const [fontsLoaded] = useFonts({
        'Roboto-Medium': require('../../assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    if (!fontsLoaded) {
        return null
    }

    if (!isAuth) {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Login">
                    {(props) => (
                        <LoginScreen
                            {...props}
                            onLayoutRootView={onLayoutRootView}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="Registration">
                    {(props) => (
                        <RegistrationScreen
                            {...props}
                            onLayoutRootView={onLayoutRootView}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        )
    } else {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Home">
                    {(props) => (
                        <HomeScreen
                            {...props}
                            onLayoutRootView={onLayoutRootView}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        )
    }
}
