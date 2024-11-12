import { auth } from "./firebaseConfig.js";
import { signOut } from "@firebase/auth";

//logout
document.getElementById('logoutBtn').onclick = function(event){
    signOut(auth)
    .then(() => {
      // Successfully logged out
      document.getElementById('message').innerHTML = "You have logged out.";
    })
    .catch((error) => {
      // Handle any errors during logout
      console.error("Error logging out:", error.message);
      document.getElementById('message').innerText = "Error logging out.";
    });
}
