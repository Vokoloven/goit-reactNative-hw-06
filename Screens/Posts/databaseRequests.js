import { Platform } from 'react-native'
import uuid from 'react-native-uuid'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import exportFirebase from '../../firebase/config'

const { storage, db } = exportFirebase

export const uploadPhotoToDb = async (photo, setPhotoDb) => {
    const uniquePostId = uuid.v4()
    const { uri } = photo
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const storageRef = ref(storage, `images/${uniquePostId}`)

    const response = await fetch(uploadUri)
    const file = await response.blob()

    const metadata = {
        contentType: 'image/jpeg',
    }

    await uploadBytes(storageRef, file, metadata)

    const getPhotoUrl = await getDownloadURL(
        ref(storage, `images/${uniquePostId}`)
    )
    if (getPhotoUrl !== '') {
        setPhotoDb(getPhotoUrl)
    }
}

export const uploadPostToDb = async (photoDb, geolocation, state, user) => {
    try {
        const docRef = await addDoc(collection(db, 'posts'), {
            photo: photoDb,
            geolocation,
            state,
            uid: user.uid,
            nickName: user.displayName,
        })

        // console.log('Document written with ID: ', docRef.id)
    } catch (e) {
        console.error('Error adding document: ', e)
    }
}
