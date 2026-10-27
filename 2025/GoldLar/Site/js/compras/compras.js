/**
 * compras.js
 */

// Global variables
let cart_data = [];
let favorites_data = [];
let userId = null;
let isUserLoggedIn = false;

document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const cartIcon = document.getElementById('cart-icon');
    const cart = document.querySelector('.cart');
    const cartClose = document.getElementById('cart-close');
    const savedItemsIcon = document.querySelector('.salvar');
    const savedItems = document.querySelector('.saved-items');
    const savedItemsClose = document.getElementById('saved-items-close');
    const cartContent = document.querySelector('.cart-content');
    const savedItemsContent = document.querySelector('.saved-items-content');
    const totalPrice = document.querySelector('.total-price');
    const cartItemCount = document.querySelectorAll('.cart-item-count');
    const savedItemsCount = document.querySelector('.total-items-count');
    const moveAllToCartBtn = document.querySelector('.btn-move-to-cart');
    const checkoutBtn = document.querySelector('.btn-buy');

    // Check login status when page loads
    checkLoginStatus().then(status => {
        console.log('Login status verificado:', status);
        if (status) {
            loadCartItems();
            loadFavoriteItems();
        }
    });

    // Event listeners for cart and saved items UI
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            cart.classList.add('active');
        });
    }

    if (cartClose) {
        cartClose.addEventListener('click', () => {
            cart.classList.remove('active');
        });
    }

    if (savedItemsIcon) {
        savedItemsIcon.addEventListener('click', () => {
            savedItems.classList.add('active');
        });
    }

    if (savedItemsClose) {
        savedItemsClose.addEventListener('click', () => {
            savedItems.classList.remove('active');
        });
    }

    if (moveAllToCartBtn) {
        moveAllToCartBtn.addEventListener('click', moveAllToCart);
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }

    // Set up event delegation for product page buttons
    document.addEventListener('click', function (e) {
        // Add to cart buttons
        if (e.target.classList.contains('add-cart')) {
            const productBox = e.target.closest('.product-box');
            if (productBox) {
                const productId = productBox.dataset.id;
                addToCart(productId);
            }
        }

        // Add to favorites buttons
        if (e.target.classList.contains('save-item')) {
            const productBox = e.target.closest('.product-box');
            if (productBox) {
                const productId = productBox.dataset.id;
                addToFavorites(productId);
            }
        }

        // Cart quantity buttons
        if (e.target.classList.contains('increment')) {
            const cartBox = e.target.closest('.cart-box');
            if (cartBox) {
                const productId = cartBox.dataset.id;
                const quantitySpan = cartBox.querySelector('.number');
                const currentQuantity = parseInt(quantitySpan.textContent);

                updateCartItemQuantity(productId, currentQuantity + 1);
            }
        }

        if (e.target.classList.contains('decrement')) {
            const cartBox = e.target.closest('.cart-box');
            if (cartBox) {
                const productId = cartBox.dataset.id;
                const quantitySpan = cartBox.querySelector('.number');
                const currentQuantity = parseInt(quantitySpan.textContent);

                // Modificado: Manter pelo menos 1 item no carrinho
                if (currentQuantity > 1) {
                    updateCartItemQuantity(productId, currentQuantity - 1);
                } else {
                    // Não fazer nada quando a quantidade já é 1
                    // A remoção só deve ocorrer pelo botão de remover
                    showToast('Quantidade mínima atingida');
                }
            }
        }

        // Remove from cart button
        if (e.target.classList.contains('cart-remove')) {
            const cartBox = e.target.closest('.cart-box');
            if (cartBox) {
                const productId = cartBox.dataset.id;
                removeCartItem(productId);
            }
        }

        // Move to cart from favorites
        if (e.target.classList.contains('move-to-cart')) {
            const savedBox = e.target.closest('.saved-box');
            if (savedBox) {
                const productId = savedBox.dataset.id;
                moveToCart(productId);
            }
        }

        // Remove from favorites
        if (e.target.classList.contains('saved-remove')) {
            const savedBox = e.target.closest('.saved-box');
            if (savedBox) {
                const productId = savedBox.dataset.id;
                removeFavoriteItem(productId);
            }
        }
    });

    // Check login status
    async function checkLoginStatus() {
        try {
            console.log('Verificando status de login...');
            const response = await fetch('api/compras/cart_operations.php?action=check_login', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao verificar status de login');
            }

            const data = await response.json();
            console.log('Resposta do status de login:', data);

            // Update global variables
            isUserLoggedIn = data.data && data.data.isLoggedIn === true;
            userId = data.data && data.data.isLoggedIn ? data.data.userId : null;

            console.log('Status de login atualizado:', { isUserLoggedIn, userId });

            // Atualiza UI com base no status de login
            updateUIForLoginStatus();

            return isUserLoggedIn;
        } catch (error) {
            console.error('Erro ao verificar status de login:', error);
            isUserLoggedIn = false;
            userId = null;
            updateUIForLoginStatus();
            return false;
        }
    }
    

    // Atualiza a UI com base no status de login
    function updateUIForLoginStatus() {
        const loginElements = document.querySelectorAll('.login-required');
        const guestElements = document.querySelectorAll('.guest-only');

        if (isUserLoggedIn) {
            loginElements.forEach(el => el.style.display = 'block');
            guestElements.forEach(el => el.style.display = 'none');
        } else {
            loginElements.forEach(el => el.style.display = 'none');
            guestElements.forEach(el => el.style.display = 'block');
        }
    }

    // Show login modal
    function showLoginModal(context) {
        const modalOverlay = document.createElement('div');
        modalOverlay.classList.add('login-modal-overlay');

        const modal = document.createElement('div');
        modal.classList.add('login-modal');

        const contextMessages = {
            'carrinho': 'adicionar produtos ao seu carrinho',
            'favoritos': 'salvar produtos nos favoritos',
            'checkout': 'finalizar sua compra'
        };

        modal.innerHTML = `
            <div class="login-modal-content">
                <h2>Faça Login</h2>
                <p>Você precisa estar logado para ${contextMessages[context] || 'continuar'}.</p>
                <div class="login-modal-actions">
                    <button class="btn-login-now">Fazer Login</button>
                    <button class="btn-cancel">Cancelar</button>
                </div>
            </div>
        `;

        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);

        const loginBtn = modal.querySelector('.btn-login-now');
        const cancelBtn = modal.querySelector('.btn-cancel');

        loginBtn.addEventListener('click', () => {
            window.location.href = './login_site.php';
        });

        cancelBtn.addEventListener('click', () => {
            document.body.removeChild(modalOverlay);
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
            }
        });
    }

    // Show toast notification
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.classList.add('toast', `toast-${type}`);
        toast.textContent = message;

        document.body.appendChild(toast);

        // Remove qualquer toast existente antes de adicionar o novo
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(t => {
            if (t !== toast) {
                t.remove();
            }
        });

        setTimeout(() => {
            toast.classList.add('toast-visible');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('toast-visible');
            toast.classList.add('toast-exit');
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // Load cart items
    async function loadCartItems() {
        if (!isUserLoggedIn) {
            console.log('Usuário não está logado, não carregando carrinho');
            return;
        }

        try {
            console.log("Solicitando itens do carrinho para o usuário:", userId);
            const formData = new FormData();
            formData.append('action', 'get_cart');

            const response = await fetch('api/compras/cart_operations.php', {
                method: 'POST',
                body: formData,
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });

            if (!response.ok) {
                throw new Error('Erro na resposta do servidor: ' + response.status);
            }

            const data = await response.json();
            console.log("Resposta dos itens do carrinho:", data);

            if (data.status === 'success') {
                cart_data = data.data.items || [];
                updateCartUI();
            } else {
                console.error('Erro ao carregar itens do carrinho:', data.message);
                showToast('Erro ao carregar o carrinho: ' + data.message, 'error');
            }
        } catch (error) {
            console.error('Erro ao carregar itens do carrinho:', error);
            showToast('Erro ao conectar com o servidor: ' + error.message, 'error');
        }
    }

    // Proceed to checkout
    async function proceedToCheckout() {
        // Check login status first
        if (!isUserLoggedIn) {
            showLoginModal('checkout');
            return;
        }

        // Check if cart is empty
        if (cart_data.length === 0) {
            showToast('Seu carrinho está vazio', 'error');
            return;
        }

        // Redirect to checkout page
        window.location.href = './checkout.php';
    }

    // Load favorite items
    async function loadFavoriteItems() {
        if (!isUserLoggedIn) {
            console.log('Usuário não está logado, não carregando favoritos');
            return;
        }

        try {
            console.log("Solicitando itens favoritos para o usuário:", userId);
            const formData = new FormData();
            formData.append('action', 'get_favorites');

            const response = await fetch('api/compras/cart_operations.php', {
                method: 'POST',
                body: formData,
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });

            if (!response.ok) {
                throw new Error('Erro na resposta do servidor: ' + response.status);
            }

            const data = await response.json();
            console.log("Resposta dos itens favoritos:", data);

            if (data.status === 'success') {
                favorites_data = data.data.items || [];
                updateFavoritesUI();
                updateHeartIcons(); // Adicionar esta linha
            } else {
                console.error('Erro ao carregar favoritos:', data.message);
                showToast('Erro ao carregar favoritos: ' + data.message, 'error');
            }
        } catch (error) {
            console.error('Erro ao carregar favoritos:', error);
            showToast('Erro ao conectar com o servidor: ' + error.message, 'error');
        }
    }

    // Adicionar este evento para os botões de coração
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('save-item')) {
            const productBox = e.target.closest('.product-box');
            if (productBox) {
                const productId = productBox.dataset.id;

                // Verificar se já está nos favoritos
                const isInFavorites = favorites_data.some(item => item.id === productId);

                if (isInFavorites) {
                    // Se já estiver nos favoritos, remova
                    removeFavoriteItem(productId);
                    e.target.classList.remove('ri-heart-fill');
                    e.target.classList.add('ri-heart-line');
                    e.target.style.color = '';
                } else {
                    // Se não estiver nos favoritos, adicione
                    addToFavorites(productId);
                    e.target.classList.remove('ri-heart-line');
                    e.target.classList.add('ri-heart-fill');
                    e.target.style.color = '#ff4757';
                }
            }
        }
    });

    // Update cart UI
    function updateCartUI() {
        if (!cartContent) return;

        cartContent.innerHTML = '';
        let total = 0;

        if (cart_data.length === 0) {
            cartContent.innerHTML = '<div class="empty-cart">Seu carrinho está vazio</div>';
            if (totalPrice) totalPrice.innerText = 'R$ 0.00';
            cartItemCount.forEach(el => { if (el) el.innerText = '0'; });
            return;
        }

        cart_data.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-box');
            cartItem.dataset.id = item.id;

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-img">
                <div class="detail-box">
                    <div class="cart-product-title">${item.name}</div>
                    <div class="cart-price">R$ ${parseFloat(item.price).toFixed(2)}</div>
                    <div class="cart-quantity">
                        <button class="decrement">-</button>
                        <span class="number">${item.quantity}</span>
                        <button class="increment">+</button>
                    </div>
                </div>
                <i class="ri-delete-bin-line cart-remove"></i>
            `;

            cartContent.appendChild(cartItem);
            total += parseFloat(item.price) * parseInt(item.quantity);
        });

        if (totalPrice) {
            totalPrice.innerText = `R$ ${total.toFixed(2)}`;
        }

        const itemCount = cart_data.reduce((acc, item) => acc + parseInt(item.quantity), 0);
        cartItemCount.forEach(el => {
            if (el) el.innerText = itemCount;
        });
    }

    // Update favorites UI
    function updateFavoritesUI() {
        if (!savedItemsContent) return;

        savedItemsContent.innerHTML = '';

        if (favorites_data.length === 0) {
            savedItemsContent.innerHTML = '<div class="empty-saved">Você não tem produtos salvos</div>';
            if (savedItemsCount) savedItemsCount.innerText = '0';
            if (moveAllToCartBtn) moveAllToCartBtn.style.display = 'none';
            return;
        }

        favorites_data.forEach(item => {
            const savedItem = document.createElement('div');
            savedItem.classList.add('saved-box');
            savedItem.dataset.id = item.id;

            savedItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="saved-item-img">
                <div class="detail-box">
                    <div class="saved-item-title">${item.name}</div>
                    <div class="saved-item-price">R$ ${parseFloat(item.price).toFixed(2)}</div>
                </div>
                <i class="ri-shopping-cart-line move-to-cart"></i>
                <i class="ri-delete-bin-line saved-remove"></i>
            `;

            savedItemsContent.appendChild(savedItem);
        });

        if (savedItemsCount) {
            savedItemsCount.innerText = favorites_data.length;
        }

        if (moveAllToCartBtn) {
            moveAllToCartBtn.style.display = favorites_data.length > 0 ? 'flex' : 'none';
        }
    }

    // Add to cart
    async function addToCart(productId) {
        try {
            // Check login status
            if (!isUserLoggedIn) {
                showLoginModal('carrinho');
                return;
            }

            console.log("Adicionando produto ao carrinho:", productId);
            const formData = new FormData();
            formData.append('action', 'add_to_cart');
            formData.append('product_id', productId);
            formData.append('quantity', 1);

            const response = await fetch('api/compras/cart_operations.php', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Erro na resposta do servidor: ' + response.status);
            }

            const data = await response.json();
            console.log("Resposta ao adicionar ao carrinho:", data);

            if (data.status === 'success') {
                showToast('Produto adicionado ao carrinho!');
                loadCartItems(); // Recarrega os itens
            } else {
                showToast(data.message || 'Erro ao adicionar produto', 'error');
            }
        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
            showToast('Erro ao adicionar produto: ' + error.message, 'error');
        }
    }

    // Make addToCart global
    window.addToCart = addToCart;

    // Add to favorites
    async function addToFavorites(productId) {
        try {
            // Check login status
            if (!isUserLoggedIn) {
                showLoginModal('favoritos');
                return;
            }

            console.log("Adicionando produto aos favoritos:", productId);
            const formData = new FormData();
            formData.append('action', 'add_to_favorites');
            formData.append('product_id', productId);

            const response = await fetch('api/compras/cart_operations.php', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Erro na resposta do servidor: ' + response.status);
            }

            const data = await response.json();
            console.log("Resposta ao adicionar aos favoritos:", data);

            if (data.status === 'success') {
                showToast('Produto adicionado aos favoritos!');
                await loadFavoriteItems(); // Recarrega os itens
                updateHeartIcons(); // Atualiza os ícones de coração
            } else {
                showToast(data.message || 'Erro ao adicionar aos favoritos', 'error');
            }
        } catch (error) {
            console.error('Erro ao adicionar aos favoritos:', error);
            showToast('Erro ao adicionar aos favoritos: ' + error.message, 'error');
        }
    }

    // Make addToFavorites global
    window.addToFavorites = addToFavorites;

    // Remove cart item
    async function removeCartItem(productId) {
        try {
            console.log("Removendo produto do carrinho:", productId);
            const formData = new FormData();
            formData.append('action', 'remove_from_cart');
            formData.append('product_id', productId);

            const response = await fetch('api/compras/cart_operations.php', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Erro na resposta do servidor: ' + response.status);
            }

            const data = await response.json();
            console.log("Resposta ao remover do carrinho:", data);

            if (data.status === 'success') {
                showToast('Produto removido do carrinho');
                loadCartItems(); // Recarrega os itens
            } else {
                showToast(data.message || 'Erro ao remover produto', 'error');
            }
        } catch (error) {
            console.error('Erro ao remover do carrinho:', error);
            showToast('Erro ao remover produto: ' + error.message, 'error');
        }
    }

    // Update cart item quantity
    async function updateCartItemQuantity(productId, quantity) {
        try {
            console.log("Atualizando quantidade do produto:", productId, "para", quantity);
            const formData = new FormData();
            formData.append('action', 'update_cart_quantity');
            formData.append('product_id', productId);
            formData.append('quantity', quantity);

            const response = await fetch('api/compras/cart_operations.php', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Erro na resposta do servidor: ' + response.status);
            }

            const data = await response.json();
            console.log("Resposta ao atualizar quantidade:", data);

            if (data.status === 'success') {
                // Atualizar os dados locais
                const itemIndex = cart_data.findIndex(item => item.id === productId);
                if (itemIndex !== -1) {
                    cart_data[itemIndex].quantity = quantity;

                    // Atualizar a UI diretamente para feedback imediato
                    const cartBox = document.querySelector(`.cart-box[data-id="${productId}"]`);
                    if (cartBox) {
                        const quantitySpan = cartBox.querySelector('.number');
                        if (quantitySpan) {
                            quantitySpan.textContent = quantity;
                        }
                    }

                    updateTotalPrice();
                }

                // Remover esta linha para evitar a dupla atualização
                // loadCartItems();
            } else {
                showToast(data.message || 'Erro ao atualizar quantidade', 'error');
            }
        } catch (error) {
            console.error('Erro ao atualizar quantidade:', error);
            showToast('Erro ao atualizar quantidade: ' + error.message, 'error');
        }
    }

    // Adicionar função para atualizar o preço total
    function updateTotalPrice() {
        const totalPriceElement = document.querySelector('.total-price');
        if (!totalPriceElement) return;

        let total = 0;
        cart_data.forEach(item => {
            total += parseFloat(item.price) * parseInt(item.quantity);
        });

        totalPriceElement.innerText = `R$ ${total.toFixed(2)}`;
    }

    // Remove favorite item
    async function removeFavoriteItem(productId) {
        try {
            console.log("Removendo produto dos favoritos:", productId);
            const formData = new FormData();
            formData.append('action', 'remove_from_favorites');
            formData.append('product_id', productId);

            const response = await fetch('api/compras/cart_operations.php', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Erro na resposta do servidor: ' + response.status);
            }

            const data = await response.json();
            console.log("Resposta ao remover dos favoritos:", data);

            if (data.status === 'success') {
                showToast('Produto removido dos favoritos');
                loadFavoriteItems(); // Recarrega os favoritos
            } else {
                showToast(data.message || 'Erro ao remover dos favoritos', 'error');
            }
        } catch (error) {
            console.error('Erro ao remover dos favoritos:', error);
            showToast('Erro ao remover dos favoritos: ' + error.message, 'error');
        }
    }

    // Move item from favorites to cart
    async function moveToCart(productId) {
        try {
            console.log("Movendo produto dos favoritos para o carrinho:", productId);
            const formData = new FormData();
            formData.append('action', 'move_to_cart');
            formData.append('product_id', productId);

            const response = await fetch('api/compras/cart_operations.php', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Erro na resposta do servidor: ' + response.status);
            }

            const data = await response.json();
            console.log("Resposta ao mover para o carrinho:", data);

            if (data.status === 'success') {
                showToast('Produto movido para o carrinho');
                loadCartItems();
                loadFavoriteItems();
            } else {
                showToast(data.message || 'Erro ao mover para o carrinho', 'error');
            }
        } catch (error) {
            console.error('Erro ao mover para o carrinho:', error);
            showToast('Erro ao mover para o carrinho: ' + error.message, 'error');
        }
    }

    // Move all items from favorites to cart
    async function moveAllToCart() {
        try {
            console.log("Movendo todos os produtos dos favoritos para o carrinho");
            const formData = new FormData();
            formData.append('action', 'move_all_to_cart');

            const response = await fetch('api/compras/cart_operations.php', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Erro na resposta do servidor: ' + response.status);
            }

            const data = await response.json();
            console.log("Resposta ao mover todos para o carrinho:", data);

            if (data.status === 'success') {
                showToast(`${data.data.count || 'Todos os'} produtos movidos para o carrinho`);
                loadCartItems();
                loadFavoriteItems();
            } else {
                showToast(data.message || 'Erro ao mover produtos para o carrinho', 'error');
            }
        } catch (error) {
            console.error('Erro ao mover todos para o carrinho:', error);
            showToast('Erro ao mover produtos para o carrinho: ' + error.message, 'error');
        }
    }
});

