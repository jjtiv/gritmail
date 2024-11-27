import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, 
onAuthStateChanged
} from "@firebase/auth";
import { getFirestore, setDoc, doc } from 'firebase/firestore';







//login and signup
// Get modal and buttons
var loginModal = document.getElementById("loginModal");
var loginBtn = document.getElementById("loginBtn");
var signupModal = document.getElementById("signupModal");
var signupBtn = document.getElementById("signupBtn");
var signupBtnLand = document.getElementById("signupBtnLand");
var loginBtnLand = document.getElementById("loginBtnLand");

const signup = async (email, password, firstname, lastname, UMBCID) => {
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Store user's name and email in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        firstname: firstname,
        lastname: lastname,
        UMBCID: UMBCID,
      });
      signupModal.style.display = "none";
      console.log('User signed up and data stored successfully!');
    } catch (error) {
      console.error('Error during signup: ', error.message);
    }
};


document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const firstname = document.getElementById('signup-firstname').value;
    const lastname = document.getElementById('signup-lastname').value;
    const UMBCID = document.getElementById('signup-UMBCID').value;

    signup(email, password, firstname, lastname, UMBCID);
});

loginBtn.onclick = function() {
    loginModal.style.display = "flex";
}

window.onclick = function(event) {
    if (event.target == loginModal || event.target == signupModal ) {
        loginModal.style.display = "none";
        signupModal.style.display = "none";
    }
}

signupBtn.onclick = function() {
    signupModal.style.display = "flex";
}
signupBtnLand.onclick = function() {
    signupModal.style.display = "flex";
}
loginBtnLand.onclick = function() {
    loginModal.style.display = "flex";
}



document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
            document.getElementById('message').innerHTML = `Login successful! Welcome, ${email}`;
            loginModal.style.display = "none";
      })
      .catch((error) => {
            document.getElementById('message').innerText = error.message;

      });
});


//signup modal
/*
document.getElementById("signup-form").addEventListener('submit', (e) =>{
    e.preventDefault()

    const email = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            document.getElementById('message').innerText = "Signup successful!";
            signupModal.style.display = "none";
        })
        .catch((err) =>{
            document.getElementById('message').innerText = "Problem signing up.";
        })
});
*/

onAuthStateChanged(auth, (user) => {
    if (user) {
      // Display a greeting with the user's email
      document.getElementById('message').style.display = "inline";
      document.getElementById('message').innerHTML = `Welcome, ${user.email}!`;
      document.getElementById('loginBtn').style.display = "none";
      document.getElementById('signupBtn').style.display = "none";
      document.getElementById('loginBtnLand').style.display = "none";
      document.getElementById('signupBtnLand').style.display = "none";

    } else {
      // If no user is logged in, show a message or prompt to login
      document.getElementById('message').innerHTML = "Please log in.";
      document.getElementById('loginBtn').style.display = "inline";
      document.getElementById('signupBtn').style.display = "inline";
      document.getElementById('loginBtnLand').style.display = "inline";
      document.getElementById('signupBtnLand').style.display = "inline";
      document.getElementById('message').style.display = "none";
    }
  });


  
  window.onload = function() {
    document.body.classList.add('loaded');
  };




