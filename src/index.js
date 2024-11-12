import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, 
onAuthStateChanged
} from "@firebase/auth";

//signup users
document.getElementById("signup-form").addEventListener('submit', (e) =>{
    e.preventDefault()

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            document.getElementById('message').innerText = "Signup successful!";
        })
        .catch((err) =>{
            document.getElementById('message').innerText = "Problem signing up.";
        })
})

//login
// Get modal and buttons
var modal = document.getElementById("loginModal");
var btn = document.getElementById("loginBtn");

btn.onclick = function() {
    modal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
            document.getElementById('message').innerHTML = `Login successful! Welcome, ${email}`;
            modal.style.display = "none";
      })
      .catch((error) => {
            document.getElementById('message').innerText = error.message;

      });
});

onAuthStateChanged(auth, (user) => {
    if (user) {
      // Display a greeting with the user's email
      document.getElementById('message').innerHTML = `Welcome, ${user.email}!`;
      modal.style.display = "none"; // Hide the modal if logged in
    } else {
      // If no user is logged in, show a message or prompt to login
      document.getElementById('message').innerHTML = "Please log in.";
    }
  });


