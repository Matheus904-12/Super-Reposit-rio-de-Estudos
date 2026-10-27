// Wait for DOM content to load before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Cart Variables
    const cartIcon = document.querySelectorAll('#cart-icon');
    const cart = document.querySelector('.cart');
    const closeCart = document.querySelector('#cart-close');
    const cartContent = document.querySelector('.cart-content');
    const totalPrice = document.querySelector('.total-price');
    const cartItemCount = document.querySelectorAll('.cart-item-count');
    
    // Favorites Variables
    const favoritesBtn = document.querySelector('.favorites-btn');
    const savedItems = document.querySelector('.saved-items');
    const closeSavedItems = document.querySelector('#saved-items-close');
    const savedItemsContent = document.querySelector('.saved-items-content');
    const favoritesCounter = document.querySelector('.favorites-counter');
    const moveAllToCartBtn = document.querySelector('.btn-move-to-cart');
    
    // Product Modal Variables
    let productModal = null;

    // Remove loading screen when page is fully loaded
    window.addEventListener('load', function() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    });

    // Cart Open & Close
    cartIcon.forEach(icon => {
        icon.addEventListener('click', function() {
            cart.classList.add('active');
            // Close saved items if open
            savedItems.classList.remove('active');
            // Close product modal if open
            if (productModal) {
                document.body.removeChild(productModal);
                productModal = null;
            }
        });
    });

    closeCart.addEventListener('click', function() {
        cart.classList.remove('active');
    });

    // Favorites Open & Close
    favoritesBtn.addEventListener('click', function(e) {
        e.preventDefault();
        savedItems.classList.add('active');
        // Close cart if open
        cart.classList.remove('active');
        // Close product modal if open
        if (productModal) {
            document.body.removeChild(productModal);
            productModal = null;
        }
    });

    closeSavedItems.addEventListener('click', function() {
        savedItems.classList.remove('active');
    });

    // Add special event listener for mobile favorites button
    const mobileFavBtn = document.querySelector('.salvar');
    if (mobileFavBtn) {
        mobileFavBtn.addEventListener('click', function(e) {
            e.preventDefault();
            savedItems.classList.add('active');
            cart.classList.remove('active');
            if (productModal) {
                document.body.removeChild(productModal);
                productModal = null;
            }
        });
    }

    // Cart Functionality
    function updateCartTotal() {
        let total = 0;
        const cartItems = document.querySelectorAll('.cart-box');
        
        cartItems.forEach(item => {
            const priceElement = item.querySelector('.cart-price');
            const quantityElement = item.querySelector('.number');
            const price = parseFloat(priceElement.innerText.replace('R$', '').replace(',', '.'));
            const quantity = parseInt(quantityElement.innerText);
            total += price * quantity;
        });
        
        totalPrice.innerText = 'R$' + total.toFixed(2).replace('.', ',');
        
        // Update cart count
        const totalItems = Array.from(cartItems).reduce((sum, item) => {
            return sum + parseInt(item.querySelector('.number').innerText);
        }, 0);
        
        cartItemCount.forEach(counter => {
            counter.innerText = totalItems;
        });
    }

    // Handle quantity changes in cart
    cartContent.addEventListener('click', function(e) {
        if (e.target.classList.contains('increment')) {
            const quantitySpan = e.target.previousElementSibling;
            let quantity = parseInt(quantitySpan.innerText);
            quantitySpan.innerText = quantity + 1;
            updateCartTotal();
            updateCartDatabase(e.target.closest('.cart-box').dataset.id, quantity + 1);
        } else if (e.target.classList.contains('decrement')) {
            const quantitySpan = e.target.nextElementSibling;
            let quantity = parseInt(quantitySpan.innerText);
            if (quantity > 1) {
                quantitySpan.innerText = quantity - 1;
                updateCartTotal();
                updateCartDatabase(e.target.closest('.cart-box').dataset.id, quantity - 1);
            }
        } else if (e.target.classList.contains('cart-remove')) {
            const cartBox = e.target.closest('.cart-box');
            const productId = cartBox.dataset.id;
            cartBox.remove();
            updateCartTotal();
            removeFromCartDatabase(productId);
        }
    });

    // Handle saved items actions
    savedItemsContent.addEventListener('click', function(e) {
        if (e.target.classList.contains('move-to-cart')) {
            const savedItemBox = e.target.closest('.saved-item-box');
            const productId = savedItemBox.dataset.id;
            const productName = savedItemBox.querySelector('.saved-item-title').innerText;
            const productPrice = savedItemBox.querySelector('.saved-item-price').innerText;
            const productImg = savedItemBox.querySelector('.saved-item-img').src;
            
            addToCart(productId, productName, productPrice, productImg);
            removeFromFavoritesDatabase(productId);
            savedItemBox.remove();
            updateFavoritesCounter();
        } else if (e.target.classList.contains('saved-item-remove')) {
            const savedItemBox = e.target.closest('.saved-item-box');
            const productId = savedItemBox.dataset.id;
            removeFromFavoritesDatabase(productId);
            savedItemBox.remove();
            updateFavoritesCounter();
        }
    });

    // Move all favorites to cart
    moveAllToCartBtn.addEventListener('click', function() {
        const savedItemBoxes = document.querySelectorAll('.saved-item-box');
        savedItemBoxes.forEach(box => {
            const productId = box.dataset.id;
            const productName = box.querySelector('.saved-item-title').innerText;
            const productPrice = box.querySelector('.saved-item-price').innerText;
            const productImg = box.querySelector('.saved-item-img').src;
            
            addToCart(productId, productName, productPrice, productImg);
            removeFromFavoritesDatabase(productId);
        });
        
        // Clear all saved items
        savedItemsContent.innerHTML = '';
        updateFavoritesCounter();
    });

    // Update favorites counter
    function updateFavoritesCounter() {
        const savedItemBoxes = document.querySelectorAll('.saved-item-box');
        const count = savedItemBoxes.length;
        favoritesCounter.innerText = count;
        document.querySelector('.total-items-count').innerText = count;
    }

    // Add to cart function
    function addToCart(id, name, price, imgSrc, quantity = 1) {
        // Check if item already exists in cart
        const cartBoxes = document.querySelectorAll('.cart-box');
        let itemExists = false;
        
        cartBoxes.forEach(box => {
            if (box.dataset.id === id) {
                itemExists = true;
                const quantitySpan = box.querySelector('.number');
                let currentQuantity = parseInt(quantitySpan.innerText);
                quantitySpan.innerText = currentQuantity + quantity;
                updateCartDatabase(id, currentQuantity + quantity);
            }
        });
        
        if (!itemExists) {
            const cartBoxContent = `
                <img src="${imgSrc}" class="cart-img">
                <div class="cart-detail">
                    <h2 class="cart-product-title">${name}</h2>
                    <span class="cart-price">${price}</span>
                    <div class="cart-quantity">
                        <button class="decrement">-</button>
                        <span class="number">${quantity}</span>
                        <button class="increment">+</button>
                    </div>
                </div>
                <i class="ri-delete-bin-line cart-remove"></i>
            `;
            
            const cartBox = document.createElement('div');
            cartBox.classList.add('cart-box');
            cartBox.dataset.id = id;
            cartBox.innerHTML = cartBoxContent;
            
            cartContent.appendChild(cartBox);
            addToCartDatabase(id, name, price, imgSrc, quantity);
        }
        
        updateCartTotal();
        cart.classList.add('active');
    }

    // Add to favorites function
    function addToFavorites(id, name, price, imgSrc) {
        // Check if item already exists in favorites
        const savedItemBoxes = document.querySelectorAll('.saved-item-box');
        let itemExists = false;
        
        savedItemBoxes.forEach(box => {
            if (box.dataset.id === id) {
                itemExists = true;
            }
        });
        
        if (!itemExists) {
            const savedItemBoxContent = `
                <img src="${imgSrc}" class="saved-item-img">
                <div class="saved-item-detail">
                    <h2 class="saved-item-title">${name}</h2>
                    <span class="saved-item-price">${price}</span>
                </div>
                <i class="ri-shopping-cart-line move-to-cart"></i>
                <i class="ri-delete-bin-line saved-item-remove"></i>
            `;
            
            const savedItemBox = document.createElement('div');
            savedItemBox.classList.add('saved-item-box');
            savedItemBox.dataset.id = id;
            savedItemBox.innerHTML = savedItemBoxContent;
            
            savedItemsContent.appendChild(savedItemBox);
            addToFavoritesDatabase(id, name, price, imgSrc);
        }
        
        updateFavoritesCounter();
        savedItems.classList.add('active');
    }

    // Product Detail Modal
    function createProductModal(productData) {
        // Create modal container
        const modal = document.createElement('div');
        modal.classList.add('product-modal');
        
        // Get price details
        const price = parseFloat(productData.price.replace('R$', '').replace(',', '.'));
        const discountPrice = (price * 0.95).toFixed(2).replace('.', ',');
        
        // Calculate installments
        const maxInstallments = 5;
        const installmentValue = (price / maxInstallments).toFixed(2).replace('.', ',');
        
        // Create installment options
        let installmentOptions = '';
        for (let i = 1; i <= maxInstallments; i++) {
            const value = (price / i).toFixed(2).replace('.', ',');
            installmentOptions += `<option value="${i}">${i}x de R$${value} sem juros</option>`;
        }
        
        // Create modal content
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <div class="modal-grid">
                    <div class="modal-img">
                        <img src="${productData.image}" alt="${productData.name}">
                    </div>
                    <div class="modal-details">
                        <h2 class="modal-title">${productData.name}</h2>
                        <p class="modal-description">${productData.description || 'Sem descrição disponível'}</p>
                        <div class="modal-price">
                            <div class="price-container">
                                <span class="original-price">R$${productData.price.replace('R$', '')}</span>
                                <span class="discount-price">R$${discountPrice} à vista</span>
                            </div>
                            <div class="installment-container">
                                <select class="installment-select">
                                    ${installmentOptions}
                                </select>
                            </div>
                        </div>
                        <div class="modal-actions">
                            <button class="modal-add-to-cart">
                                <i class="ri-shopping-bag-line"></i> Adicionar ao Carrinho
                            </button>
                            <button class="modal-add-to-favorites">
                                <i class="ri-heart-line"></i> Adicionar aos Favoritos
                            </button>
                            <button class="modal-buy-now" onclick="location.href='checkout.php'">
                                <i class="ri-shopping-cart-line"></i> Comprar Agora
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Close modal on X click
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
                productModal = null;
            }, 300);
        });
        
        // Close modal when clicking outside content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                    productModal = null;
                }, 300);
            }
        });
        
        // Add to cart button handler
        modal.querySelector('.modal-add-to-cart').addEventListener('click', () => {
            addToCart(
                productData.id,
                productData.name,
                productData.price,
                productData.image
            );
        });
        
        // Add to favorites button handler
        modal.querySelector('.modal-add-to-favorites').addEventListener('click', () => {
            addToFavorites(
                productData.id,
                productData.name,
                productData.price,
                productData.image
            );
        });
        
        return modal;
    }

    // Shop functionality
    const productBoxes = document.querySelectorAll('.product-box');
    productBoxes.forEach(box => {
        // Show product details modal on click
        box.addEventListener('click', function(e) {
            // Don't show modal if clicking on cart or favorites icon
            if (e.target.classList.contains('add-cart') || 
                e.target.classList.contains('save-item')) {
                return;
            }
            
            const productData = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: this.dataset.price,
                image: this.dataset.image,
                description: this.dataset.description
            };
            
            // Close any open modals
            if (productModal) {
                document.body.removeChild(productModal);
            }
            
            // Create and show new product modal
            productModal = createProductModal(productData);
        });
        
        // Add to cart click handler
        const addCartBtn = box.querySelector('.add-cart');
        addCartBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const productBox = e.target.closest('.product-box');
            const productId = productBox.dataset.id;
            const productName = productBox.dataset.name;
            const productPrice = productBox.dataset.price;
            const productImage = productBox.dataset.image;
            
            addToCart(productId, productName, productPrice, productImage);
        });
        
        // Add to favorites click handler
        const saveItemBtn = box.querySelector('.save-item');
        saveItemBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const productBox = e.target.closest('.product-box');
            const productId = productBox.dataset.id;
            const productName = productBox.dataset.name;
            const productPrice = productBox.dataset.price;
            const productImage = productBox.dataset.image;
            
            // Toggle heart icon
            this.classList.toggle('ri-heart-line');
            this.classList.toggle('ri-heart-fill');
            
            if (this.classList.contains('ri-heart-fill')) {
                addToFavorites(productId, productName, productPrice, productImage);
            } else {
                // Remove from favorites
                const savedItemBoxes = document.querySelectorAll('.saved-item-box');
                savedItemBoxes.forEach(box => {
                    if (box.dataset.id === productId) {
                        removeFromFavoritesDatabase(productId);
                        box.remove();
                        updateFavoritesCounter();
                    }
                });
            }
        });
    });

    // Database functions (using AJAX to communicate with PHP backend)
    function updateCartDatabase(productId, quantity) {
        if (!isUserLoggedIn) {
            // Update session storage for non-logged-in users
            return;
        }
        
        fetch('api/compras/update_cart_quantity.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `product_id=${productId}&quantity=${quantity}&action=update`
        })
        .catch(error => console.error('Error updating cart:', error));
    }

    function addToCartDatabase(productId, name, price, imgSrc, quantity) {
        if (!isUserLoggedIn) {
            // Update session storage for non-logged-in users
            return;
        }
        
        fetch('api/compras/update_cart_quantity.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `product_id=${productId}&quantity=${quantity}&action=add`
        })
        .catch(error => console.error('Error adding to cart:', error));
    }

    function removeFromCartDatabase(productId) {
        if (!isUserLoggedIn) {
            // Update session storage for non-logged-in users
            return;
        }
        
        fetch('api/compras/update_cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `product_id=${productId}&action=remove`
        })
        .catch(error => console.error('Error removing from cart:', error));
    }

    function addToFavoritesDatabase(productId, name, price, imgSrc) {
        if (!isUserLoggedIn) {
            // Update session storage for non-logged-in users
            return;
        }
        
        fetch('api/compras/update_favorites.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `product_id=${productId}&action=add`
        })
        .catch(error => console.error('Error adding to favorites:', error));
    }

    function removeFromFavoritesDatabase(productId) {
        if (!isUserLoggedIn) {
            // Update session storage for non-logged-in users
            return;
        }
        
        fetch('api/compras/update_favorites.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `product_id=${productId}&action=remove`
        })
        .catch(error => console.error('Error removing from favorites:', error));
    }

    // Initialize cart total on page load
    updateCartTotal();
});