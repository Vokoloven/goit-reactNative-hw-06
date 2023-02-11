import { store, persistor } from './redux/store'
import { Provider } from 'react-redux'
import { DefaultApp } from './Screens/DefaultApp/DefaultApp'
import { PersistGate } from 'redux-persist/integration/react'
import { useEffect } from 'react'

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <DefaultApp />
            </PersistGate>
        </Provider>
    )
}
