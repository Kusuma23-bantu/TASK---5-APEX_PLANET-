// js/cart-page.js

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); // Update header count
    displayCartItems(); // Display items in the cart

    // Use event delegation for remove and quantity change actions
    const cartContainer = document.getElementById('cart-container');
    cartContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart-btn')) {
            const productId = parseInt(event.target.dataset.productId);
            removeFromCart(productId);
        }
    });
    
    cartContainer.addEventListener('change', (event) => {
        if (event.target.classList.contains('item-quantity-input')) {
            const productId = parseInt(event.target.dataset.productId);
            const newQuantity = parseInt(event.target.value);
            updateQuantity(productId, newQuantity);
        }
    });
});

function displayCartItems() {
    const cart = getCart(); // from cart.js
    const container = document.getElementById('cart-container');
    const totalDiv = document.getElementById('cart-total');
    container.innerHTML = ''; // Clear current content

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
        totalDiv.innerHTML = '';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <label for="quantity-${item.id}">Qty:</label>
                <input type="number" id="quantity-${item.id}" class="item-quantity-input" data-product-id="${item.id}" value="${item.quantity}" min="1">
                <button class="remove-from-cart-btn" data-product-id="${item.id}">Remove</button>
            </div>
        `;
        container.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
}

// Add these new functions to our cart logic
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartCount();
    displayCartItems(); // Re-render the cart
}

function updateQuantity(productId, quantity) {
    if (quantity < 1) {
        removeFromCart(productId);
        return;
    }
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity = quantity;
    }
    saveCart(cart);
    updateCartCount();
    displayCartItems(); // Re-render the cart
}