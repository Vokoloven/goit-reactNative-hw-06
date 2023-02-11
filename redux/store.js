import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authSlice, persistedReducer } from './auth/authSlice'
import { postsSlice } from './posts/postsSlice'

import { persistStore } from 'redux-persist'

const rootReducer = combineReducers({
    [authSlice.name]: persistedReducer,
    [postsSlice.name]: postsSlice.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store)
