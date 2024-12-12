import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, 
onAuthStateChanged, signOut, sendPasswordResetEmail
} from "@firebase/auth";
import { getFirestore, setDoc, doc, documentId } from 'firebase/firestore';








 
 
var loginModal = document.getElementById("loginModal");
var loginBtn = document.getElementById("loginBtn");
var signupModal = document.getElementById("signupModal");
var signupBtn = document.getElementById("signupBtn");
var signupBtnLand = document.getElementById("signupBtnLand");
var loginBtnLand = document.getElementById("loginBtnLand");

const signup = async (email, password, firstname, lastname, UMBCID) => {
    try {
       
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
       
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



const forgotPasswordLink = document.querySelector('.forgot-password');
const loginUsername = document.getElementById('login-username');



 
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();  

     
    const email = loginUsername.value;
    const resetError = document.getElementById('resetError');
    const resetSuccess = document.getElementById('resetSuccess');

    if (email) {
        sendPasswordResetEmail(auth, email);
        resetSuccess.style.display = 'block';

        setTimeout(() => {
          resetSuccess.style.display = 'none';
      }, 10000);
    } else {
        alert('Please enter your email address.');
        resetError.style.display = 'block';
        setTimeout(() => {
          resetError.style.display = 'none';
      }, 10000);
    }
});

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

document.getElementById("orderNowbtn").onclick = function(){
  window.location.href = "menu.html";
}


document.getElementById('logoutBtn').onclick = function(event){
  signOut(auth)
  .then(() => {
     
    document.getElementById('message').innerHTML = "You have logged out.";
  })
  .catch((error) => {
     
    console.error("Error logging out:", error.message);
    document.getElementById('message').innerText = "Error logging out.";
  });
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
        alert("Username or Password are incorrect.");
            document.getElementById('message').innerText = error.message;

      });
});



function toggleItems(user) {
  const items = document.querySelectorAll('.navLink');  
  
   
  items.forEach(item => {
    if (user) {
      item.style.display = 'block';  
    } else {
      item.style.display = 'none';  
    }
  });
}





onAuthStateChanged(auth, (user) => {
    if (user) {
       
      document.getElementById('message').style.display = "inline";
      document.getElementById('message').innerHTML = `Welcome, ${user.email}!`;
      document.getElementById('loginBtn').style.display = "none";
      document.getElementById('signupBtn').style.display = "none";
      document.getElementById('loginBtnLand').style.display = "none";
      document.getElementById('signupBtnLand').style.display = "none";
      toggleItems(user);
      document.getElementById('orderNowbtn').style.display = "inline";
      document.getElementById('logoutBtn').style.display = "inline";

    } else {
       
      document.getElementById('message').innerHTML = "Please log in.";
      document.getElementById('loginBtn').style.display = "inline";
      document.getElementById('signupBtn').style.display = "inline";
      document.getElementById('loginBtnLand').style.display = "inline";
      document.getElementById('signupBtnLand').style.display = "inline";
      document.getElementById('message').style.display = "none";
      toggleItems();
      document.getElementById('orderNowbtn').style.display = "none";
      document.getElementById('logoutBtn').style.display = "none";
    }
  });


  
  window.onload = function() {
    document.body.classList.add('loaded');
  };




