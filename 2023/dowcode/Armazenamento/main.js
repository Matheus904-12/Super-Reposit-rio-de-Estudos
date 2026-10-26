const form = document.querySelector("#form")
const tarefaInput = document.querySelector("#tarefa-input")
const tarefaLista = document.querySelector("tarefa-Lista")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelaEdit = document.querySelector("#cancela-edit")
const buscarInput = document.querySelector("#buscar-input")
const limpar = document.querySelector("#limpar")
const filtroSelecao = document.querySelector("#filtro-selecao")

let antigoInput

const salvar= (text, done = 0, save = 1) => {
    const tarefa = document.createElement("div")
    tarefa.classList.add("tarefa")
    // Cria uma div no HTML com a classe tarefa

    const tarefaTitulo = document.createElement("h3")
    tarefaTitulo.innerText = text
    tarefa.appendChild(tarefaTitulo)
    //Dentro da div tarefa cria um h3
    
    const feita = document.createElement("button")
    feita.classList.add("feita")
    feita.innerHTML = 'Feita'
    tarefa.appendChild(feita)

    const editar = document.createElement("button")
    editar.classList.add("editar")
    editar.innerHTML = "Editar"
    tarefa.appendChild(editar)

    const apagar = document.createElement("button")
    apagar.classList.add("apagar")
    apagar.innerHTML = "Apagar"
    tarefa.appendChild(apagar)

    if (done) {
        tarefaTitulo.classList.add("done")
    }
    if (save) {
        saveTarefaLocalStorage({text, done;0})
    }
    tarefaslista.appendChild(tarefa)
    tarefaInput.value = ""
}

const trocaForms = () => {
    editForm.classList.toggle("hide")
    form.classList.t0ggle("hide")
    tarefaLista.classList.toggle("hide")
}

const updateTarefa = (text) => {
    const tarefas = document.querySelector("h3")

    tarefas.forEach((tarefa) => {
        let tarefaTitulo = tarefa.querySelector("h3")

        if(tarefaTitulo.innerHTML === antigoInput){
            tarefaTitulo.innerHTML = text

            updateTarefaLocalStorage
        }
        updateTarefaLocalStorage
    })

}

const pesquisar = (buscar) => {
    const tarefas = document.querySelectorAll(".tarefa")

    tarefas.forEach((tarefa) => {
        const tarefaTitulo = tarefa.querySelector("h3").innerText.toLowerCase()

        tarefa.style.display = "flex"
        console.log(tarefaTitulo)

        if(!tarefaTitulo.includes(buscar)) {
            tarefa.style.display = "none"
        }
    })
}

const filtrarTarefa = (filtrar) => {
    const tarefas = document.querySelectorAll(".tarefa")

    switch(filtrar) {
        case 'all':
            tarefas.forEach((tarefa) => (tarefa.style.display = "flex")
    }
}