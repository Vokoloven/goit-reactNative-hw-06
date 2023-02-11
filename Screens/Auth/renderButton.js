import { View, Text, TouchableOpacity } from 'react-native'
import { logAssistance, regAssistance } from './helpers/authAssistance'

export const renderButton = (
    isShowKeyboard,
    setState,
    initialState,
    navigation,
    auth,
    dispatch,
    state,
    dataPosts
) => {
    if (!isShowKeyboard) {
        return (
            <View>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#FF6C00',
                        height: 51,
                        borderRadius: 100,
                        marginTop: 43,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 16,
                    }}
                    activeOpacity={0.5}
                    onPress={() => {
                        auth === 'Login'
                            ? regAssistance(
                                  state,
                                  dispatch,
                                  setState,
                                  initialState
                              )
                            : logAssistance(
                                  state,
                                  dispatch,
                                  setState,
                                  initialState,
                                  dataPosts
                              )
                    }}
                >
                    {auth === 'Login' ? (
                        <Text
                            style={{
                                fontSize: 16,
                                color: '#fff',
                                fontFamily: 'Roboto-Regular',
                            }}
                        >
                            Зарегистрироваться
                        </Text>
                    ) : (
                        <Text
                            style={{
                                fontSize: 16,
                                color: '#fff',
                                fontFamily: 'Roboto-Regular',
                            }}
                        >
                            Войти
                        </Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        navigation.navigate(auth)
                    }}
                >
                    {auth === 'Login' ? (
                        <Text
                            style={{
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                color: '#1B4371',
                                marginTop: 16,
                                fontSize: 16,
                                fontFamily: 'Roboto-Regular',
                            }}
                        >
                            Уже есть аккаунт? Войти
                        </Text>
                    ) : (
                        <Text
                            style={{
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                color: '#1B4371',
                                marginTop: 16,
                                fontSize: 16,
                                fontFamily: 'Roboto-Regular',
                            }}
                        >
                            Нет аккаунта? Зарегистрироваться
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        )
    }
}
