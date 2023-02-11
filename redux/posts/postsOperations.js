import { createAsyncThunk } from '@reduxjs/toolkit'
import { collection, getDocs, doc } from 'firebase/firestore'

import exportFirebase from '../../firebase/config'
const { db } = exportFirebase

export const dataPosts = createAsyncThunk('posts/Data', async (_, thunkAPI) => {
    try {
        const data = []
        const getPosts = await getDocs(collection(db, 'posts'))
        getPosts.forEach((doc) => {
            const { id } = doc
            data.push({ ...doc.data(), id })
        })

        return data
    } catch (e) {
        thunkAPI.rejectWithValue(e.data.uid)
    }
})

export const dataComments = createAsyncThunk(
    'posts/Comments',
    async (postsId, thunkAPI) => {
        try {
            if (postsId) {
                const data = []

                const postsRef = doc(db, `posts/${postsId}`)

                const getComments = await getDocs(
                    collection(postsRef, 'comments')
                )
                getComments.forEach((doc) => {
                    data.push(doc.data())
                })

                return data
            }
        } catch (e) {
            thunkAPI.rejectWithValue(e.data)
        }
    }
)
