import { auth, db } from "./firebaseConfig.js";
import { signOut } from "@firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";


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

async function getMenu() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // Get current day (0 = Sunday, 1 = Monday, etc.)

  // Map JavaScript days to Firestore document names
  const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const dayName = daysOfWeek[dayOfWeek]; // Get the name of the current day

  try {
    // Get the document for the current day from Firestore
    const docRef = doc(db, "menus", dayName); // Reference to the day's document
    const docSnap = await getDoc(docRef); // Fetch the document

    if (docSnap.exists()) {
      // If the document exists, display the menu
      const menu = docSnap.data().menu;
      const menuList = document.getElementById('menu-list');
      menuList.innerHTML = ""; // Clear any existing menu items
      menu.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        menuList.appendChild(li);
      });
    } else {
      console.log("No menu available for today.");
    }
  } catch (error) {
    console.error("Error fetching the menu: ", error);
  }
}

// Call the function to display the menu on page load
window.onload = getMenu;