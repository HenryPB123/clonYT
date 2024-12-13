import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHDIT-y-wWmy1l0oSNgGSaWlvAmS1RUiw",
  authDomain: "video-3fa0d.firebaseapp.com",
  projectId: "video-3fa0d",
  storageBucket: "video-3fa0d.firebasestorage.app",
  messagingSenderId: "927067484678",
  appId: "1:927067484678:web:66c3473dfdfa2f7e2f8987",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
