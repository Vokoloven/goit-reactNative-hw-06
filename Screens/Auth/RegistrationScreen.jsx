import React, { useState } from 'react'
import { renderButton } from './renderButton'
import { useDispatch } from 'react-redux'
import { regAssistance } from './helpers/authAssistance'

import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native'

const image = require('../../assets/image/background.png')
const avatar = require('../../assets/image/avatarInput.png')
const avatarPhoto = require('../../assets/image/avatarPhoto.png')

const initialState = {
    login: '',
    email: '',
    password: '',
}

export const RegistrationScreen = ({ onLayoutRootView, navigation }) => {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false)
    const [borderChangeColor, setBorderChangeColor] = useState('')
    const [state, setState] = useState(initialState)
    const [secure, setSecure] = useState(true)
    const dispatch = useDispatch()

    const onFocusHandler = (data) => {
        setIsShowKeyboard(true)
        setBorderChangeColor(data)
    }

    const onBlurHandler = () => {
        setBorderChangeColor('')
    }

    const closeKeyboardToggler = () => {
        Keyboard.dismiss()
        setIsShowKeyboard(false)
    }

    const onSubmitEditingToggler = () => {
        setIsShowKeyboard(false)
        regAssistance(state, dispatch, navigation, setState, initialState)
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <TouchableWithoutFeedback onPress={closeKeyboardToggler}>
                <ImageBackground source={image} style={styles.image}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
                    >
                        <View
                            style={{
                                ...styles.form,
                                paddingBottom: isShowKeyboard ? 32 : 78,
                            }}
                            onSubmitEditing={onSubmitEditingToggler}
                        >
                            <ImageBackground
                                source={isShowKeyboard ? avatarPhoto : avatar}
                                style={styles.avatarInput}
                            />
                            <View style={styles.header}>
                                <Text style={styles.headerTitle}>
                                    Регистрация
                                </Text>
                            </View>
                            <View>
                                <TextInput
                                    style={{
                                        ...styles.input,
                                        borderColor:
                                            borderChangeColor === 'login'
                                                ? '#FF6C00'
                                                : '#E8E8E8',
                                    }}
                                    textAlign={'left'}
                                    placeholder="Логин"
                                    placeholderTextColor="#BDBDBD"
                                    placeholderStyle={{
                                        fontFamily: 'Roboto-regular',
                                    }}
                                    onFocus={() => {
                                        onFocusHandler('login')
                                    }}
                                    onBlur={onBlurHandler}
                                    onChangeText={(value) =>
                                        setState((prevState) => ({
                                            ...prevState,
                                            login: value,
                                        }))
                                    }
                                    value={state.login}
                                />
                            </View>
                            <View style={{ marginTop: 16 }}>
                                <TextInput
                                    style={{
                                        ...styles.input,
                                        borderColor:
                                            borderChangeColor === 'email'
                                                ? '#FF6C00'
                                                : '#E8E8E8',
                                    }}
                                    textAlign={'left'}
                                    placeholder="Адрес электронной почты"
                                    placeholderTextColor="#BDBDBD"
                                    placeholderStyle={{
                                        fontFamily: 'Roboto-regular',
                                    }}
                                    onFocus={() => {
                                        onFocusHandler('email')
                                    }}
                                    onBlur={onBlurHandler}
                                    onChangeText={(value) =>
                                        setState((prevState) => ({
                                            ...prevState,
                                            email: value,
                                        }))
                                    }
                                    value={state.email}
                                />
                            </View>
                            <View style={{ marginTop: 16 }}>
                                <TextInput
                                    style={{
                                        ...styles.input,
                                        borderColor:
                                            borderChangeColor === 'password'
                                                ? '#FF6C00'
                                                : '#E8E8E8',
                                    }}
                                    textAlign={'left'}
                                    placeholder="Пароль"
                                    placeholderTextColor="#BDBDBD"
                                    placeholderStyle={{
                                        fontFamily: 'Roboto-regular',
                                    }}
                                    secureTextEntry={secure}
                                    autoCorrect={false}
                                    textContentType="password"
                                    onFocus={() => {
                                        onFocusHandler('password')
                                    }}
                                    onBlur={onBlurHandler}
                                    onChangeText={(value) =>
                                        setState((prevState) => ({
                                            ...prevState,
                                            password: value,
                                        }))
                                    }
                                    value={state.password}
                                />
                                <TouchableOpacity
                                    style={styles.passwordShow}
                                    onPress={() => {
                                        setSecure(!secure)
                                    }}
                                >
                                    <Text>Показать</Text>
                                </TouchableOpacity>
                            </View>
                            {renderButton(
                                isShowKeyboard,
                                setState,
                                initialState,
                                navigation,
                                'Login',
                                dispatch,
                                state
                            )}
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
    },
    regBox: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        height: 549,
    },
    form: {
        backgroundColor: '#fff',
        paddingTop: 92,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    header: {
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 36,
        marginBottom: 32,
        fontFamily: 'Roboto-Medium',
    },
    avatarInput: {
        position: 'absolute',
        width: 132,
        height: 120,
        top: 0,
        right: 0,
        transform: [{ translateX: -120 }, { translateY: -50 }],
    },
    input: {
        borderWidth: 1,
        borderColor: '#E8E8E8',
        backgroundColor: '#F6F6F6',
        height: 50,
        borderRadius: 8,
        color: '#212121',
        paddingLeft: 16,
        marginHorizontal: 16,
        fontFamily: 'Roboto-Regular',
    },
    btn: {
        backgroundColor: '#FF6C00',
        height: 51,
        borderRadius: 100,
        marginTop: 43,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 16,
    },
    btnText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Roboto-Regular',
    },
    linkText: {
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#1B4371',
        marginTop: 16,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
    },
    passwordShow: {
        position: 'absolute',
        top: 16,
        right: 32,
        fontSize: 16,
        color: '#1B4371',
        fontFamily: 'Roboto-Regular',
    },
})
