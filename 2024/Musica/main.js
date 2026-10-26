let tasks = [];

// Carrega as tarefas salvas no localStorage ao iniciar o site
document.addEventListener('DOMContentLoaded', function () {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        tasks.push(taskInput.value.trim());

        // Salva as tarefas no localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        renderTasks();
        taskInput.value = '';
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);

    // Atualiza as tarefas no localStorage após excluir uma tarefa
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <span>${task}</span>
            <button onclick="deleteTask(${index})">Excluir</button>
        `;
        taskList.appendChild(taskElement);
    });
}
