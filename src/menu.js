import { db, auth } from "./firebaseConfig.js";
import { collection, doc, getDoc, getDocs} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

  
// Call the function to display the menu on page load
const today = new Date();
const dayOfWeek = today.getDay();
window.onload = shiftMenu(dayOfWeek);



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





async function shiftMenu(day) {
  const dayOfWeek = day;

  // Map JavaScript days to Firestore document names
  const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const dayName = daysOfWeek[dayOfWeek]; // Get the name of the current day

  document.getElementById("todaysDay").textContent = `${dayName.charAt(0).toUpperCase()}${dayName.slice(1)}'s Menu`;

  try {
    // Reference the "breakfast" subcollection for the given day
    const breakfastRef = collection(db, "menus", dayName, "brekkie"); 
    const breakfastSnapshot = await getDocs(breakfastRef); // Fetch all documents in the subcollection

    const lunchRef = collection(db, "menus", dayName, "lunch"); 
    const lunchSnapshot = await getDocs(lunchRef); // Fetch all documents in the subcollection

    const dinnerRef = collection(db, "menus", dayName, "dinner"); 
    const dinnerSnapshot = await getDocs(dinnerRef); // Fetch all documents in the subcollection

    if (!breakfastSnapshot.empty && !lunchSnapshot.empty && !dinnerSnapshot.empty) {
      // If the subcollection contains documents, display the menu



      


      const breakList2 = document.getElementById('brekkie-list'); // Get the UL container
      breakList2.innerHTML = ""; // Clear any existing menu items

      // Mock Firebase snapshot iteration function
      breakfastSnapshot.forEach(doc => {
        const item = doc.data(); // Get the data for each document
        const formattedPrice = `${parseFloat(item.Price).toFixed(2)}`;

        // Create the LI container for the menu item
        const li = document.createElement('li');
        li.classList.add('menu-item');

        // Create a div for text content
        const menuText = document.createElement('div');
        menuText.classList.add('menu-text');

        // Create and populate the food name
        const foodName = document.createElement('h2');
        foodName.textContent = item.Food;

        // Create and populate the description
        const foodDesc = document.createElement('p');
        foodDesc.textContent = item.Desc;

        // Add the name and description to the menuText div
        menuText.appendChild(foodName);
        menuText.appendChild(foodDesc);

        // Create and populate the price
        const price = document.createElement('span');
        price.classList.add('menu-price');
        price.textContent = `$${formattedPrice}`;

        // Create the order button
        const button = document.createElement('button');
        button.textContent = 'Order';
        button.onclick = () => handleOrder(item); // Attach the click handler

        // Assemble the LI item
        li.appendChild(menuText);
        li.appendChild(price);
        li.appendChild(button);

        // Add the item to the menu list
        breakList2.appendChild(li);
      });



      const dinnerList2 = document.getElementById('dinner-list'); // Get the UL container
      dinnerList2.innerHTML = ""; // Clear any existing menu items

      // Mock Firebase snapshot iteration function
      dinnerSnapshot.forEach(doc => {
        const item = doc.data(); // Get the data for each document
        const formattedPrice = `${parseFloat(item.Price).toFixed(2)}`;

        // Create the LI container for the menu item
        const li = document.createElement('li');
        li.classList.add('menu-item');

        // Create a div for text content
        const menuText = document.createElement('div');
        menuText.classList.add('menu-text');

        // Create and populate the food name
        const foodName = document.createElement('h2');
        foodName.textContent = item.Food;

        // Create and populate the description
        const foodDesc = document.createElement('p');
        foodDesc.textContent = item.Desc;

        // Add the name and description to the menuText div
        menuText.appendChild(foodName);
        menuText.appendChild(foodDesc);

        // Create and populate the price
        const price = document.createElement('span');
        price.classList.add('menu-price');
        price.textContent = `$${formattedPrice}`;

        // Create the order button
        const button = document.createElement('button');
        button.textContent = 'Order';
        button.onclick = () => handleOrder(item); // Attach the click handler

        // Assemble the LI item
        li.appendChild(menuText);
        li.appendChild(price);
        li.appendChild(button);

        // Add the item to the menu list
        dinnerList2.appendChild(li);
      });


      const lunchList2 = document.getElementById('lunch-list'); // Get the UL container
      lunchList2.innerHTML = ""; // Clear any existing menu items

      // Mock Firebase snapshot iteration function
      lunchSnapshot.forEach(doc => {
        const item = doc.data(); // Get the data for each document
        const formattedPrice = `${parseFloat(item.Price).toFixed(2)}`;

        // Create the LI container for the menu item
        const li = document.createElement('li');
        li.classList.add('menu-item');

        // Create a div for text content
        const menuText = document.createElement('div');
        menuText.classList.add('menu-text');

        // Create and populate the food name
        const foodName = document.createElement('h2');
        foodName.textContent = item.Food;

        // Create and populate the description
        const foodDesc = document.createElement('p');
        foodDesc.textContent = item.Desc;

        // Add the name and description to the menuText div
        menuText.appendChild(foodName);
        menuText.appendChild(foodDesc);

        // Create and populate the price
        const price = document.createElement('span');
        price.classList.add('menu-price');
        price.textContent = `$${formattedPrice}`;

        // Create the order button
        const button = document.createElement('button');
        button.textContent = 'Order';
        button.onclick = () => handleOrder(item); // Attach the click handler

        // Assemble the LI item
        li.appendChild(menuText);
        li.appendChild(price);
        li.appendChild(button);

        // Add the item to the menu list
        lunchList2.appendChild(li);
      });





      
    } else {
      console.log("No breakfast menu available for today.");
    }
  } catch (error) {
    console.error("Error fetching the menu: ", error);
  }
}

