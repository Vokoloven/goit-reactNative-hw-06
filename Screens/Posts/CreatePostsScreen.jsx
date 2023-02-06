import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { MaterialIcons, EvilIcons, Feather } from '@expo/vector-icons'
import * as Location from 'expo-location'

const initialState = {
    title: '',
    location: '',
}

export const CreatePostsScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null)
    const [type, setType] = useState(CameraType.back)
    const [camera, setCamera] = useState(null)
    const [photo, setPhoto] = useState('')
    const [state, setState] = useState(initialState)
    const [isCameraReady, setIsCameraReady] = useState(false)
    const [borderChangeColor, setBorderChangeColor] = useState('')
    const [data, setData] = useState(false)
    const [geolocation, setGeolocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

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

    const onFocusHandler = (data) => {
        setBorderChangeColor(data)
    }

    const onBlurHandler = () => {
        setBorderChangeColor('')
    }

    const onCameraReady = () => {
        setIsCameraReady(true)
    }

    const clearPostData = () => {
        setState(initialState)
        setPhoto('')
        setGeolocation(null)
    }

    const sendToPost = () => {
        navigation.navigate('DefaultScreen', { photo, state, geolocation })
        setPhoto('')
        setState(initialState)
    }

    const getPhoto = async () => {
        const photo = await camera.takePictureAsync()
        if (photo) {
            setPhoto(photo.uri)
            const location = await Location.getCurrentPositionAsync({})
            setGeolocation(location.coords)
        }
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss()
            }}
        >
            <View style={styles.container}>
                <Camera
                    style={styles.camera}
                    type={type}
                    ref={setCamera}
                    onCameraReady={onCameraReady}
                >
                    {photo && (
                        <View style={styles.getPhotoContainer}>
                            <Image
                                source={{ uri: photo }}
                                style={{ width: 343, height: 240 }}
                            />
                        </View>
                    )}
                    {!photo && (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={getPhoto}
                            style={styles.buttonContainerSnap}
                        >
                            <MaterialIcons
                                name="photo-camera"
                                size={24}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    )}
                    {!photo && (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                activeOpacity={0.5}
                                onPress={() => {
                                    setType(
                                        type === CameraType.back
                                            ? CameraType.front
                                            : CameraType.back
                                    )
                                }}
                            >
                                <MaterialIcons
                                    name="flip-camera-ios"
                                    size={24}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </Camera>

                <View style={styles.form}>
                    <View>
                        <TextInput
                            style={{
                                ...styles.input,
                                borderBottomColor:
                                    borderChangeColor === 'title'
                                        ? '#FF6C00'
                                        : '#E8E8E8',
                            }}
                            placeholder="Название..."
                            textAlign="left"
                            placeholderTextColor="#BDBDBD"
                            placeholderStyle={{
                                fontFamily: 'Roboto-regular',
                            }}
                            onFocus={() => {
                                onFocusHandler('title')
                            }}
                            onBlur={onBlurHandler}
                            onChangeText={(value) => {
                                setState((prevState) => ({
                                    ...prevState,
                                    title: value,
                                }))
                            }}
                            value={state.title}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={{
                                ...styles.input,
                                borderBottomColor:
                                    borderChangeColor === 'location'
                                        ? '#FF6C00'
                                        : '#E8E8E8',
                                marginTop: 16,
                                paddingLeft: 28,
                            }}
                            placeholder="Местность..."
                            textAlign="left"
                            placeholderTextColor="#BDBDBD"
                            placeholderStyle={{
                                fontFamily: 'Roboto-regular',
                            }}
                            onFocus={() => {
                                onFocusHandler('location')
                            }}
                            onBlur={onBlurHandler}
                            onChangeText={(value) => {
                                setState((prevState) => ({
                                    ...prevState,
                                    location: value,
                                }))
                            }}
                            value={state.location}
                        />
                        <EvilIcons
                            name="location"
                            size={24}
                            color={
                                borderChangeColor === 'location'
                                    ? '#FF6C00'
                                    : '#BDBDBD'
                            }
                            style={{ position: 'absolute', bottom: 16 }}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={sendToPost}
                            disabled={data ? false : true}
                            style={{
                                ...styles.publishBtn,
                                backgroundColor: data ? '#FF6C00' : '#F6F6F6',
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.publishBtnText,
                                    color: data ? '#fff' : '#BDBDBD',
                                }}
                            >
                                Опубликовать
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.trashIcon}
                            onPress={clearPostData}
                        >
                            <Feather name="trash-2" size={24} color="#BDBDBD" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    camera: {
        marginTop: 32,
        height: 240,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 16,
    },

    buttonContainerSnap: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        width: 60,
        height: 60,
        borderRadius: 100,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    getPhotoContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    form: {
        marginTop: 32,
        marginHorizontal: 16,
    },
    input: {
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#BDBDBD',
        backgroundColor: '#fff',
        fontFamily: 'Roboto-Medium',
        color: '#212121',
    },
    publishBtn: {
        height: 51,
        marginTop: 32,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    publishBtnText: {
        fontFamily: 'Roboto-Regular',
    },
    trashIcon: {
        alignItems: 'center',
        marginTop: 128,
    },
})
