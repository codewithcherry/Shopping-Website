

export const handleIncrementQuantityLocal = (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart || !cart.products.length) return;

    // Find and increment the quantity of the specified product
    cart.products = cart.products.map(item => {
        if (item.productId._id === productId) {
            return { ...item, quantity: item.quantity + 1 };
        }
        return item;
    });

    // Recalculate the cart totals
    updateCartTotalsLocal(cart);
    
};

export const handleDecrementQuantityLocal= (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart || !cart.products.length) return;

    // Find and decrement the quantity of the specified product
    cart.products = cart.products.map(item => {
        if (item.productId._id === productId && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
        }
        return item;
    }).filter(item => item.quantity > 0); // Remove item if quantity becomes 0

    // Recalculate the cart totals
    updateCartTotalsLocal(cart);
   
};

export const updateCartTotalsLocal = (cart) => {
    let subtotal = 0;
    let total = 0;

    cart.products.forEach(item => {
        subtotal += item.quantity * item.productId.basePrice;
        total += item.quantity * item.productId.finalPrice;
    });

    const deliveryFee = total > 199 ? 0 : 25;
    const discount = subtotal - total; // Adjust this calculation as needed

    // Update the cart object with new totals
    const updatedCart = {
        products: cart.products,
        subtotal: subtotal,
        discount: discount,
        deliveryFee: deliveryFee,
        tax: 0, // Set or calculate tax as needed
        total: total
    };

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Optionally, refresh or update the cart view on the page
   
};


export const removeCartItemLocal=(productId)=>{
    // Retrieve the current cart from localStorage
const cart = JSON.parse(localStorage.getItem('cart'));

// Check if the cart exists and has products
if (!cart || !cart.products.length) return;

// Filter out the item to be removed
const updatedProducts = cart.products.filter(item => item.productId._id !== productId);

// Recalculate the subtotal based on remaining items
let subtotal = 0;
let total = 0;

updatedProducts.forEach(item => {
    subtotal += item.quantity * item.productId.basePrice;
    total += item.quantity * item.productId.finalPrice;
});

// Calculate the new delivery fee and discount
const deliveryFee = total > 199 ? 0 : 25;
const discount = subtotal - total; // Adjust this calculation as needed

// Update the cart object
const updatedCart = {
    products: updatedProducts,
    subtotal: subtotal,
    discount: discount,
    deliveryFee: deliveryFee,
    tax: 0, // Set or calculate tax as needed
    total: total
};

// Save the updated cart back to localStorage
localStorage.setItem('cart', JSON.stringify(updatedCart));


}

