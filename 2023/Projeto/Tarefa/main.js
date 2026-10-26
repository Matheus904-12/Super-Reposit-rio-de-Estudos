// Selecionar o formulário de tarefas
const form = document.querySelector('.form');

// Seleciona o campo de entrada de tarefas
const input = document.getElementById('input');

// Seleciona a lista de tarefas
const lista = document.getElementById('lista');

// Cria uma matriz vazia para armazenar as tarefas
let todos = [];

// Função para mostrar as tarefas da lista
function listarTarefas() {
    lista.innerHTML = '';

    // Loop para as tarefas, cria um elemento de lista para cada uma
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];

        // Cria um elemento de lista, um elemento span e um botão para cada tarefa
        const li = document.createElement('li');
        const span = document.createElement('span');
        const button = document.createElement('button');

        // Define o texto da tarefa no elemento span
        span.innerHTML = todo;

        // Define o texto do botão de exclusão e adiciona um ouvinte de eventos para remover a tarefa da matriz e mostrar a lista novamente
        button.innerHTML = 'Excluir';
        button.addEventListener('click', function () {
            todos.splice(i, 1);
            listarTarefas();
        });

        // Adiciona o elemento span e o botão ao elemento li
        li.appendChild(span);
        li.appendChild(button);

        // Adiciona o elemento li na lista de tarefas
        lista.appendChild(li);
    }
}

// Adiciona um ouvinte de eventos ao formulário para detectar quando o usuário envia uma nova tarefa
form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtém o texto da tarefa e remove espaços em branco extra
    const texto = input.value.trim();

    // Retorna se a nova tarefa não tiver nenhum texto
    if (texto.length === 0) {
        return;
    }

    // Adiciona a nova tarefa na matriz e limpa o input e mostra a lista
    todos.push(texto);
    input.value = '';
    listarTarefas();
});

// Carrega a lista de tarefas quando a página é carregada.
listarTarefas();