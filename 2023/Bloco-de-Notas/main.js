// Captura os elementos HTML usando seus IDs
const novaNota = document.getElementById("nova-nota"); // Captura a textarea para inserir uma nova nota
const adicionarNota = document.getElementById("adicionar-nota"); // Captura o botão para adicionar uma nova nota
const limparNotas = document.getElementById("limpar-notas"); // Captura o botão para limpar todas as notas
const notasSalvas = document.getElementById("notas-salvas"); // Captura o elemento que conterá as notas salvas

// Verifica se há alguma nota no armazenamento local
if (localStorage.getItem("notas")) {
    // Recupera as notas do armazenamento local e as converte de volta para JavaScript
    const notas = JSON.parse(localStorage.getItem("notas"));

    // Itera sobre cada nota e chama a função 'criarNota' para exibi-las
    notas.forEach(function (nota, index) {
        criarNota(nota.texto, index, nota.cor);
    });
}

/// Adiciona um evento de clique ao botão "Adicionar Nota"
adicionarNota.addEventListener("click", function () {
    // Obtém o texto da nova nota, removendo espaços em branco no início e no final
    const textoNota = novaNota.value.trim();

    if (textoNota !== '') {
        // Chama a função 'criarNota' para criar uma nova nota
        criarNota(textoNota);
        // Chama a função 'salvarNota' para atualizar o armazenamento local
        salvarNota();
        // Limpa a textarea após adicionar a nota
        novaNota.value = '';
    }
});

// Adiciona um evento de clique ao botão "Limpar Notas"
limparNotas.addEventListener("click", function () {
    notasSalvas.innerHTML = '';
    localStorage.removeItem('notas');
});

// Função para criar uma nova nota na interface
function criarNota(texto, index, cor, corTexto) {
    const div = document.createElement("div");
    const divEditar = document.createElement("div")
    const divEditarTexto = document.createElement("div")
    const divEditarCor = document.createElement("div")

    const p = document.createElement("p");
    const botaoEditar = document.createElement("button");
    const botaoExcluir = document.createElement("button");

    const inputCor = document.createElement("input");
    inputCor.type = "color";

    const inputCorTexto = document.createElement("input");
    inputCorTexto.type = "color";

    p.textContent = texto;
    botaoEditar.textContent = "Editar";
    botaoExcluir.textContent = "Excluir";


    div.appendChild(p);
    div.appendChild(divEditar);
    divEditar.appendChild(divEditarTexto);
    divEditar.appendChild(divEditarCor);


    divEditarTexto.appendChild(botaoEditar);
    divEditarTexto.appendChild(botaoExcluir);

    divEditarCor.appendChild(inputCor);
    divEditarCor.appendChild(inputCorTexto);

    div.className = "nota";
    divEditar.className = "divEditar";
    divEditarTexto.className = "divEditarTexto"
    divEditarCor.className = "divEditarCor"


    // Verifica se o índice é indefinido
    if (index !== undefined) {
        inputCor.value = cor;
        inputCorTexto.value = corTexto;
        div.style.backgroundColor = cor;
        p.style.color = corTexto;
    }

    notasSalvas.appendChild(div);

    // Função para excluir nota
    botaoExcluir.addEventListener("click", function () {
        if (confirm("Tem certeza que deseja excluir esta nota?")) {
            div.remove();
            salvarNota();
        }
    });

    // Função para editar nota
    botaoEditar.addEventListener("click", function () {
        editarNota(p, div, inputCor, inputCorTexto);
    });


    inputCor.addEventListener("input", function () {
        div.style.backgroundColor = inputCor.value;
        salvarNota();
    });

    // Detect mudança de cor do texto
    inputCorTexto.addEventListener("input", function () {
        p.style.color = inputCorTexto.value;
        salvarNota();
    });

    // Função para editar uma nota
    function editarNota(p, div, inputCor, inputCorTexto) {
        const textareaEdicao = document.createElement("textarea");
        textareaEdicao.value = p.textContent;
        div.replaceChild(textareaEdicao, p);

        const botaoSalvar = document.createElement("button");
        botaoSalvar.textContent = "Salvar";
        div.appendChild(botaoSalvar);

        botaoSalvar.addEventListener("click", function() {
            p.textContent = textareaEdicao.value;
            div.replaceChild(p, textareaEdicao);
            div.removeChild(botaoSalvar);
            div.style.backgroundColor = inputCor.value;
            p.style.color = inputCorTexto.value;
            salvarNota();
        });
    }
}

// Função para salvar as notas no armazenamento local
function salvarNota() {
    const notas = [];
    const divsNotas = notasSalvas.querySelectorAll(".nota");
// Itera sobre cada div de nota
    divsNotas.forEach(function (div) {
        // Obtém o texto da nota e a cor selecionada
        const p = div.querySelector('p');
        const inputCor = div.querySelector("input");
        notas.push({
            texto: p.textContent,
            cor: inputCor.value
        });
    });

    // Converte o array de notas em uma string JSON e armazena no localStorage
    localStorage.setItem("notas", JSON.stringify(notas));
}