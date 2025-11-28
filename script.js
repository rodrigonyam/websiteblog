// Sample product data
const products = [
    // Electronics
    {
        id: 1,
        name: "Wireless Headphones",
        price: 79.99,
        category: "electronics",
        description: "Premium sound quality with noise cancellation",
        emoji: "🎧"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        category: "electronics",
        description: "Track your fitness and get notifications",
        emoji: "⌚"
    },
    {
        id: 3,
        name: "USB-C Cable",
        price: 12.99,
        category: "electronics",
        description: "Fast charging and data transfer",
        emoji: "🔌"
    },
    {
        id: 4,
        name: "Portable Charger",
        price: 34.99,
        category: "electronics",
        description: "20000mAh battery capacity",
        emoji: "🔋"
    },

    // Clothing
    {
        id: 5,
        name: "Cotton T-Shirt",
        price: 24.99,
        category: "clothing",
        description: "Comfortable 100% cotton shirt",
        emoji: "👕"
    },
    {
        id: 6,
        name: "Denim Jeans",
        price: 59.99,
        category: "clothing",
        description: "Classic style with perfect fit",
        emoji: "👖"
    },
    {
        id: 7,
        name: "Casual Sneakers",
        price: 89.99,
        category: "clothing",
        description: "Comfortable shoes for everyday wear",
        emoji: "👟"
    },
    {
        id: 8,
        name: "Winter Jacket",
        price: 129.99,
        category: "clothing",
        description: "Warm and stylish winter coat",
        emoji: "🧥"
    },

    // Home & Garden
    {
        id: 9,
        name: "Table Lamp",
        price: 39.99,
        category: "home",
        description: "Adjustable LED lamp for your desk",
        emoji: "💡"
    },
    {
        id: 10,
        name: "Throw Pillow",
        price: 29.99,
        category: "home",
        description: "Soft and decorative pillow",
        emoji: "🛋️"
    },
    {
        id: 11,
        name: "Coffee Maker",
        price: 49.99,
        category: "home",
        description: "Brew your perfect morning coffee",
        emoji: "☕"
    },
    {
        id: 12,
        name: "Plant Pot",
        price: 19.99,
        category: "home",
        description: "Ceramic pot with drainage",
        emoji: "🌱"
    },

    // Beauty
    {
        id: 13,
        name: "Face Moisturizer",
        price: 34.99,
        category: "beauty",
        description: "Hydrating daily moisturizer",
        emoji: "🧴"
    },
    {
        id: 14,
        name: "Lipstick Set",
        price: 29.99,
        category: "beauty",
        description: "5 essential colors collection",
        emoji: "💄"
    },
    {
        id: 15,
        name: "Hair Brush",
        price: 14.99,
        category: "beauty",
        description: "Detangling hair brush",
        emoji: "💇"
    },
    {
        id: 16,
        name: "Facial Serum",
        price: 44.99,
        category: "beauty",
        description: "Anti-aging vitamin C serum",
        emoji: "✨"
    },

    // Sports
    {
        id: 17,
        name: "Yoga Mat",
        price: 34.99,
        category: "sports",
        description: "Non-slip exercise mat",
        emoji: "🧘"
    },
    {
        id: 18,
        name: "Dumbbells Set",
        price: 79.99,
        category: "sports",
        description: "Adjustable weights 5-25 lbs",
        emoji: "🏋️"
    },
    {
        id: 19,
        name: "Running Shoes",
        price: 99.99,
        category: "sports",
        description: "Professional running sneakers",
        emoji: "👟"
    },
    {
        id: 20,
        name: "Water Bottle",
        price: 24.99,
        category: "sports",
        description: "Insulated 32oz bottle",
        emoji: "💧"
    }
];

// Cart array
let cart = [];

// Current filter
let currentFilter = 'all';

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts(products);
});

// Load products to grid
function loadProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No products found</p>';
        return;
    }

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Filter products by category
function filterProducts(category) {
    currentFilter = category;
    if (category === 'all') {
        loadProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        loadProducts(filtered);
    }
}

// Search products
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
    );
    loadProducts(filtered);
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');

    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        document.getElementById('subtotal').textContent = '$0.00';
        document.getElementById('tax').textContent = '$0.00';
        document.getElementById('total').textContent = '$0.00';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-qty">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <span style="font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    calculateTotals();
}

// Calculate totals
function calculateTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('tax').textContent = '$' + tax.toFixed(2);
    document.getElementById('total').textContent = '$' + total.toFixed(2);
}

// Toggle cart modal
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

// Close cart when clicking outside
window.onclick = function(event) {
    const cartModal = document.getElementById('cartModal');
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    alert(`Order Summary:\n\nItems: ${cart.reduce((sum, item) => sum + item.quantity, 0)}\nSubtotal: $${subtotal.toFixed(2)}\nTax: $${tax.toFixed(2)}\nTotal: $${total.toFixed(2)}\n\nThank you for your purchase!\n(This is a demo store)`);

    cart = [];
    updateCartUI();
    toggleCart();
    showNotification('Order placed successfully!');
}

// Submit contact form
function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.elements[0].value;
    const email = form.elements[1].value;
    const message = form.elements[2].value;

    alert(`Thank you for your message, ${name}!\n\nWe will get back to you at ${email} soon.`);
    form.reset();
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4ECDC4;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 999;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
