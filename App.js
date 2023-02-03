import { StatusBar } from 'expo-status-bar'
import { RegistrationScreen } from './Screens/Auth/RegistrationScreen'
import { LoginScreen } from './Screens/Auth/LoginScreen'
import { Home } from './Screens/Home/HomeScreen'
import { useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()
const Stack = createNativeStackNavigator()

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
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Registration">
                    {(props) => (
                        <RegistrationScreen
                            {...props}
                            onLayoutRootView={onLayoutRootView}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="Login">
                    {(props) => (
                        <LoginScreen
                            {...props}
                            onLayoutRootView={onLayoutRootView}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="Home">
                    {(props) => (
                        <Home {...props} onLayoutRootView={onLayoutRootView} />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
