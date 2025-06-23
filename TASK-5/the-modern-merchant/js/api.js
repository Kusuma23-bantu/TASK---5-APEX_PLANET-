// js/api.js

async function fetchProducts() {
    const url = 'https://fakestoreapi.com/products';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch products:", error);
        // In a real app, you might show an error message to the user
        return []; // Return empty array on error to prevent site crash
    }
}