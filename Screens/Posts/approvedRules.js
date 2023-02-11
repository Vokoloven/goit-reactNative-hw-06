import { View, Text } from 'react-native'
import { Camera } from 'expo-camera'
import * as Location from 'expo-location'

export const approvedRules = (
    useEffect,
    photo,
    state,
    geolocation,
    setData,
    setHasPermission,
    hasPermission,
    setErrorMsg,
    errorMsg
) => {
    useEffect(() => {
        ;(async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied')
                return
            }
        })()
    }, [])

    let text = 'Waiting..'
    if (errorMsg) {
        text = errorMsg
    } else if (location) {
        text = JSON.stringify(location)
    }

    useEffect(() => {
        const isAllDataFilled = () => {
            if (photo && state.title && state.location && geolocation) {
                setData(true)
            } else {
                setData(false)
            }
        }
        isAllDataFilled()
    }, [photo, state.title, state.location, geolocation])

    useEffect(() => {
        ;(async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])

    if (hasPermission === null) {
        return <View />
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }
}

// useEffect(() => {
//     ;(async () => {
//         let { status } = await Location.requestForegroundPermissionsAsync()
//         if (status !== 'granted') {
//             setErrorMsg('Permission to access location was denied')
//             return
//         }
//     })()
// }, [])

// let text = 'Waiting..'
// if (errorMsg) {
//     text = errorMsg
// } else if (location) {
//     text = JSON.stringify(location)
// }

// useEffect(() => {
//     const isAllDataFilled = () => {
//         if (photo && state.title && state.location && geolocation) {
//             setData(true)
//         } else {
//             setData(false)
//         }
//     }
//     isAllDataFilled()
// }, [photo, state.title, state.location, geolocation])

// useEffect(() => {
//     ;(async () => {
//         const { status } = await Camera.requestCameraPermissionsAsync()
//         setHasPermission(status === 'granted')
//     })()
// }, [])

// if (hasPermission === null) {
//     return <View />
// }
// if (hasPermission === false) {
//     return <Text>No access to camera</Text>
// }
