import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB7QJRo82Z44HNRzjvLMEL00aZEF0hPmDo",
  authDomain: "ferreteria-la-4.firebaseapp.com",
  projectId: "ferreteria-la-4",
  storageBucket: "ferreteria-la-4.firebasestorage.app",
  messagingSenderId: "392914993822",
  appId: "1:392914993822:web:a7aca5d254d587a6b5b18f",
  measurementId: "G-Z7YM49CGZW"
}

// Initialize Firebase (singleton pattern)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(app)

export { db }
