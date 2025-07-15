import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

//Removed Information for Data Privacy
const firebaseConfig = {
    apiKey: "",
    authDomain: "gritmail447.firebaseapp.com",
    projectId: "gritmail447",
    storageBucket: "gritmail447.firebasestorage.app",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };
