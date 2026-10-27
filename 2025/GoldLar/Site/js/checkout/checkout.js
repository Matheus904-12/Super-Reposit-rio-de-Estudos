/**
 * Enhanced Checkout System
 * Handles checkout process, payment methods, form validation, and API interactions
 */

document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const checkoutForm = document.getElementById('checkout-form');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentMethodInput = document.getElementById('payment_method');
    const creditCardDetails = document.getElementById('credit_card_details');
    const pixDetails = document.getElementById('pix_details');
    const cardNumberInput = document.getElementById('card_number');
    const cardExpiryInput = document.getElementById('card_expiry');
    const cardCvvInput = document.getElementById('card_cvv');
    const cepInput = document.getElementById('shipping_cep');
    const btnFindCep = document.getElementById('btn-find-cep');
    const processingOverlay = document.getElementById('processing-overlay');
    const pixModal = document.getElementById('pix-modal');
    const phoneInput = document.getElementById('shipping_phone');
    const savedCards = document.querySelectorAll('.saved-card');
    const newCardForm = document.getElementById('new_card_form');


    // Track order information globally
    const orderInfo = {
        paymentMethod: '',
        installments: 1,
        orderNumber: generateOrderNumber(),
        orderTotal: 0
    };

    // Initialize payment method
    let selectedPaymentMethod = '';

    // Initialize masks for form inputs
    initializeInputMasks();

    // Setup event listeners
    setupEventListeners();

    // Add installment selector to the page for credit card
    addCreditCardInstallmentSelector();

    /**
     * Initialize the checkout page
     */
    function initializeCheckout() {
        // Initialize input masks
        initializeInputMasks();

        // Setup event listeners
        setupEventListeners();

        // Auto-select first payment method (credit card by default)
        const firstPaymentMethod = document.querySelector('.payment-method');
        if (firstPaymentMethod) {
            selectPaymentMethod(firstPaymentMethod.dataset.method);
        }

        // Initialize installment selectors
        addCreditCardInstallmentSelector();

        // Initial price calculation
        updateAllPrices();

        // Set up real-time price updates
        // Add event listeners to quantity inputs
        document.querySelectorAll('.cart-item-quantity input').forEach(input => {
            input.addEventListener('change', updateAllPrices);
        });

        // Update prices when shipping is calculated
        document.getElementById('shipping_cep').addEventListener('blur', function () {
            if (this.value.replace(/\D/g, '').length === 8) {
                findAddressByCep();
            }
        });
    }

    // Initialize the checkout page when DOM is ready
    document.addEventListener('DOMContentLoaded', initializeCheckout);

    /**
     * Copy text to clipboard
     * @param {string} elementId - ID of the element containing text to copy
     */
    function copyToClipboard(elementId) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element with ID ${elementId} not found`);
            return;
        }

        // Create temporary element for copying
        const tempElement = document.createElement('textarea');
        tempElement.value = element.textContent;
        document.body.appendChild(tempElement);
        tempElement.select();

        try {
            document.execCommand('copy');
            alert('Código PIX copiado para a área de transferência!');
        } catch (err) {
            console.error('Erro ao copiar texto:', err);
            alert('Erro ao copiar o código PIX. Por favor, copie manualmente.');
        }

        document.body.removeChild(tempElement);
    }

    /**
     * Generate a random order number
     */
    function generateOrderNumber() {
        return 'ORD-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    }

    /**
     * Add installment selector for credit card payments
     */
    function addCreditCardInstallmentSelector() {
        // Get the total amount
        const total = getTotal();
        orderInfo.orderTotal = total;

        // Create installment options (up to 5x without interest)
        const installmentOptions = [];
        for (let i = 1; i <= 5; i++) {
            const installmentAmount = (total / i).toFixed(2).replace('.', ',');
            installmentOptions.push(`<option value="${i}">${i}x de R$${installmentAmount} sem juros</option>`);
        }

        // Create the installment selector
        const installmentSelector = document.createElement('div');
        installmentSelector.className = 'form-group installment-selector';
        installmentSelector.innerHTML = `
            <label for="cc_installments">Parcelamento</label>
            <select id="cc_installments" name="cc_installments" class="form-control">
                ${installmentOptions.join('')}
            </select>
        `;

        // Remove any existing installment selector before adding a new one
        const existingSelector = document.querySelector('.installment-selector');
        if (existingSelector) {
            existingSelector.remove();
        }

        // Add the selector to the credit card form
        if (newCardForm) {
            newCardForm.appendChild(installmentSelector);
        }
    }

    /**
     * Initialize input masks for better user experience
     */
    function initializeInputMasks() {
        if (cardNumberInput) $(cardNumberInput).mask('0000 0000 0000 0000');
        if (cardExpiryInput) $(cardExpiryInput).mask('00/00');
        if (cardCvvInput) $(cardCvvInput).mask('0000');
        if (cepInput) $(cepInput).mask('00000-000');
        if (phoneInput) $(phoneInput).mask('(00) 00000-0000');
    }

    // Initialize variables when the document is ready
    document.addEventListener('DOMContentLoaded', function () {
        // Define the global variables
        window.cepInput = document.getElementById('cepInput'); // Update with your actual ID
        window.btnFindCep = document.getElementById('btnFindCep'); // Update with your actual ID
        window.checkoutForm = document.getElementById('checkoutForm'); // Update with your actual ID

        // Attach event listeners
        if (window.cepInput) {
            // Don't use inline onchange in HTML, use this instead
            window.cepInput.addEventListener('change', findAddressByCep);
        }

        if (window.btnFindCep) {
            window.btnFindCep.addEventListener('click', findAddressByCep);
        }
    });

    /**
     * Setup all event listeners
     */
    function setupEventListeners() {
        // Payment method selection
        paymentMethods.forEach(method => {
            method.addEventListener('click', function () {
                selectPaymentMethod(this.dataset.method);
            });
        });

        // CEP finder button
        if (btnFindCep) {
            btnFindCep.addEventListener('click', function () {
                findAddressByCep();
            });
        }

        // CEP input change event
        if (cepInput) {
            cepInput.addEventListener('change', function () {
                findAddressByCep();
            });
        }

        // Saved cards functionality
        if (savedCards) {
            savedCards.forEach(card => {
                card.addEventListener('click', function () {
                    if (this.classList.contains('new-card')) {
                        showNewCardForm();
                    } else {
                        selectSavedCard(this);
                    }
                });
            });
        }

        // Card number validation and card type detection
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', function () {
                detectCardType(this.value);
            });
        }

        // Form submission
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', function (e) {
                if (!validateCheckoutForm()) {
                    e.preventDefault();
                    return false;
                }

                // Show processing overlay
                processingOverlay.style.display = 'flex';

                // Handle different payment methods
                if (selectedPaymentMethod === 'pix') {
                    e.preventDefault();
                    processPixPayment();
                    return false;
                } else if (selectedPaymentMethod === 'boleto') {
                    e.preventDefault();
                    processBoletoPayment();
                    return false;
                }

                // Store selected payment method
                orderInfo.paymentMethod = selectedPaymentMethod;

                // Track credit card installments
                if (selectedPaymentMethod === 'credit_card') {
                    const ccInstallments = document.getElementById('cc_installments');
                    if (ccInstallments) {
                        orderInfo.installments = parseInt(ccInstallments.value);
                    }
                }

                // Continue with form submission for credit card
                return true;
            });
        }

        // PIX modal close button
        const modalClose = document.querySelector('.modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', function () {
                pixModal.style.display = 'none';
            });
        }

        // Copy PIX code button
        const copyPixCode = document.getElementById('copy-pix-code');
        if (copyPixCode) {
            copyPixCode.addEventListener('click', function () {
                copyToClipboard('pix-code-text');
            });
        }

        // PIX payment confirmation button
        const pixConfirmBtn = document.getElementById('pix-confirm-payment');
        if (pixConfirmBtn) {
            pixConfirmBtn.addEventListener('click', function () {
                confirmPixPayment();
            });
        }
    }

    // Make sure the findAddressByCep function is defined in the global scope
    window.findAddressByCep = findAddressByCep;

    // Initialize the entire checkout system when the document is ready
    document.addEventListener('DOMContentLoaded', function () {
        // Initialize variables
        window.cepInput = document.getElementById('shipping_cep');
        window.btnFindCep = document.getElementById('btn-find-cep');
        window.checkoutForm = document.getElementById('checkout-form');

        // Initialize the checkout system
        initializeCheckout();
    });

    /**
     * Select payment method and update UI
     */
    function selectPaymentMethod(method) {
        // Remove active class from all methods
        paymentMethods.forEach(m => m.classList.remove('active'));

        // Add active class to selected method
        document.querySelector(`.payment-method[data-method="${method}"]`).classList.add('active');

        // Update hidden input
        paymentMethodInput.value = method;
        selectedPaymentMethod = method;
        orderInfo.paymentMethod = method;

        // Show/hide payment details based on selection
        if (method === 'credit_card') {
            creditCardDetails.style.display = 'block';
            pixDetails.style.display = 'none';
        } else if (method === 'pix') {
            creditCardDetails.style.display = 'none';
            pixDetails.style.display = 'block';
        }
    }


    /**
     * Get the subtotal from the cart items
     * @returns {number} - Subtotal price in BRL
     */
    function getSubtotal() {
        // Initialize subtotal
        let subtotal = 0;

        // Get all cart items
        const cartItems = document.querySelectorAll('.cart-item');

        // Calculate subtotal from cart items
        cartItems.forEach(item => {
            const priceElement = item.querySelector('.cart-item-price');
            const quantityElement = item.querySelector('.cart-item-quantity');

            if (priceElement && quantityElement) {
                // Get price from "R$123,45" format
                const priceText = priceElement.textContent;
                const price = parseFloat(priceText.replace('R$', '').replace('.', '').replace(',', '.'));

                // Get quantity from "Quantidade: X" format
                const quantityText = quantityElement.textContent;
                const quantity = parseInt(quantityText.replace('Quantidade: ', ''));

                // Add to subtotal
                subtotal += price * quantity;
            }
        });

        return subtotal;
    }


    /**
 * Get the shipping cost
 * @returns {number} - Shipping cost in BRL
 */
    function getShippingCost() {
        const shippingCostElement = document.querySelector('.shipping-cost');
        if (!shippingCostElement) return 0;

        // Extract shipping cost from "R$ 12,34" format
        const shippingText = shippingCostElement.textContent;
        return parseFloat(shippingText.replace('R$', '').replace('.', '').replace(',', '.'));
    }


    /**
 * Get discount value
 * @returns {number} - Discount amount in BRL
 */
    function getDiscount() {
        const discountElement = document.querySelector('.price-row:not(.price-total):not(.price-subtotal) span:last-child');
        if (!discountElement || !discountElement.textContent.includes('-')) return 0;

        // Extract discount from "-R$12,34" format
        const discountText = discountElement.textContent;
        return parseFloat(discountText.replace('-R$', '').replace('.', '').replace(',', '.'));
    }

    /**
 * Calculate shipping cost based on distance from store
 * @param {string} destinationAddress - Customer's full address
 * @returns {number} - Shipping cost in BRL
 */
    function calculateShippingCost(destinationAddress) {
        // Get cart total amount for free shipping check
        const cartTotal = getTotal();

        // Free shipping for orders above R$350,00
        if (cartTotal >= 350.00) {
            return 0.00;
        }

        // Check if the address is in São Paulo state (SP)
        if (destinationAddress.toLowerCase().includes(', sp') ||
            destinationAddress.toLowerCase().includes(' - sp') ||
            destinationAddress.toLowerCase().includes('-sp')) {
            // Free shipping for all São Paulo state
            return 0.00;
        }

        // Store address (fixed)
        const storeAddress = "Rua Mário Bochetti 1102, Suzano, Miguel Badra, SP";

        // Get distance between addresses
        const distance = getDistanceBetweenAddresses(storeAddress, destinationAddress);

        // Calculate shipping cost based on distance
        let shippingCost = 30.00; // Minimum shipping cost

        if (distance <= 5) {
            // Up to 5km
            shippingCost = 30.00;
        } else if (distance <= 10) {
            // 5km to 10km
            shippingCost = 45.00;
        } else if (distance <= 20) {
            // 10km to 20km
            shippingCost = 60.00;
        } else if (distance <= 30) {
            // 20km to 30km
            shippingCost = 75.00;
        } else {
            // Over 30km
            shippingCost = 100.00;
        }

        // Return shipping cost with two decimal places
        return parseFloat(shippingCost.toFixed(2));
    }

    /**
 * Get distance between two addresses using Google Maps Distance Matrix API
 * In a real application, this would use an actual API call
 * Here we're simulating it with a deterministic but somewhat random distance calculation
 * @param {string} origin - Origin address
 * @param {string} destination - Destination address
 * @returns {number} - Distance in kilometers
 */
    function getDistanceBetweenAddresses(origin, destination) {
        // Parse CEP from destination address if available
        const cepMatch = destination.match(/\d{5}-?\d{3}/);

        // Create a deterministic "random" distance based on CEP or destination string
        let seed;
        if (cepMatch) {
            seed = parseInt(cepMatch[0].replace('-', ''));
        } else {
            // Create a number from the string
            seed = destination.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        }

        // Generate a distance between 1 and 40 km
        const distance = (seed % 40) + 1;

        return distance;
    }

    /**
     * Find address information by CEP using API
     */
    function findAddressByCep() {
        const cep = cepInput.value.replace(/\D/g, '');

        if (cep.length !== 8) {
            showError('CEP inválido. Por favor, digite um CEP válido.');
            return;
        }

        // Show loading indicator
        btnFindCep.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        btnFindCep.disabled = true;

        // Fetch address from API
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    showError('CEP não encontrado.');
                    return;
                }

                // Fill the form with address data
                const addressInput = document.getElementById('shipping_address');
                if (addressInput) {
                    addressInput.value = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`;

                    // Store complete address information for shipping calculation
                    const fullAddress = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}, ${cep}`;

                    // Create a hidden input for the full address if it doesn't exist
                    let fullAddressInput = document.getElementById('full_shipping_address');
                    if (!fullAddressInput) {
                        fullAddressInput = document.createElement('input');
                        fullAddressInput.type = 'hidden';
                        fullAddressInput.id = 'full_shipping_address';
                        fullAddressInput.name = 'full_shipping_address';
                        checkoutForm.appendChild(fullAddressInput);
                    }
                    fullAddressInput.value = fullAddress;

                    // Calculate and display shipping cost
                    const shippingCost = calculateShippingCost(fullAddress);
                    updateShippingCost(shippingCost);
                }

                // Reset button
                btnFindCep.innerHTML = 'Buscar';
                btnFindCep.disabled = false;
            })
            .catch(error => {
                console.error('Erro ao buscar CEP:', error);
                showError('Erro ao buscar CEP. Tente novamente.');

                // Reset button
                btnFindCep.innerHTML = 'Buscar';
                btnFindCep.disabled = false;
            });
    }

    /**
     * Show new card form and hide saved cards
     */
    function showNewCardForm() {
        const savedCardsContainer = document.querySelector('.saved-cards');
        if (savedCardsContainer) savedCardsContainer.style.display = 'none';
        if (newCardForm) newCardForm.style.display = 'block';
    }

    /**
     * Select a saved card
     */
    function selectSavedCard(cardElement) {
        // Remove active class from all cards
        savedCards.forEach(card => card.classList.remove('active'));

        // Add active class to selected card
        cardElement.classList.add('active');

        // Hide new card form
        if (newCardForm) newCardForm.style.display = 'none';

        // Set hidden input for card ID
        const cardId = cardElement.dataset.cardId;
        const cardIdInput = document.getElementById('saved_card_id');
        if (!cardIdInput) {
            // Create hidden input if it doesn't exist
            const input = document.createElement('input');
            input.type = 'hidden';
            input.id = 'saved_card_id';
            input.name = 'saved_card_id';
            input.value = cardId;
            checkoutForm.appendChild(input);
        } else {
            cardIdInput.value = cardId;
        }
    }

    /**
     * Detect credit card type based on number
     */
    function detectCardType(number) {
        const cardTypeIcon = document.querySelector('.card-type-icon i');

        // Remove all spaces
        number = number.replace(/\s/g, '');

        if (number.startsWith('4')) {
            // Visa
            cardTypeIcon.className = 'fab fa-cc-visa';
        } else if (/^5[1-5]/.test(number)) {
            // Mastercard
            cardTypeIcon.className = 'fab fa-cc-mastercard';
        } else if (/^3[47]/.test(number)) {
            // American Express
            cardTypeIcon.className = 'fab fa-cc-amex';
        } else if (/^6(?:011|5)/.test(number)) {
            // Discover
            cardTypeIcon.className = 'fab fa-cc-discover';
        } else {
            // Default
            cardTypeIcon.className = 'fas fa-credit-card';
        }
    }

    /**
     * Validate checkout form before submission
     */
    function validateCheckoutForm() {
        // Check if payment method is selected
        if (!selectedPaymentMethod) {
            showError('Por favor, selecione um método de pagamento.');
            return false;
        }

        // Validate shipping information
        const shippingAddress = document.getElementById('shipping_address');
        const shippingNumber = document.getElementById('shipping_number');
        const shippingCep = document.getElementById('shipping_cep');

        if (!shippingAddress || !shippingAddress.value.trim()) {
            showError('Por favor, informe o endereço de entrega.');
            return false;
        }

        if (!shippingNumber || !shippingNumber.value.trim()) {
            showError('Por favor, informe o número do endereço.');
            return false;
        }

        if (!shippingCep || !shippingCep.value.trim() || shippingCep.value.replace(/\D/g, '').length !== 8) {
            showError('Por favor, informe um CEP válido.');
            return false;
        }

        // Ensure shipping cost is included in the form
        const shippingCost = getShippingCost();
        let shippingCostInput = document.getElementById('shipping_cost');
        if (!shippingCostInput) {
            shippingCostInput = document.createElement('input');
            shippingCostInput.type = 'hidden';
            shippingCostInput.id = 'shipping_cost';
            shippingCostInput.name = 'shipping_cost';
            checkoutForm.appendChild(shippingCostInput);
        }
        shippingCostInput.value = shippingCost;

        // Ensure total cost (with shipping) is included in the form
        const total = getTotal();
        let orderTotalInput = document.getElementById('order_total');
        if (!orderTotalInput) {
            orderTotalInput = document.createElement('input');
            orderTotalInput.type = 'hidden';
            orderTotalInput.id = 'order_total';
            orderTotalInput.name = 'order_total';
            checkoutForm.appendChild(orderTotalInput);
        }
        orderTotalInput.value = total;

        // Get subtotal and discount
        const subtotal = getSubtotal();
        const discount = getDiscount();

        // Ensure all pricing components are included in the form
        let subtotalInput = document.getElementById('order_subtotal');
        if (!subtotalInput) {
            subtotalInput = document.createElement('input');
            subtotalInput.type = 'hidden';
            subtotalInput.id = 'order_subtotal';
            subtotalInput.name = 'order_subtotal';
            checkoutForm.appendChild(subtotalInput);
        }
        subtotalInput.value = subtotal;

        let discountInput = document.getElementById('order_discount');
        if (!discountInput) {
            discountInput = document.createElement('input');
            discountInput.type = 'hidden';
            discountInput.id = 'order_discount';
            discountInput.name = 'order_discount';
            checkoutForm.appendChild(discountInput);
        }
        discountInput.value = discount;

        // If credit card is selected, validate card information
        if (selectedPaymentMethod === 'credit_card') {
            // Check if a saved card is selected
            const savedCardId = document.getElementById('saved_card_id');

            if (!savedCardId || !savedCardId.value) {
                // Validate new card information
                if (!cardNumberInput || !cardNumberInput.value.trim() || cardNumberInput.value.replace(/\D/g, '').length < 13) {
                    showError('Por favor, informe um número de cartão válido.');
                    return false;
                }

                const cardName = document.getElementById('card_name');
                if (!cardName || !cardName.value.trim()) {
                    showError('Por favor, informe o nome impresso no cartão.');
                    return false;
                }

                if (!cardExpiryInput || !cardExpiryInput.value.trim() || !validateCardExpiry(cardExpiryInput.value)) {
                    showError('Por favor, informe uma data de validade válida (MM/AA).');
                    return false;
                }

                if (!cardCvvInput || !cardCvvInput.value.trim() || cardCvvInput.value.length < 3) {
                    showError('Por favor, informe o código de segurança do cartão.');
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Validate credit card expiry date
     */
    function validateCardExpiry(expiry) {
        const parts = expiry.split('/');

        if (parts.length !== 2) return false;

        const month = parseInt(parts[0], 10);
        const year = parseInt('20' + parts[1], 10);

        if (isNaN(month) || isNaN(year)) return false;
        if (month < 1 || month > 12) return false;

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        if (year < currentYear) return false;
        if (year === currentYear && month < currentMonth) return false;

        return true;
    }

    /** 
         * Process PIX payment 
         */
    function processPixPayment() {
        // Get total amount and generate temporary order ID
        const pixData = { amount: getTotal(), orderId: generateTempOrderId() };

        // Save payment method information
        orderInfo.paymentMethod = 'pix';
        orderInfo.installments = 1;

        // Simulate processing with a small delay
        setTimeout(() => {
            // Hide processing overlay
            const processingOverlay = document.getElementById('processing-overlay');
            if (processingOverlay) {
                processingOverlay.style.display = 'none';
            }

            // Show PIX modal
            const pixModal = document.getElementById('pix-modal');
            if (pixModal) {
                pixModal.style.display = 'flex';
            }

            // Generate PIX payload with order information
            const pixPayload = generatePixPayload(pixData.amount, orderInfo);
            const encodedPixPayload = encodeURIComponent(pixPayload); // URL encode the payload

            // Update PIX code text for the customer to copy
            const pixCodeText = document.getElementById('pix-code-text');
            if (pixCodeText) {
                pixCodeText.textContent = pixPayload;
            }

            // Identify QR code container
            const qrContainer = document.querySelector('.pix-qrcode');
            if (qrContainer) {
                // Remove any existing image or canvas
                qrContainer.innerHTML = '';

                // Create a new image element for the QR code
                const qrImage = document.createElement('img');
                qrImage.id = 'pix-qrcode-img';
                qrImage.style.width = '100%';
                qrImage.style.height = '100%';
                qrImage.style.maxWidth = '200px';
                qrImage.style.zIndex = '100';

                // Build the API URL for generating the QR code
                const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedPixPayload}&size=200x200`;
                qrImage.src = qrApiUrl;
                qrImage.alt = 'QR Code PIX';

                qrContainer.appendChild(qrImage);
            } else {
                console.error('QR code container not found');
            }

            // Start PIX countdown (if this function exists)
            if (typeof startPixCountdown === 'function') {
                startPixCountdown();
            }
        }, 1500);
    }

    /**
     * Update shipping cost display on the page
     * @param {number} cost - Shipping cost
     */
    function updateShippingCost(cost) {
        // Format cost as currency
        const formattedCost = cost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        // Update shipping cost element
        const shippingCostElement = document.querySelector('.shipping-cost');
        if (shippingCostElement) {
            shippingCostElement.textContent = formattedCost;
        } else {
            // Create shipping cost element if it doesn't exist
            const cartTotalElement = document.querySelector('.price-total');
            if (cartTotalElement) {
                const shippingElement = document.createElement('div');
                shippingElement.className = 'price-row shipping-row';
                shippingElement.innerHTML = `
                <span>Frete:</span>
                <span class="shipping-cost">${formattedCost}</span>
            `;
                cartTotalElement.parentNode.insertBefore(shippingElement, cartTotalElement);
            }
        }

        // Store shipping cost in a hidden input
        let shippingCostInput = document.getElementById('shipping_cost');
        if (!shippingCostInput) {
            shippingCostInput = document.createElement('input');
            shippingCostInput.type = 'hidden';
            shippingCostInput.id = 'shipping_cost';
            shippingCostInput.name = 'shipping_cost';
            checkoutForm.appendChild(shippingCostInput);
        }
        shippingCostInput.value = cost;

        // Update total with shipping cost
        updateTotalWithShipping(cost);
    }

    /**
     * Update total price including shipping cost
     * @param {number} shippingCost - Shipping cost
     */
    function updateTotalWithShipping(shippingCost) {
        // Get subtotal
        const subtotal = getSubtotal();

        // Get discount (if any)
        const discount = getDiscount();

        // Calculate new total
        const total = subtotal + shippingCost - discount;

        // Update shipping cost display
        const shippingCostElement = document.querySelector('.shipping-cost');
        if (shippingCostElement) {
            shippingCostElement.textContent = `R$ ${shippingCost.toFixed(2).replace('.', ',')}`;
        }

        // Update total element
        const totalElement = document.querySelector('.price-total span:last-child');
        if (totalElement) {
            totalElement.textContent = `R$${total.toFixed(2).replace('.', ',')}`;
        }

        // Update shipping cost hidden input
        let shippingCostInput = document.getElementById('shipping_cost');
        if (!shippingCostInput) {
            shippingCostInput = document.createElement('input');
            shippingCostInput.type = 'hidden';
            shippingCostInput.id = 'shipping_cost';
            shippingCostInput.name = 'shipping_cost';
            checkoutForm.appendChild(shippingCostInput);
        }
        shippingCostInput.value = shippingCost;

        // Update order total hidden input to include shipping
        let orderTotalInput = document.getElementById('order_total');
        if (!orderTotalInput) {
            orderTotalInput = document.createElement('input');
            orderTotalInput.type = 'hidden';
            orderTotalInput.id = 'order_total';
            orderTotalInput.name = 'order_total';
            checkoutForm.appendChild(orderTotalInput);
        }
        orderTotalInput.value = total;

        // Update orderInfo total
        orderInfo.orderTotal = total;
        orderInfo.shippingCost = shippingCost;

        // Update installment options
        updateInstallmentOptions();
    }


    /**
 * Update the installment options when the total price changes
 * This helps keep the displayed values in sync with the current total
 */
    function updateInstallmentOptions() {
        // Get the current total
        const total = getTotal();

        // Update credit card installment options if they exist
        const ccInstallments = document.getElementById('cc_installments');
        if (ccInstallments) {
            const selectedValue = ccInstallments.value; // Preserve selected option

            // Create new options
            let options = '';
            for (let i = 1; i <= 5; i++) {
                const installmentAmount = (total / i).toFixed(2).replace('.', ',');
                options += `<option value="${i}" ${i == selectedValue ? 'selected' : ''}>${i}x de R$${installmentAmount} sem juros</option>`;
            }

            ccInstallments.innerHTML = options;
        }
    }

    /**
     * Gera payload PIX com as informações do pedido e valor
     * @param {number} value - Valor do PIX
     * @param {Object} orderInfo - Informações do pedido
     * @returns {string} - Payload PIX
     */
    function generatePixPayload(value, orderInfo) {
        // Dados do recebedor
        const pixKey = "cristaisgoldlar@outlook.com"; // Chave PIX da loja
        const merchantName = "GOLDLAR CRISTAIS";
        const merchantCity = "SUZANO";

        // Formatar valor com duas casas decimais e ponto como separador
        const valueFormatted = value.toFixed(2);

        // ID da transação - usando o número do pedido para evitar duplicações
        const transactionId = orderInfo.orderNumber.replace(/\D/g, '').padStart(10, '0').substring(0, 10);

        // Montar os campos do payload PIX
        const payload = {
            // Payload Format Indicator (obrigatório)
            '00': '01',

            // Merchant Account Information (informações da conta do recebedor)
            '26': {
                '00': 'BR.GOV.BCB.PIX',
                '01': pixKey
            },

            // Merchant Category Code
            '52': '0000',

            // Transaction Currency (986 = BRL)
            '53': '986',

            // Transaction Amount (valor da transação)
            '54': valueFormatted,

            // Country Code (BR)
            '58': 'BR',

            // Merchant Name
            '59': merchantName,

            // Merchant City
            '60': merchantCity,

            // Additional Data Field
            '62': {
                '05': transactionId
            }
        };

        // Montar string do payload seguindo o formato EMV
        let pixCode = '';

        for (const [id, value] of Object.entries(payload)) {
            if (typeof value === 'object') {
                let subPayload = '';
                for (const [subId, subValue] of Object.entries(value)) {
                    subPayload += `${subId}${subValue.length.toString().padStart(2, '0')}${subValue}`;
                }
                pixCode += `${id}${subPayload.length.toString().padStart(2, '0')}${subPayload}`;
            } else {
                pixCode += `${id}${value.length.toString().padStart(2, '0')}${value}`;
            }
        }

        // Adicionar CRC16 (os últimos 4 caracteres do payload)
        pixCode += '6304';
        const crc = calculateCRC16(pixCode);
        pixCode += crc;

        return pixCode;
    }

    /**
     * Calcula o CRC16 para o payload PIX
     * @param {string} payload - Payload PIX
     * @returns {string} - CRC16 em formato hexadecimal
     */
    function calculateCRC16(payload) {
        const polynomial = 0x1021;
        let crc = 0xFFFF;

        // Convert string to byte array
        const bytes = [];
        for (let i = 0; i < payload.length; i++) {
            bytes.push(payload.charCodeAt(i));
        }

        // Calculate CRC16
        for (const byte of bytes) {
            crc ^= (byte << 8);
            for (let i = 0; i < 8; i++) {
                if ((crc & 0x8000) !== 0) {
                    crc = ((crc << 1) ^ polynomial) & 0xFFFF;
                } else {
                    crc = (crc << 1) & 0xFFFF;
                }
            }
        }

        // Convert to hexadecimal
        return crc.toString(16).toUpperCase().padStart(4, '0');
    }

    /**
     * Renderiza o QR code em um elemento canvas/img
     * @param {string} elementId - ID do elemento onde o QR será renderizado
     * @param {string} pixPayload - Payload PIX para o QR
     */
    function renderPixQRCode(elementId, pixPayload) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error('Elemento não encontrado:', elementId);
            return;
        }

        // Limpar qualquer conteúdo anterior
        element.innerHTML = '';

        const qrCodeOptions = {
            text: pixPayload,
            width: 250, // Aumentar o tamanho
            height: 250, // Aumentar o tamanho
            colorDark: '#000000',
            colorLight: '#FFFFFF',
            correctLevel: QRCode.CorrectLevel ? QRCode.CorrectLevel.H : 3,
            margin: 4 // Aumentar a margem
        };

        // Verificar qual método da biblioteca QRCode está disponível
        if (typeof QRCode !== 'undefined') {
            try {
                // Método 1: Para bibliotecas que usam o construtor
                if (typeof QRCode === 'function') {
                    new QRCode(element, qrCodeOptions);
                }
                // Método 2: Para bibliotecas que usam métodos estáticos
                else if (QRCode.toCanvas) {
                    QRCode.toCanvas(element, pixPayload, {
                        width: qrCodeOptions.width,
                        margin: qrCodeOptions.margin,
                        color: {
                            dark: qrCodeOptions.colorDark,
                            light: qrCodeOptions.colorLight
                        }
                    }, function (error) {
                        if (error) console.error('Erro ao gerar QR Code:', error);
                    });
                } else {
                    throw new Error('Método QRCode não suportado');
                }
            } catch (error) {
                console.error('Erro ao gerar QR Code:', error);
                // Fallback para uma mensagem de erro
                element.innerHTML = '<div style="padding:10px;border:1px solid #ccc;border-radius:4px;background-color:#f8f8f8;text-align:center;">QR Code não disponível.<br>Por favor, use o código PIX acima.</div>';
            }
        } else {
            console.error('Biblioteca QRCode não encontrada.');
            // Fallback para uma mensagem de erro
            element.innerHTML = '<div style="padding:10px;border:1px solid #ccc;border-radius:4px;background-color:#f8f8f8;text-align:center;">QR Code não disponível.<br>Por favor, use o código PIX acima.</div>';
        }
    }

    /**
 * Calculate due date by adding business days to a date
 * @param {Date} startDate - Starting date
 * @param {number} businessDays - Number of business days to add
 * @returns {string} - Formatted date string in DD/MM/YYYY format
 */
    function calculateDueDate(startDate, businessDays) {
        const endDate = new Date(startDate);
        let daysAdded = 0;

        while (daysAdded < businessDays) {
            endDate.setDate(endDate.getDate() + 1);
            // Skip weekends (0 = Sunday, 6 = Saturday)
            if (endDate.getDay() !== 0 && endDate.getDay() !== 6) {
                daysAdded++;
            }
        }

        return endDate.toLocaleDateString('pt-BR');
    }

    // Função para confirmar pagamento PIX
    function confirmPixPayment() {
        // Mostrar overlay de processamento
        processingOverlay.style.display = 'flex';

        // Simular verificação do status do pagamento
        setTimeout(() => {
            // Limpar cronômetro de contagem regressiva
            if (window.pixCountdownInterval) {
                clearInterval(window.pixCountdownInterval);
            }

            // Ocultar modal PIX
            pixModal.style.display = 'none';

            // Adicionar informações de pagamento ao formulário
            const hiddenPaymentInfo = document.createElement('input');
            hiddenPaymentInfo.type = 'hidden';
            hiddenPaymentInfo.name = 'pix_payment_id';
            hiddenPaymentInfo.value = 'PIX_' + Date.now();
            checkoutForm.appendChild(hiddenPaymentInfo);

            // Em vez de redirecionar, enviar o formulário diretamente
            checkoutForm.submit();
        }, 2000);
    }

    /**
     * Show error message
     */
    function showError(message) {
        // Check if error element exists, create if not
        let errorElement = document.querySelector('.error-message');

        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';

            // Insert before the checkout button
            const checkoutBtn = document.querySelector('.btn-checkout');
            checkoutBtn.parentNode.insertBefore(errorElement, checkoutBtn);
        }

        errorElement.textContent = message;
        errorElement.style.display = 'block';

        // Scroll to error
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Hide error after 5 seconds
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }

    /**
     * Calculate total order value
     * @returns {number} - Total price in BRL
     */
    function getTotal() {
        const subtotal = getSubtotal();
        const shipping = getShippingCost();
        const discount = getDiscount();

        // Make sure all values are valid numbers
        const validSubtotal = isNaN(subtotal) ? 0 : subtotal;
        const validShipping = isNaN(shipping) ? 0 : shipping;
        const validDiscount = isNaN(discount) ? 0 : discount;

        const total = validSubtotal + validShipping - validDiscount;

        // Log for debugging
        console.log("Total calculation:", {
            subtotal: validSubtotal,
            shipping: validShipping,
            discount: validDiscount,
            total: total
        });

        return subtotal + shipping - discount;
    }

    /**
     * Update all price totals in real-time
     */
    function updateAllPrices() {
        const subtotal = getSubtotal();
        const shipping = getShippingCost();
        const discount = getDiscount();
        const total = subtotal + shipping - discount;

        // Update subtotal display
        const subtotalElement = document.querySelector('.price-row:first-child span:last-child');
        if (subtotalElement) {
            subtotalElement.textContent = `R$${subtotal.toFixed(2).replace('.', ',')}`;
        }

        // Update total display
        const totalElement = document.querySelector('.price-total span:last-child');
        if (totalElement) {
            totalElement.textContent = `R$${total.toFixed(2).replace('.', ',')}`;
        }

        // Update installment options
        updateInstallmentOptions();
    }

    /**
     * Generate temporary order ID for PIX
     */
    function generateTempOrderId() {
        return 'TEMP_' + Date.now();
    }

    /**
     * Update checkout progress
     */
    function updateProgress(step) {
        const steps = document.querySelectorAll('.progress-step');

        steps.forEach((stepElement, index) => {
            const circle = stepElement.querySelector('.step-circle');
            const line = stepElement.querySelector('.step-line');

            if (index < step) {
                // Completed steps
                circle.classList.add('completed');
                circle.classList.remove('active');
                if (line) line.classList.add('active');
            } else if (index === step) {
                // Current step
                circle.classList.add('active');
                circle.classList.remove('completed');
                if (line) line.classList.remove('active');
            } else {
                // Future steps
                circle.classList.remove('active', 'completed');
                if (line) line.classList.remove('active');
            }
        });
    }

    // Initialize page - set default payment method if one exists
    if (paymentMethods.length > 0) {
        selectPaymentMethod(paymentMethods[0].dataset.method);
    }

    // Update progress to current step (payment)
    updateProgress(1);
});

/**
 * Additional code for order tracking simulation
 */
if (document.querySelector('.tracking-container')) {
    // Simulate order processing stages
    setTimeout(() => {
        document.getElementById('step-processing').classList.add('active');
        document.getElementById('tracking-progress').style.width = '25%';
    }, 3000);

    setTimeout(() => {
        document.getElementById('step-shipped').classList.add('active');
        document.getElementById('tracking-progress').style.width = '50%';
    }, 6000);

    setTimeout(() => {
        document.getElementById('step-delivered').classList.add('active');
        document.getElementById('tracking-progress').style.width = '75%';
    }, 9000);

    setTimeout(() => {
        document.getElementById('step-completed').classList.add('active');
        document.getElementById('tracking-progress').style.width = '100%';
    }, 12000);
}

document.getElementById('copy-pix-code').classList.add('copied');
setTimeout(() => document.getElementById('copy-pix-code').classList.remove('copied'), 2000);