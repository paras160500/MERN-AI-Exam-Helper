import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "ai-exam-notes-creator.firebaseapp.com",
  projectId: "ai-exam-notes-creator",
  storageBucket: "ai-exam-notes-creator.firebasestorage.app",
  messagingSenderId: "153937973956",
  appId: "1:153937973956:web:70e20d305c29a8ed9c2f91",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
