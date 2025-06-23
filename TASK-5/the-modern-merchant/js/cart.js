// js/cart.js

// Get cart from localStorage or initialize an empty array
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add an item to the cart
function addToCart(productId, productInfo) {
    const cart = getCart();
    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        // If it exists, just increase the quantity
        existingItem.quantity += 1;
    } else {
        // If it's a new item, add it to the cart with quantity 1
        cart.push({ ...productInfo, id: productId, quantity: 1 });
    }
    
    saveCart(cart);
    updateCartCount(); // This function will be in ui.js to update the number in the header
}

// Note: We'll add remove/update functions later for the cart page.