// js/ui.js

function displayProducts(products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ''; // Clear skeleton loaders

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        // IMPORTANT: We will add lazy loading in the optimization step
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
        `;
        grid.appendChild(card);
    });
}

function updateCartCount() {
    const cart = getCart(); // From cart.js
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-item-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}
