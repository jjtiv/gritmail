import {auth} from "./firebaseConfig.js"
import { signOut, onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (user) {
     
    document.getElementById('message').style.display = "inline";
    document.getElementById('message').innerHTML = `Welcome, ${user.email}!`;

  }
});


document.getElementById('logoutBtn').onclick = function(event){
    signOut(auth)
    .then(() => {
       
      window.location.href = "index.html"
    })
    .catch((error) => {
       
      console.error("Error logging out:", error.message);
    });
  }

