import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export async function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export async function signOut() {
  return firebaseSignOut(auth);
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

export function getAuthErrorMessage(code) {
  const messages = {
    "auth/invalid-credential": "Email ou mot de passe incorrect.",
    "auth/user-not-found": "Aucun compte avec cet email.",
    "auth/wrong-password": "Mot de passe incorrect.",
    "auth/invalid-email": "Adresse email invalide.",
    "auth/too-many-requests": "Trop de tentatives. Réessaie plus tard.",
    "auth/network-request-failed": "Erreur réseau. Vérifie ta connexion.",
  };
  return messages[code] ?? "Une erreur est survenue. Réessaie.";
}
