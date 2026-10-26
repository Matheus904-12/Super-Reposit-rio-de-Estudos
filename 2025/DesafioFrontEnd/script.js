let alunos = [];
const tabela = document.querySelector('.tabela');

function exibirLista(lista) {
    while (tabela.rows.length > 1) {
        tabela.deleteRow(1);
    }

    lista.forEach(alunos => {
        const linha = tabela.insertRow(-1);
        const cellNome = linha.insertCell(0)
        const cellNota = linha.insertCell(1)

        cellNome.textContent = alunos.nome;
        cellNota.textContent = alunos.nota;

        if (alunos.nota >= 7) {
            linha.style.backgroundColor = 'green';
        } else {
            linha.style.backgroundColor = 'red';
        }
    });
}

function registraralunos() {
    const nomeInput = document.querySelector('.cadastroNota input[type="text"]');
    const notaInput = document.querySelector('.cadastroNota input[type="number"]');

    const nome = nomeInput.value.trim();
    const nota = parseFloat(notaInput.value);

    if (nome && !isNaN(nota)) {
        alunos.push({nome: nome, nota: nota});
        exibirLista(alunos);
        nomeInput.value = "";
        notaInput.value = "";
    } else {
        alert("Preencha todos os campos")
    }
}

function mostrarTodos() {
    exibirLista(alunos);
}

function filtrarAprovados() {
    const aprovados = alunos.filter(alunos => alunos.nota >= 7);
    exibirLista(aprovados);
}

document.addEventListener('DOMContentLoaded', () => {
    const botaoRegistrar = document.querySelector('.botaoEnviar');
    if (botaoRegistrar) {
        botaoRegistrar.addEventListener('click', registraralunos);
    }

    document.getElementById('btnMostrarTodos')?.addEventListener('click', mostrarTodos);
    document.getElementById('btnFiltrarTodos')?.addEventListener('click', filtrarAprovados);

    exibirLista(alunos);
});