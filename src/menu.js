import { db, auth } from "./firebaseConfig.js";
import { collection, doc, getDoc, getDocs} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

  
 
const today = new Date();
const dayOfWeek = today.getDay();
window.onload = shiftMenu(dayOfWeek);



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





async function shiftMenu(day) {
  const dayOfWeek = day;

   
  const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const dayName = daysOfWeek[dayOfWeek];  

  document.getElementById("todaysDay").textContent = `${dayName.charAt(0).toUpperCase()}${dayName.slice(1)}'s Menu`;

  try {
     
    const breakfastRef = collection(db, "menus", dayName, "brekkie"); 
    const breakfastSnapshot = await getDocs(breakfastRef);  

    const lunchRef = collection(db, "menus", dayName, "lunch"); 
    const lunchSnapshot = await getDocs(lunchRef);  

    const dinnerRef = collection(db, "menus", dayName, "dinner"); 
    const dinnerSnapshot = await getDocs(dinnerRef);  

    if (!breakfastSnapshot.empty && !lunchSnapshot.empty && !dinnerSnapshot.empty) {
       



      


      const breakList2 = document.getElementById('brekkie-list');  
      breakList2.innerHTML = "";  

       
      breakfastSnapshot.forEach(doc => {
        const item = doc.data();  
        const formattedPrice = `${parseFloat(item.Price).toFixed(2)}`;

         
        const li = document.createElement('li');
        li.classList.add('menu-item');

         
        const menuText = document.createElement('div');
        menuText.classList.add('menu-text');

         
        const foodName = document.createElement('h2');
        foodName.textContent = item.Food;

         
        const foodDesc = document.createElement('p');
        foodDesc.textContent = item.Desc;

         
        menuText.appendChild(foodName);
        menuText.appendChild(foodDesc);

         
        const price = document.createElement('span');
        price.classList.add('menu-price');
        price.textContent = `$${formattedPrice}`;

         
        const button = document.createElement('button');
        button.textContent = 'Order';
        button.onclick = () => handleOrder(item);  

         
        li.appendChild(menuText);
        li.appendChild(price);
        li.appendChild(button);

         
        breakList2.appendChild(li);
      });



      const dinnerList2 = document.getElementById('dinner-list');  
      dinnerList2.innerHTML = "";  

       
      dinnerSnapshot.forEach(doc => {
        const item = doc.data();  
        const formattedPrice = `${parseFloat(item.Price).toFixed(2)}`;

         
        const li = document.createElement('li');
        li.classList.add('menu-item');

         
        const menuText = document.createElement('div');
        menuText.classList.add('menu-text');

         
        const foodName = document.createElement('h2');
        foodName.textContent = item.Food;

         
        const foodDesc = document.createElement('p');
        foodDesc.textContent = item.Desc;

         
        menuText.appendChild(foodName);
        menuText.appendChild(foodDesc);

         
        const price = document.createElement('span');
        price.classList.add('menu-price');
        price.textContent = `$${formattedPrice}`;

         
        const button = document.createElement('button');
        button.textContent = 'Order';
        button.onclick = () => handleOrder(item);  

         
        li.appendChild(menuText);
        li.appendChild(price);
        li.appendChild(button);

         
        dinnerList2.appendChild(li);
      });


      const lunchList2 = document.getElementById('lunch-list');  
      lunchList2.innerHTML = "";  

       
      lunchSnapshot.forEach(doc => {
        const item = doc.data();  
        const formattedPrice = `${parseFloat(item.Price).toFixed(2)}`;

         
        const li = document.createElement('li');
        li.classList.add('menu-item');

         
        const menuText = document.createElement('div');
        menuText.classList.add('menu-text');

         
        const foodName = document.createElement('h2');
        foodName.textContent = item.Food;

         
        const foodDesc = document.createElement('p');
        foodDesc.textContent = item.Desc;

         
        menuText.appendChild(foodName);
        menuText.appendChild(foodDesc);

         
        const price = document.createElement('span');
        price.classList.add('menu-price');
        price.textContent = `$${formattedPrice}`;

         
        const button = document.createElement('button');
        button.textContent = 'Order';
        button.onclick = () => handleOrder(item);  

         
        li.appendChild(menuText);
        li.appendChild(price);
        li.appendChild(button);

         
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

 
let cartItems = 0;  

 
function addItemToCart(num) {
  cartItems += num;  
  updateCartCount(cartItems);  
}
*/

function updateCartCount(count) {
  const cartCountElement = document.getElementById("cartCount");
  cartCountElement.textContent = count;
}


let cart = [];  

 
function addItemToCart(item, quantity) {
   
  const existingItem = cart.find(cartItem => cartItem.Food === item.Food);
  
  if (existingItem) {
     
    existingItem.quantity += quantity;
  } else {
     
    cart.push({ ...item, quantity });
  }

  updateCartCount(getTotalItems());  
}

 
function getTotalItems() {
  return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
}



 
function handleOrder(item) {
   
  const modalItemDetails = document.getElementById("modalItemDetails");
  modalItemDetails.textContent = `${item.Food} - ${item.Desc} - $${item.Price}`;

   
  const orderModal = document.getElementById("orderModal");
  orderModal.style.display = "block";

   
  const confirmOrderButton = document.getElementById("confirmOrderButton");
  confirmOrderButton.onclick = () => {
    const quantity = parseInt(document.getElementById("quantity").value, 10);  
    if (quantity > 0) {
      alert(`Order confirmed for ${quantity} x ${item.Food}`);
      orderModal.style.display = "none";  
       
      addItemToCart(item, quantity);

    } else {
      alert("Please enter a valid quantity.");
    }
  };

   
  const closeModalButton = document.getElementById("closeModalButton");
  closeModalButton.onclick = () => {
    orderModal.style.display = "none";  
  };
}

 
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

   
  localStorage.setItem("cart", JSON.stringify(cart));

   
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


  