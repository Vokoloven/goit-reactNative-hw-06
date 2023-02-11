import { userRegister, userLogin } from '../../../redux/auth/authOperations'

export const regAssistance = async (
    state,
    dispatch,
    navigation,
    setState,
    initialState
) => {
    const response = await dispatch(userRegister(state))

    if (response.type === 'user/Register/fulfilled') {
        ;() => {
            navigation.navigate('Home')
            setState(initialState)
        }
    }
}

export const logAssistance = async (
    state,
    dispatch,
    navigation,
    setState,
    initialState,
    dataPosts
) => {
    const response = await dispatch(userLogin(state))

    console.log(dataPosts)
    dispatch(dataPosts())

    if (response.type === 'user/Login/fulfilled') {
        ;() => {
            navigation.navigate('Home')
            setState(initialState)
        }
    }
}
