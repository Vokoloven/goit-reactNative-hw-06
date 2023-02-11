import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut,
} from 'firebase/auth'
import { createAsyncThunk } from '@reduxjs/toolkit'
import exportFirebase from '../../firebase/config'

const { auth } = exportFirebase

export const userRegister = createAsyncThunk(
    'user/Register',
    async (userData, thunkAPI) => {
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                userData.email,
                userData.password
            )

            if (response) {
                const { user } = response

                await updateProfile(user, { displayName: userData.login })

                return user
            }
        } catch (e) {
            thunkAPI.rejectWithValue(e.response.user)
        }
    }
)

export const userLogin = createAsyncThunk(
    'user/Login',
    async (userData, thunkAPI) => {
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                userData.email,
                userData.password
            )

            if (response) {
                const { user } = response

                return user
            }
        } catch (e) {
            thunkAPI.rejectWithValue(e.response.user)
        }
    }
)

export const userRefresh = createAsyncThunk(
    'user/Refresh',
    async (_, thunkAPI) => {
        try {
            return new Promise((resolve, reject) => {
                const response = onAuthStateChanged(auth, (user) => {
                    response()
                    if (user) {
                        resolve(user)
                    } else {
                        reject(thunkAPI.rejectWithValue('Error'))
                    }
                })
            })
        } catch (e) {
            thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const userSignOut = createAsyncThunk(
    'user/SignOut',
    async (_, thunkAPI) => {
        try {
            const response = await signOut(auth)

            return response
        } catch (e) {
            thunkAPI.rejectWithValue(e.message)
        }
    }
)
