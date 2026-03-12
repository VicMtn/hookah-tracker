import { initializeApp } from 'firebase/app'
import { getDatabase }   from 'firebase/database'
import { getAuth }       from 'firebase/auth'

require('dotenv').config()

const firebaseConfig =  {
    firebase_apiKey: process.env.firebase_apiKey,
    firebase_authDomain: process.env.firebase_authDomain,
    firebase_databaseURL: process.env.firebase_databaseURL,
    firebase_projectId: process.env.firebase_projectId,
    firebase_storageBucket: process.env.firebase_storageBucket,
    firebase_messagingSenderId: process.env.firebase_messagingSenderId,
    firebase_appId: process.env.firebase_appId
}
const app = initializeApp(firebaseConfig)

export const db   = getDatabase(app)
export const auth = getAuth(app)