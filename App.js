import { RegistrationScreen } from './Screens/RegistrationScreen'
import { StatusBar } from 'expo-status-bar'
import { LoginScreen } from './Screens/LoginScreen'

export default function App() {
    return (
        <>
            {/* <RegistrationScreen /> */}
            <LoginScreen />
            <StatusBar style="auto" />
        </>
    )
}