// Adicionar ao arquivo compras.js
document.addEventListener('DOMContentLoaded', function () {
    // Botões flutuantes
    const floatingCart = document.getElementById('floating-cart');
    const floatingFavorites = document.getElementById('floating-favorites');
    const floatingProfile = document.getElementById('floating-profile');
    const floatingSearch = document.getElementById('floating-search');

    if (floatingCart) {
        floatingCart.addEventListener('click', () => {
            const cart = document.querySelector('.cart');
            if (cart) cart.classList.add('active');
        });
    }

    if (floatingFavorites) {
        floatingFavorites.addEventListener('click', () => {
            const savedItems = document.querySelector('.saved-items');
            if (savedItems) savedItems.classList.add('active');
        });
    }

    if (floatingProfile) {
        floatingProfile.addEventListener('click', () => {
            window.location.href = 'profile.php';
        });
    }

    if (floatingSearch) {
        floatingSearch.addEventListener('click', () => {
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => searchInput.focus(), 500);
            }
        });
    }
});

// Adicionar ao compras.js
// Update heart icons based on favorites data
function updateHeartIcons() {
    // Verificar se há produtos na página
    const productBoxes = document.querySelectorAll('.product-box');
    if (productBoxes.length === 0 || !favorites_data) return;

    // Para cada produto na página, atualizar o ícone de coração
    productBoxes.forEach(productBox => {
        const productId = productBox.dataset.id;
        const heartIcon = productBox.querySelector('.save-item');
        
        if (!heartIcon) return;
        
        // Verificar se o produto está nos favoritos
        const isInFavorites = favorites_data.some(item => item.id === productId);
        
        if (isInFavorites) {
            // Se estiver nos favoritos, mostrar coração preenchido
            heartIcon.classList.remove('ri-heart-line');
            heartIcon.classList.add('ri-heart-fill');
            heartIcon.style.color = '#ff4757';
        } else {
            // Se não estiver nos favoritos, mostrar coração vazio
            heartIcon.classList.remove('ri-heart-fill');
            heartIcon.classList.add('ri-heart-line');
            heartIcon.style.color = '';
        }
    });
}