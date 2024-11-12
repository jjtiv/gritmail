import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDc21P618AP9ABDE5e5GFgOLN0MKyz-xMk",
    authDomain: "gritmail447.firebaseapp.com",
    projectId: "gritmail447",
    storageBucket: "gritmail447.firebasestorage.app",
    messagingSenderId: "44157529917",
    appId: "1:44157529917:web:44b90f0fdcb0a4d675df54",
    measurementId: "G-0QW08HYD9P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };