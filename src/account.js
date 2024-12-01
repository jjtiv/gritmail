import {auth, db} from "./firebaseConfig.js"
import { signOut, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import {getFirestore, doc, getDoc, collection, getDocs, where, query} from "firebase/firestore"



async function loadInfo(action) {
    try {
        console.log(action); // Optional: log the action
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in, get the UID
                const userId = user.uid; // Use Firebase Authentication UID
                const userDocRef = doc(db, "users", userId); // Reference the user's document in Firestore
                
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    displayUserInfo(data, action);
                } else {
                    console.log("No user data available");
                    document.getElementById("userInfo").innerText = "No information found.";
                }
            } else {
                console.log("No user is signed in.");
                document.getElementById("userInfo").innerText = "Please sign in to view information.";
            }
        });
    } catch (error) {
        console.error("Error loading user information:", error);
    }
}

// Function to display user info in the DOM
function displayUserInfo(data, action) {
    const userInfoDiv = document.getElementById("mainContent");
    userInfoDiv.innerHTML = `<div class="accountSection">
                                <h2>${action}</h2>
                                <p><strong>ID:</strong> ${data.UMBCID}</p>
                                <p><strong>Name:</strong> ${data.firstname} ${data.lastname}</p>
                                <p><strong>Email:</strong> ${data.email}</p>
                              </div>`;
}

document.getElementById('viewInfo').addEventListener('click', function() {
    loadInfo('View My Information');
});


async function loadOrderHistory(action) {
    try {
        console.log(action); // Optional: log the action
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in, get their email
                const userEmail = user.email;

                // Query Firestore for orders with matching email
                const ordersCollection = collection(db, "orders"); // Assuming your orders are in an "orders" collection
                const q = query(ordersCollection, where("email", "==", userEmail)); // Query by email
                const querySnapshot = await getDocs(q); // Execute the query

                if (!querySnapshot.empty) {
                    const orders = [];
                    querySnapshot.forEach((doc) => {
                        orders.push(doc.data());
                    });
                    displayOrderHistory(orders);
                } else {
                    console.log("No orders found for this user.");
                    document.getElementById("orderHistory").innerText = "No orders found.";
                }
            } else {
                console.log("No user is signed in.");
                document.getElementById("orderHistory").innerText = "Please sign in to view your order history.";
            }
        });
    } catch (error) {
        console.error("Error loading order history:", error);
    }
}

// Function to display order history in the DOM
function displayOrderHistory(orders) {
    const orderHistoryDiv = document.getElementById("mainContent");
    orderHistoryDiv.innerHTML = "<h1>Order History</h1>"; // Clear previous data


    orders.forEach((order, index) => {
        const total = order.items.reduce((sum, item) => sum + item.Price * item.quantity, 0);
        const orderHTML = `
        <div class=accountSection>
            <div class="order">
                <h3>Order ${index + 1}</h3>
                <p><strong>Email:</strong> ${order.email}</p>
                <p><strong>Timestamp:</strong> ${new Date(order.timestamp).toLocaleString()}</p>
                <ul>
                    ${order.items.map(item => `
                        <li>
                            <p><strong>Food:</strong> ${item.Food}</p>
                            <p><strong>Description:</strong> ${item.Desc}</p>
                            <p><strong>Price:</strong> $${item.Price.toFixed(2)}</p>
                            <p><strong>Quantity:</strong> ${item.quantity}</p>
                        </li>
                    `).join("")}
                </ul>
                <p class="orderTotal"><strong>Total:</strong> $${total.toFixed(2)}</p>
            </div>
        </div>
        `;
        orderHistoryDiv.innerHTML += orderHTML;
    });
}


document.getElementById('orderHistory').addEventListener('click', function() {
    loadOrderHistory('View Order History');
});

document.getElementById('paymentMethods').addEventListener('click', function() {
    loadContent('Payment Methods');
});


function loadPass(section) {
    const contentArea = document.getElementById('mainContent');
    contentArea.innerHTML = `<div id="passwordResetForm" class="accountSection">
    <h1>${section}</h1>
    <h2>Reset Password</h2>
    <form id="resetPasswordForm">
        <label for="resetEmail">Enter your email address:</label>
        <input type="email" id="resetEmail" required>

        <button type="submit">Send Reset Link</button>
    </form>
    <p id="resetError" style="color: red; display: none;"></p>
    <p id="resetSuccess" style="color: green; display: none;">Password reset link sent!</p>
</div>
`;
document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const resetEmail = document.getElementById('resetEmail').value;

    const resetError = document.getElementById('resetError');
    const resetSuccess = document.getElementById('resetSuccess');

    // Clear previous messages
    resetError.style.display = 'none';
    resetSuccess.style.display = 'none';

    sendPasswordResetEmail(auth, resetEmail).then(() => {
        resetSuccess.style.display = 'block';
        document.getElementById('resetPasswordForm').reset(); // Reset the form fields
    }).catch((error) => {
        resetError.textContent = error.message;
        resetError.style.display = 'block';
    });
});
}




document.getElementById('changePassword').addEventListener('click', function() {
    loadPass('Change Password');
});

document.getElementById('logout').addEventListener('click', function() {
    signOut(auth)
    .then(() => {
      // Successfully logged out
      window.location.href = "index.html"
    })
    .catch((error) => {
      // Handle any errors during logout
      console.error("Error logging out:", error.message);
    });
});

function loadContent(section) {
    const contentArea = document.getElementById('mainContent');
    contentArea.innerHTML = `<div class="accountSection">
                                <h2>${section}</h2>
                                <p>Content for ${section} will be displayed here.</p>
                              </div>`;
}

window.onload = function() {
    loadInfo('View My Information');
};