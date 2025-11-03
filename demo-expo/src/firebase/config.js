import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBImX7gQ4eiLXUgUH5es8Gxbi9GknCeL2k",
  authDomain: "grupo9prog3.firebaseapp.com",
  projectId: "grupo9prog3",
  storageBucket: "grupo9prog3.firebasestorage.app",
  messagingSenderId: "127390398941",
  appId: "1:127390398941:web:09523c3bc350b07b699e34",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();
