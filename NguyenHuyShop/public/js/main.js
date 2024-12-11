document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('product-list')) {
        fetchProducts();
    }
    if (document.getElementById('cart-items')) {
        displayCartItems();
    }
    if (document.getElementById('login-form')) {
        setupLoginForm();
    }
    if (document.getElementById('register-form')) {
        setupRegisterForm();
    }
    if (document.getElementById('add-product-form')) {
        setupAddProductForm();
    }
});

// Fetch and display products
function fetchProducts() {
    fetch('/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; // Clear existing products
            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.className = 'product-item';
                productItem.innerHTML = `
                    <h3>${product.Name}</h3>
                    <p>${product.Description}</p>
                    <p>Price: $${product.Price}</p>
                    <button onclick="addToCart('${product.ProductID}')">Add to Cart</button>
                    <button onclick="viewProductDetail('${product.ProductID}')">View Details</button>
                `;
                productList.appendChild(productItem);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Add product to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(product => product.productId === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ productId, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart');
}

// Display cart items
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <p>Product ID: ${item.productId}</p>
            <p>Quantity: ${item.quantity}</p>
        `;
        cartContainer.appendChild(cartItem);
    });
}

// Setup login form
function setupLoginForm() {
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Login successful');
                window.location.href = 'index.html';
            } else {
                alert('Login failed');
            }
        })
        .catch(error => console.error('Error:', error));
    });
}

// Setup register form
function setupRegisterForm() {
    document.getElementById('register-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;

        fetch('/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registration successful');
                window.location.href = 'login.html';
            } else {
                alert('Registration failed');
            }
        })
        .catch(error => console.error('Error:', error));
    });
}

// Setup add product form
function setupAddProductForm() {
    document.getElementById('add-product-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;
        const imageUrl = document.getElementById('imageUrl').value;
        const categoryId = document.getElementById('category').value;

        fetch('/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, description, imageUrl, categoryId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Product added successfully');
                window.location.href = 'product.html';
            } else {
                alert('Failed to add product');
            }
        })
        .catch(error => console.error('Error:', error));
    });
}

// View product detail
function viewProductDetail(productId) {
    window.location.href = `product_detail.html?id=${productId}`;
}
