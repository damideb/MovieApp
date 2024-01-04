// Import the functions you need from the SDKs you need
import {getApp, getApps, initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6cH7z9Eyk4EpGS7fcZbPGxTf0-XJWPFA",
  authDomain: "next-auth-7518b.firebaseapp.com",
  projectId: "next-auth-7518b",
  storageBucket: "next-auth-7518b.appspot.com",
  messagingSenderId: "598081188710",
  appId: "1:598081188710:web:486af5d0c83a51b593cea7"
};

// Initialize Firebase
const app = getApps().length? getApp(): initializeApp(firebaseConfig);
const auth = getAuth()

export {app, auth}