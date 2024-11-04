

export const handleIncrementQuantityLocal = (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart || !cart.products.length) return;

    // Find and increment the quantity of the specified product
    cart.products = cart.products.map(item => {
        if (item.product._id === productId) {
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
        if (item.product._id === productId && item.quantity > 1) {
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
        subtotal += item.quantity * item.product.basePrice;
        total += item.quantity * item.product.finalPrice;
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
const updatedProducts = cart.products.filter(item => item.product._id !== productId);

// Recalculate the subtotal based on remaining items
let subtotal = 0;
let total = 0;

updatedProducts.forEach(item => {
    subtotal += item.quantity * item.product.basePrice;
    total += item.quantity * item.product.finalPrice;
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

export const addProductToLocalCart = () => {
    const localCart = localStorage.getItem('cart');
    
    // Initialize the cart if it doesn't exist
    if (!localCart) {
        localStorage.setItem('cart', JSON.stringify({ products: [], subtotal: 0, discount: 0, deliveryFee: 0, tax: 0, total: 0 }));
    }

    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartProducts = cart.products;
    
    // Calculate subtotal and total
    const subtotal = cart.subtotal + quantity * item.basePrice;
    const total = cart.total + quantity * item.finalPrice;
    const delivery = total > 199 ? 0 : 25;
    
    // Assuming discount is a fixed value or percentage, adjust accordingly
    const discount = subtotal-total; // Set discount calculation as needed

    // Add the product to the cart
    cartProducts.push({ product: item, quantity: quantity, size: selectedSize });
    
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify({
        products: cartProducts,
        subtotal: subtotal,
        discount: discount,
        deliveryFee: delivery,
        tax: 0,
        total: total
    }));
    
}