import { db, auth } from "./firebaseConfig";
import { collection, addDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";

 
const cart = JSON.parse(localStorage.getItem("cart")) || [];




 
function displayCartItems() {
    const cartContainer = document.getElementById("cartContainer");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.textContent = `${item.quantity} x ${item.Food} - ${item.Desc} - $${item.Price}`;
        cartContainer.appendChild(itemElement);
    });
}

displayCartItems();

function calculateTotal(cart) {
    return cart.reduce((total, item) => {
        return total + (item.quantity * item.Price);
    }, 0);
}

 
function displayTotal() {
    const totalAmount = calculateTotal(cart);  
    const totalElement = document.getElementById("totalAmount");  
    totalElement.textContent = `Total: $${totalAmount.toFixed(2)}`;  
}

 
displayTotal();

 
async function checkoutCart() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    try {
         
        const cartRef = collection(db, "orders");  
        const user = auth.currentUser;
        const userOrder = {
            email: user.email,
            items: cart,
            timestamp: new Date().toISOString(),
        };

        await addDoc(cartRef, userOrder);  
        alert("Checkout successful! Your order has been placed.");

         
        localStorage.removeItem("cart");
        window.location.href = "menu.html";
    } catch (error) {
        console.error("Error during checkout:", error);
        alert("Failed to place order. Please try again.");
    }
}

document.getElementById("checkoutButton").addEventListener("click", checkoutCart);

document.getElementById("cancelBtn").onclick = function(){
    localStorage.removeItem("cart");
    window.location.href = "menu.html";
}
