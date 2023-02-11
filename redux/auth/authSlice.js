import { createSlice } from '@reduxjs/toolkit'
import {
    userRegister,
    userLogin,
    userRefresh,
    userSignOut,
} from './authOperations'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
    key: 'user',
    storage: AsyncStorage,
}

const initialState = {
    isLogged: false,
    user: {},
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(userRegister.pending, (state) => {
            state.isLogged = false
        })
        builder.addCase(userRegister.fulfilled, (state) => {
            state.isLogged = true
        })
        builder.addCase(userRegister.rejected, (state) => {
            state.isLogged = false
        })
        builder.addCase(userLogin.pending, (state) => {
            state.isLogged = false
        })
        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            state.isLogged = true
            state.user = { ...payload }
        })
        builder.addCase(userLogin.rejected, (state) => {
            state.isLogged = false
        })
        builder.addCase(userRefresh.pending, (state) => {
            state.isLogged = false
        })
        builder.addCase(userRefresh.fulfilled, (state, { payload }) => {
            state.isLogged = true
            state.user = { ...payload }
        })
        builder.addCase(userRefresh.rejected, (state) => {
            state.isLogged = false
        })
        builder.addCase(userSignOut.fulfilled, (state, action) => {
            state.user = {}
            state.isLogged = false
        })
    },
})

export const persistedReducer = persistReducer(persistConfig, authSlice.reducer)
