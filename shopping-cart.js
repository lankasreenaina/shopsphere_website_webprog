// Shopping Cart JavaScript

// Initialize cart as an empty array in localStorage if it doesn't exist
if (!localStorage.getItem('cart')) {
  localStorage.setItem('cart', JSON.stringify([]));
}

// Cart functionality
const ShoppingCart = {
  // Get cart from localStorage
  getCart: function() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  },
  
  // Save cart to localStorage
  saveCart: function(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  },
  
  // Add item to cart
  addToCart: function(product) {
    const cart = this.getCart();
    
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex > -1) {
      // Increment quantity if product exists
      cart[existingProductIndex].quantity += 1;
    } else {
      // Add new product with quantity 1
      product.quantity = 1;
      cart.push(product);
    }
    
    this.saveCart(cart);
    this.updateCartDisplay();
  },
  
  // Remove item from cart
  removeFromCart: function(productId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== productId);
    this.saveCart(cart);
    this.updateCartDisplay();
  },
  
  // Increase quantity
  increaseQuantity: function(productId) {
    const cart = this.getCart();
    const product = cart.find(item => item.id === productId);
    
    if (product) {
      product.quantity += 1;
      this.saveCart(cart);
      this.updateCartDisplay();
    }
  },
  
  // Decrease quantity
  decreaseQuantity: function(productId) {
    const cart = this.getCart();
    const productIndex = cart.findIndex(item => item.id === productId);
    
    if (productIndex > -1) {
      if (cart[productIndex].quantity > 1) {
        cart[productIndex].quantity -= 1;
      } else {
        // Remove product if quantity becomes 0
        cart.splice(productIndex, 1);
      }
      
      this.saveCart(cart);
      this.updateCartDisplay();
    }
  },
  
  // Clear entire cart
  clearCart: function() {
    localStorage.setItem('cart', JSON.stringify([]));
    this.updateCartDisplay();
  },
  
  // Calculate total price
  calculateTotal: function() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  },
  
  // Count total items in cart
  countItems: function() {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  },
  
  // Update cart display
  updateCartDisplay: function() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    const cartContainer = document.getElementById('cart-container');
    
    if (!cartItemsElement) return;
    
    const cart = this.getCart();
    
    // Clear current cart display
    cartItemsElement.innerHTML = '';
    
    // Check if cart is empty
    if (cart.length === 0) {
      cartItemsElement.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
      cartContainer.classList.remove('has-items');
    } else {
      cartContainer.classList.add('has-items');
      
      // Add each item to cart display
      cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <div class="cart-item-price">Rs.${(item.price * item.quantity).toFixed(2)}</div>
            <div class="cart-item-quantity">
              <button class="quantity-btn decrease" data-id="${item.id}">-</button>
              <span>${item.quantity}</span>
              <button class="quantity-btn increase" data-id="${item.id}">+</button>
            </div>
          </div>
          <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        cartItemsElement.appendChild(cartItemElement);
      });
    }
    
    // Update totals
    if (cartTotalElement) {
      cartTotalElement.textContent = `$${this.calculateTotal()}`;
    }
    
    if (cartCountElement) {
      const itemCount = this.countItems();
      cartCountElement.textContent = itemCount;
      cartCountElement.style.display = itemCount > 0 ? 'flex' : 'none';
    }
    
    // Add event listeners to buttons
    this.addCartEventListeners();
  },
  
  // Add event listeners to cart buttons
  addCartEventListeners: function() {
    // Remove item buttons
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = e.target.getAttribute('data-id');
        this.removeFromCart(productId);
      });
    });
    
    // Increase quantity buttons
    const increaseButtons = document.querySelectorAll('.quantity-btn.increase');
    increaseButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = e.target.getAttribute('data-id');
        this.increaseQuantity(productId);
      });
    });
    
    // Decrease quantity buttons
    const decreaseButtons = document.querySelectorAll('.quantity-btn.decrease');
    decreaseButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = e.target.getAttribute('data-id');
        this.decreaseQuantity(productId);
      });
    });
    
    // Clear cart button
    const clearCartButton = document.getElementById('clear-cart');
    if (clearCartButton) {
      clearCartButton.addEventListener('click', () => {
        this.clearCart();
      });
    }
  },
  
  // Initialize cart
  init: function() {
    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-cart-btn');
    
    addToCartButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const productElement = e.target.closest('.showcase-container');
        
        if (productElement) {
          const product = {
            id: productElement.getAttribute('data-product-id'),
            name: productElement.querySelector('.showcase-title').textContent,
            price: parseFloat(productElement.getAttribute('data-price')),
            image: productElement.querySelector('.showcase-banner').src
          };
          
          this.addToCart(product);
          
          // Show cart sidebar
          document.getElementById('cart-sidebar').classList.add('open');
        }
      });
    });
    
    // Toggle cart sidebar
    const cartToggleButton = document.getElementById('cart-toggle');
    const cartSidebar = document.getElementById('cart-sidebar');
    
    if (cartToggleButton && cartSidebar) {
      cartToggleButton.addEventListener('click', () => {
        cartSidebar.classList.toggle('open');
      });
    }
    
    // Close cart when clicking outside
    const closeCartButton = document.getElementById('close-cart');
    if (closeCartButton) {
      closeCartButton.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
      });
    }
    
    // Initialize cart display
    this.updateCartDisplay();
  }
};

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  ShoppingCart.init();
});
