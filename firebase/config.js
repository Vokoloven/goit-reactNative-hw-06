// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyAybCBomRepa6CYY79hdLyGTO0SFax0nxk',
    authDomain: 'testproject-7277f.firebaseapp.com',
    projectId: 'testproject-7277f',
    storageBucket: 'testproject-7277f.appspot.com',
    messagingSenderId: '183631524781',
    appId: '1:183631524781:web:ad42a0ecdac50a2fe62724',
    measurementId: 'G-B9X4GX3BTP',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const storage = getStorage(app)
const db = getFirestore(app)

const exportFirebase = { auth, storage, db }

export default exportFirebase
