import { db, auth } from "./firebaseConfig";
import { collection, addDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Retrieve cart data from localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];




// Function to display cart items on the checkout page
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

// Update the total price on the page
function displayTotal() {
    const totalAmount = calculateTotal(cart); // Get the total price
    const totalElement = document.getElementById("totalAmount"); // Find the element to display the total
    totalElement.textContent = `Total: $${totalAmount.toFixed(2)}`; // Format to 2 decimal places
}

// Call this function when the page loads or when the cart is updated
displayTotal();

// Handle checkout submission
async function checkoutCart() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    try {
        // Example: Send the cart to the database
        const cartRef = collection(db, "orders"); // Firestore "orders" collection
        const user = auth.currentUser;
        const userOrder = {
            email: user.email,
            items: cart,
            timestamp: new Date().toISOString(),
        };

        await addDoc(cartRef, userOrder); // Add order to Firestore
        alert("Checkout successful! Your order has been placed.");

        // Clear localStorage and redirect back to the menu page
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
