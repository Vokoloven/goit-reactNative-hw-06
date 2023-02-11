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
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { MaterialIcons, EvilIcons, Feather } from '@expo/vector-icons'
import * as Location from 'expo-location'
import * as Progress from 'react-native-progress'
import { uploadPhotoToDb, uploadPostToDb } from './databaseRequests'
import { approvedRules } from './approvedRules'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../redux/selectors/userSelector/userSelector'
import { dataPosts } from '../../redux/posts/postsOperations'

const initialState = {
    title: '',
    location: '',
}

export const CreatePostsScreen = ({ navigation }) => {
    const [isFocused, setIsFocused] = useState(false)
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
    const [isLoaded, setIsLoaded] = useState(false)
    const [photoDb, setPhotoDb] = useState('')
    const { user } = useSelector(selectUser)
    const dispatch = useDispatch()

    approvedRules(
        useEffect,
        photo,
        state,
        geolocation,
        setData,
        setHasPermission,
        hasPermission,
        setErrorMsg,
        errorMsg
    )

    const keyboardToggler = () => {
        setIsFocused(false)
        Keyboard.dismiss()
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
        setData(false)
    }

    const getPhoto = async () => {
        setIsLoaded(true)
        const photo = await camera.takePictureAsync()
        if (photo) {
            uploadPhotoToDb(photo, setPhotoDb)
            setPhoto(photo.uri)
            const location = await Location.getCurrentPositionAsync({})
            setGeolocation(location.coords)
            setIsLoaded(false)
        }
    }

    const sendToPost = () => {
        uploadPostToDb(photoDb, geolocation, state, user)
        navigation.navigate('DefaultScreen')
        setPhoto('')
        setState(initialState)
        clearPostData()
        dispatch(dataPosts())
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
            style={styles.container}
        >
            <TouchableWithoutFeedback
                onPress={isFocused ? keyboardToggler : null}
            >
                <View
                    style={{
                        ...styles.inner,
                        marginBottom: isFocused ? 103 : 34,
                    }}
                >
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
                                    setIsFocused(true)
                                }}
                                onBlur={() => {
                                    onBlurHandler()
                                    setIsFocused(false)
                                }}
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
                                    setIsFocused(true)
                                }}
                                onBlur={() => {
                                    onBlurHandler()
                                    setIsFocused(false)
                                }}
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
                                onPress={() => {
                                    sendToPost(), keyboardToggler()
                                }}
                                disabled={data ? false : true}
                                style={{
                                    ...styles.publishBtn,
                                    backgroundColor: data
                                        ? '#FF6C00'
                                        : '#F6F6F6',
                                }}
                            >
                                {isLoaded ? (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                marginRight: 10,
                                                color: '#BDBDBD',
                                            }}
                                        >
                                            Loading your location...
                                        </Text>
                                        <Progress.Circle
                                            size={30}
                                            indeterminate={true}
                                            color={'#FF6C00'}
                                        />
                                    </View>
                                ) : (
                                    <Text
                                        style={{
                                            ...styles.publishBtnText,
                                            color: data ? '#fff' : '#BDBDBD',
                                        }}
                                    >
                                        Опубликовать
                                    </Text>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.trashIcon}
                                onPress={clearPostData}
                            >
                                <Feather
                                    name="trash-2"
                                    size={24}
                                    color="#BDBDBD"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    inner: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    camera: {
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
        marginTop: 120,
    },
})
