import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './firebase'

export async function SignIn (email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}
export async function signOut() {
    return firebasebaseSignOut(auth)
}

export function getAuthErrorMessage(code) {
    const messages = {
        'auth/invalid-credential': 'Email ou mot de passe incorrect',
        'auth/user-not-found': 'Email ou mot de passe incorrect',
        'auth/wrong-password': 'Mot de passe incorrect',
        'auth/invalid-email': 'Email invalide',
        'auth/network-request-failed': 'Erreur de connexion',
    }
    return messages[code] ?? 'Une erreur est survenue. Réessayer plus tard.'
}