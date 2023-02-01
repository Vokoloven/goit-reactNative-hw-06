import { RegistrationScreen } from './assets/Screens/RegistrationScreen'
import { StatusBar } from 'expo-status-bar'
import { LoginScreen } from './assets/Screens/LoginScreen'

export default function App() {
    return (
        <>
            {/* <RegistrationScreen /> */}
            <LoginScreen />
            <StatusBar style="auto" />
        </>
    )
}
