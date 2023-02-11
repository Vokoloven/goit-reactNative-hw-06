import { createSlice } from '@reduxjs/toolkit'
import { dataPosts, dataComments } from './postsOperations'

const initialState = {
    postsDb: [],
    commentsDb: [],
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(dataPosts.pending, (state) => {
            state.postsDb = []
        })
        builder.addCase(dataPosts.fulfilled, (state, { payload }) => {
            state.postsDb = [...state.postsDb, ...payload]
        })
        builder.addCase(dataPosts.rejected, (state) => {
            state.postsDb = []
        })
        builder.addCase(dataComments.pending, (state) => {
            state.commentsDb = []
        })
        builder.addCase(dataComments.fulfilled, (state, { payload }) => {
            state.commentsDb = [...state.commentsDb, ...payload]
        })
        builder.addCase(dataComments.rejected, (state) => {
            state.commentsDb = []
        })
    },
})
