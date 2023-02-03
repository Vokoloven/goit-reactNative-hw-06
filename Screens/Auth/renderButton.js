import { View, Text, TouchableOpacity } from 'react-native'

export const renderButton = (
    isShowKeyboard,
    setState,
    initialState,
    navigation,
    auth
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
                        setState(initialState)
                        navigation.navigate('Home')
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#fff',
                            fontFamily: 'Roboto-Regular',
                        }}
                    >
                        Войти
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate(auth)}
                >
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
                </TouchableOpacity>
            </View>
        )
    }
}
