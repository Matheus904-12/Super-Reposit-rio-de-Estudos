// Atualizar contador e dropdown do carrinho
function atualizarCarrinho() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCounter = document.getElementById('cart-counter');
    const cartDropdown = document.getElementById('cart-items');

    // Atualizar contador
    cartCounter.textContent = cartItems.length;

    // Atualizar lista no dropdown
    cartDropdown.innerHTML = '';
    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.nome;
        cartDropdown.appendChild(listItem);
    });
}

// Adicionar estrela no container
function adicionarEstrela(container) {
    if (!container.querySelector('.star')) {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = '★';
        star.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            color: gold;
            font-size: 20px;
        `;
        container.style.position = 'relative';
        container.appendChild(star);
    }
}

// Remover estrela do container
function removerEstrela(container) {
    const star = container.querySelector('.star');
    if (star) {
        star.remove();
    }
}

// Adicionar item ao carrinho
function adicionarAoCarrinho(nome) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Verificar se o item já está no carrinho
    if (!cartItems.some(item => item.nome === nome)) {
        cartItems.push({ nome });
        localStorage.setItem('cart', JSON.stringify(cartItems));
        atualizarCarrinho();
    }
}

// Remover item do carrinho
function removerDoCarrinho(nome) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Filtrar itens que não são o selecionado
    const novosItems = cartItems.filter(item => item.nome !== nome);
    localStorage.setItem('cart', JSON.stringify(novosItems));
    atualizarCarrinho();
}

// Inicializar containers para cliques
function inicializarContainers() {
    const containers = document.querySelectorAll('.container');

    containers.forEach(container => {
        const nome = container.querySelector('h3').textContent;

        // Verificar estado inicial do carrinho
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        if (cartItems.some(item => item.nome === nome)) {
            adicionarEstrela(container);
        } else {
            removerEstrela(container);
        }

        container.onclick = () => {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            if (cartItems.some(item => item.nome === nome)) {
                removerDoCarrinho(nome);
                removerEstrela(container);
            } else {
                adicionarAoCarrinho(nome);
                adicionarEstrela(container);
            }
        };
    });
}

// Mostrar/ocultar dropdown do carrinho
function toggleCartDropdown() {
    const cartDropdown = document.getElementById('cart-dropdown');

    if (cartDropdown.style.display === 'block') {
        cartDropdown.style.display = 'none';
        document.removeEventListener('click', fecharDropdownAoClicarFora);
    } else {
        cartDropdown.style.display = 'block';
        setTimeout(() => {
            document.addEventListener('click', fecharDropdownAoClicarFora);
        }, 0);
    }
}

// Fechar dropdown ao clicar fora
function fecharDropdownAoClicarFora(event) {
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartButton = document.getElementById('cart-button');

    if (
        cartDropdown &&
        cartDropdown.style.display === 'block' &&
        !cartDropdown.contains(event.target) &&
        !cartButton.contains(event.target)
    ) {
        cartDropdown.style.display = 'none';
        document.removeEventListener('click', fecharDropdownAoClicarFora);
    }
}

// Finalizar pedido
function finalizarPedido() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartItems.length === 0) {
        alert('O carrinho está vazio!');
        return;
    }
    alert(`Pedido finalizado:\n${cartItems.map(item => item.nome).join('\n')}`);
    localStorage.removeItem('cart');
    atualizarCarrinho();
}

// Inicializar carrinho e containers ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarCarrinho();
    inicializarContainers();
});

// Adicionar evento para o botão de finalizar pedido
document.getElementById('checkout-btn')?.addEventListener('click', finalizarPedido);
