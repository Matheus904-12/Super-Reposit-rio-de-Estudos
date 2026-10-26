const produtos = [
    { nome: "Logitech MX Keys S", preco: 745.00 },
    { nome: "Cadeira Ergonomic, Thunderx3, Yama1", preco: 1350.00 },
    { nome: "Beats Studio 3", preco: 780.00 },
    { nome: "Philips Monitor 49 SuperWide", preco: 7680.00 },
    { nome: "Logitech MX Master 2s", preco: 599.90 },
    { nome: "Xiaomi Mi Computer Monitor Light Bar", preco: 350.00 },
    { nome: "Baseus - Working Station", preco: 1998.90 },
    { nome: "Mouse-Pad Desk Logitech", preco: 154.00 },
    { nome: "Stream-Deck Elgato XL", preco: 4690.00 }
];

const carrinho = {
    itens: {},
    total: 0,
};

function atualizarCarrinho() {
    const carrinhoDropdown = document.getElementById("carrinho-dropdown");
    const listaItensCarrinho = document.getElementById("itens-lista");
    listaItensCarrinho.innerHTML = "";

    for (const nome in carrinhoItens) {
        const item = carrinhoItens[nome];
        const novoItem = document.createElement("li");
        novoItem.innerHTML = `
            ${nome} - Quantidade: ${item.quantidade} - Total: R$${item.precoTotal.toFixed(2)}
            <button onclick="removerDoCarrinho('${nome}', ${item.preco}, ${item.quantidade})">Remover</button>
        `;
        listaItensCarrinho.appendChild(novoItem);
    }

    document.getElementById("preco-total").innerHTML = `Valor Total R$${carrinho.total.toFixed(2)}`;
    updateCarrinho();
    toggleCarrinho(); // Adicione esta linha para exibir o dropdown automaticamente ao atualizar
}

const carrinhoItens = {};

function adicionarAoCarrinho(nome, preco) {
    if (carrinhoItens[nome]) {
        carrinhoItens[nome].quantidade++;
        carrinhoItens[nome].precoTotal += preco;
    } else {
        carrinhoItens[nome] = {
            quantidade: 1,
            preco: preco,
            precoTotal: preco,
        };
    }

    carrinho.total += preco;

    atualizarCarrinho();
    exibirImagemNoCarrinho(nome); // Adiciona a imagem no carrinho
}

// Função para exibir a imagem do produto no carrinho
function exibirImagemNoCarrinho(nome) {
    const listaItensCarrinho = document.getElementById("itens-lista");
    const item = carrinhoItens[nome];
    const novoItem = document.createElement("li");
    novoItem.innerHTML = `
        <img class="imagem" src="img/${nome.replace(/\s+/g, '-').toLowerCase()}.jpg" alt="${nome}">
        ${nome} - Quantidade: ${item.quantidade} - Total: R$${item.precoTotal.toFixed(2)}
        <button onclick="removerDoCarrinho('${nome}', ${item.preco}, ${item.quantidade})">Remover</button>
    `;
    listaItensCarrinho.appendChild(novoItem);
}

// Ajuste na função limparCarrinho para corrigir a reatribuição do objeto
function limparCarrinho() {
    carrinhoItens = {};
    carrinho.total = 0;
    atualizarCarrinho();
}

// Função para adicionar ao carrinho diretamente da lista de produtos
function addCarrinho(nome, preco) {
    adicionarAoCarrinho(nome, preco);
    toggleCarrinho(); // Fecha o carrinho após adicionar um item
}

// Corrija a função toggleCarrinho
function toggleCarrinho() {
    const carrinhoDropdown = document.getElementById("carrinho-dropdown");
    if (carrinhoDropdown.style.display === "none" || carrinhoDropdown.style.display === "") {
        carrinhoDropdown.style.display = "block";
    } else {
        carrinhoDropdown.style.display = "none";
    }
}


function buscarProdutos() {
    const termo = document.getElementById("buscar-input").value.toLowerCase();
    const resultados = produtos.filter(produto => produto.nome.toLowerCase().includes(termo));
    const listaProdutos = document.getElementById("produtos-lista");
    listaProdutos.innerHTML = "";

    resultados.forEach(produto => {
        const novoItem = document.createElement("div");
        novoItem.classList.add("produto");
        novoItem.innerHTML = `
            <div class="imagem">
                <img src="img/${produto.nome.replace(/\s+/g, '-').toLowerCase()}.jpg" alt="">
            </div>
            <div class="infos">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco.toFixed(2)}</p>
                <button onclick="adicionarAoCarrinho('${produto.nome}', ${produto.preco})">Adicionar ao Carrinho</button>
            </div>
        `;
        listaProdutos.appendChild(novoItem);
    });
}

function updateCarrinho() {
    const contCarrinho = document.getElementById("cont-carrinho");
    let totalItens = 0;
    for (let itemNome in carrinhoItens) {
        totalItens += carrinhoItens[itemNome].quantidade;
    }
    contCarrinho.innerHTML = totalItens;
}
