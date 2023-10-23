// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhC-0g4qZOEyEmVFsCzLz0vpnQQ2y_5i8",
    authDomain: "fitness-app-medal.firebaseapp.com",
    projectId: "fitness-app-medal",
    storageBucket: "fitness-app-medal.appspot.com",
    messagingSenderId: "1003817030348",
    appId: "1:1003817030348:web:b3cb38ec70a1c843372869"
};
// ios 954984475831-eb0bcq9evtpjnjc3atpqr3hckl72pjmu.apps.googleusercontent.com
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export const storage = getStorage(app);
export default app