/*
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cartCount");
  cartCountElement.textContent = count;
}

// Example usage:
let cartItems = 0; // Initialize the cart with 0 items

// Simulate adding an item to the cart
function addItemToCart(num) {
  cartItems += num; // Increment the number of items
  updateCartCount(cartItems); // Update the cart count display
}
*/

function updateCartCount(count) {
  const cartCountElement = document.getElementById("cartCount");
  cartCountElement.textContent = count;
}


let cart = []; // Local array to store cart items

// Function to add items to the cart
function addItemToCart(item, quantity) {
  // Check if the item already exists in the cart
  const existingItem = cart.find(cartItem => cartItem.Food === item.Food);
  
  if (existingItem) {
    // If item exists, update the quantity
    existingItem.quantity += quantity;
  } else {
    // If item is new, add it to the cart
    cart.push({ ...item, quantity });
  }

  updateCartCount(getTotalItems()); // Update cart count display
}

// Function to get the total number of items in the cart
function getTotalItems() {
  return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
}



// Function to handle the "Order" button click
function handleOrder(item) {
  // Set item details in the modal
  const modalItemDetails = document.getElementById("modalItemDetails");
  modalItemDetails.textContent = `${item.Food} - ${item.Desc} - $${item.Price}`;

  // Show the modal
  const orderModal = document.getElementById("orderModal");
  orderModal.style.display = "block";

  // Handle confirm button click
  const confirmOrderButton = document.getElementById("confirmOrderButton");
  confirmOrderButton.onclick = () => {
    const quantity = parseInt(document.getElementById("quantity").value, 10); // Ensure the input is treated as a number
    if (quantity > 0) {
      alert(`Order confirmed for ${quantity} x ${item.Food}`);
      orderModal.style.display = "none"; // Close the modal
      // Add logic here to handle order submission (e.g., save to database)
      addItemToCart(item, quantity);

    } else {
      alert("Please enter a valid quantity.");
    }
  };

  // Handle modal close button
  const closeModalButton = document.getElementById("closeModalButton");
  closeModalButton.onclick = () => {
    orderModal.style.display = "none"; // Close the modal
  };
}

// Close modal when clicking outside of it
window.onclick = (event) => {
  const orderModal = document.getElementById("orderModal");
  if (event.target === orderModal) {
    orderModal.style.display = "none";
  }
};



function goToCheckout() {
  if (cart.length === 0) {
      alert("Your cart is empty. Please add items before proceeding to checkout.");
      return;
  }

  // Save the cart data to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Redirect to the checkout page
  window.location.href = "checkout.html";
}


document.getElementById("checkoutBtn").onclick = function(){
  goToCheckout();
}


document.getElementById("sunBtn").onclick = function(){
  shiftMenu(0);
}
document.getElementById("monBtn").onclick = function(){
  shiftMenu(1);
}
document.getElementById("tueBtn").onclick = function(){
  shiftMenu(2);
}
document.getElementById("wedBtn").onclick = function(){
  shiftMenu(3);
}
document.getElementById("thuBtn").onclick = function(){
  shiftMenu(4);
}
document.getElementById("friBtn").onclick = function(){
  shiftMenu(5);
}
document.getElementById("satBtn").onclick = function(){
  shiftMenu(6);
}


  