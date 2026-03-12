import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './firebase'

export async function SignIn (email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}
export async function signOut() {
    return firebasebaseSignOut(auth)
}