// js/main.js

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Update the cart count in the header as soon as the page loads
    updateCartCount();

    // 2. Fetch products from the API and display them
    const products = await fetchProducts();
    displayProducts(products);

    // 3. Use Event Delegation for "Add to Cart" buttons
    // This is more efficient than adding an event listener to every button
    const productGrid = document.getElementById('product-grid');
    productGrid.addEventListener('click', (event) => {
        // Check if the clicked element is an "Add to Cart" button
        if (event.target.classList.contains('add-to-cart-btn')) {
            // Get the product ID from the data attribute
            const productId = parseInt(event.target.dataset.productId);
            
            // Find the full product details from our fetched products array
            const product = products.find(p => p.id === productId);

            if (product) {
                // Add the product to the cart
                addToCart(productId, { title: product.title, price: product.price, image: product.image });
                console.log(`Added ${product.title} to cart.`);
                
                // Optional: Show a quick confirmation message
                event.target.textContent = 'Added!';
                setTimeout(() => {
                    event.target.textContent = 'Add to Cart';
                }, 1000);
            }
        }
    });
});