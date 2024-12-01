import {auth} from "./firebaseConfig.js"
import { signOut, onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (user) {
    // Display a greeting with the user's email
    document.getElementById('message').style.display = "inline";
    document.getElementById('message').innerHTML = `Welcome, ${user.email}!`;

  }
});


document.getElementById('logoutBtn').onclick = function(event){
    signOut(auth)
    .then(() => {
      // Successfully logged out
      window.location.href = "index.html"
    })
    .catch((error) => {
      // Handle any errors during logout
      console.error("Error logging out:", error.message);
    });
  }

