let cart = [];


// add to cart
function addToCart(name, price) {

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    displayCart();

    updateButton(name, price);
}


//display cart

function displayCart() {

    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    let cartCount = document.getElementById("cart-count");

    if (!cartItems || !cartTotal || !cartCount) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;


    cart.forEach(function(item) {

        total += item.price * item.quantity;

        count += item.quantity;


        cartItems.innerHTML += `
    <div class="cart-item">

        <div class="cart-item-name">
            ${item.name}
        </div>

        <div class="cart-quantity">

            <button onclick="decreaseQuantity('${item.name}', ${item.price})">
                −
            </button>

            <span>${item.quantity}</span>

            <button onclick="increaseQuantity('${item.name}', ${item.price})">
                +
            </button>

        </div>

        <div class="cart-item-price">
            ₹${item.price * item.quantity}
        </div>

    </div>
`;


    });


    cartTotal.innerText = total;

    cartCount.innerText = count;
}


// increase quantity

function increaseQuantity(name, price) {

    let item = cart.find(item => item.name === name);

    if (item) {

        item.quantity++;

    }

    displayCart();

    updateButton(name, price);
}


//decrease quantity

function decreaseQuantity(name, price) {

    let item = cart.find(item => item.name === name);

    if (item) {

        item.quantity--;

        if (item.quantity <= 0) {

            cart = cart.filter(item => item.name !== name);

        }

    }

    displayCart();

    updateButton(name, price);
}


// change button

function updateButton(name, price) {

    let id = "button-" +
        name.toLowerCase().replace(/\s+/g, "-");


    let buttonArea = document.getElementById(id);

    if (!buttonArea) {

        console.log("Button not found:", id);

        return;
    }


    let item = cart.find(item => item.name === name);


    if (item) {

        buttonArea.innerHTML = `

            <button onclick="decreaseQuantity('${name}', ${price})">
                −
            </button>

            <span>${item.quantity}</span>

            <button onclick="increaseQuantity('${name}', ${price})">
                +
            </button>

        `;

    } else {

        buttonArea.innerHTML = `

            <button onclick="addToCart('${name}', ${price})">
                Add to Cart
            </button>

        `;

    }
}


// open / close cart

function toggleCart() {

    let cartPanel = document.getElementById("cart-panel");

    if (!cartPanel) {
        return;
    }

    cartPanel.classList.toggle("active");
}


// clear cart

function clearCart() {

    cart = [];

    displayCart();

    location.reload();
}


// initial display

displayCart();

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    document.getElementById("checkout-panel").classList.add("active");

}


function closeCheckout() {

    document.getElementById("checkout-panel").classList.remove("active");

}


function placeOrder() {

    let name = document.getElementById("customer-name").value.trim();

    let phone = document.getElementById("customer-phone").value.trim();

    let orderType = document.getElementById("order-type").value;


    if (name === "" || phone === "") {

        alert("Please enter your name and phone number.");

        return;
    }


    let orderDetails = document.getElementById("order-details");

    let itemsHTML = "";

    let total = 0;


    cart.forEach(function(item) {

        let itemTotal = item.price * item.quantity;

        total += itemTotal;


        itemsHTML += `
            <div class="confirmation-item">

                <span>
                    ${item.name} × ${item.quantity}
                </span>

                <span>
                    ₹${itemTotal}
                </span>

            </div>
        `;

    });


    orderDetails.innerHTML = `

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Phone:</strong> ${phone}</p>

        <p><strong>Order Type:</strong> ${orderType}</p>

        <hr>

        ${itemsHTML}

        <div class="confirmation-total">
            Total: ₹${total}
        </div>

    `;


    // Close checkout
    document.getElementById("checkout-panel")
        .classList.remove("active");


    // Show confirmation
    document.getElementById("order-confirmation")
        .classList.add("active");


    // Clear cart
    cart = [];

    displayCart();

}

function closeConfirmation() {

    document.getElementById("order-confirmation")
        .classList.remove("active");

    location.reload();

}

// sidebar

function toggleSidebar() {

    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");

    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");

}