class Contatos {
    constructor(
        nome, email, telefone, mensagem
    ) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.mensagem = mensagem
    }
}

class GerenciadorContatos {
    constructor() {
        //inicializa lista de contatos vazia
        this.contatos = []
    }

    adicionarContato(contato) {
        //add contato a lista
        this.contatos.push(contato)
    }

    exibirContatos() {
        //obtem lista de contatos
        const listaContatos = document.getElementById('contato-lista');

        //limpa lista de contatos
        listaContatos.innerHTML = '';

        //
        for (const contato of this.contatos) {
            const li = document.createElement('li');
            li.innerHTML = `${contato.nome} - ${contato.email} - ${contato.telefone}: ${contato.mensagem}`;
            listaContatos.appendChild(li);
        }
    }
}

const gerenciadorContatos = new GerenciadorContatos();

//cria elements necessarios
const contatoForm = document.getElementById('contato-form');
const nomeF = document.getElementById('nome');
const emailF = document.getElementById('email');
const telefoneF = document.getElementById('telefone');
const mensagemF = document.getElementById('mensagem');
const mostrarContatos = document.getElementById('mostrar-contatos');
const ocultarContatos = document.getElementById('ocultar-contatos');
const listaContatos = document.getElementById('contato-lista');

contatoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = nomeF.value;
    const email = emailF.value;
    const telefone = telefoneF.value;
    const mensagem = mensagemF.value;

    //Criando objeto  da classe Contato
    const contato = new Contatos(nome, email, telefone, mensagem);

    gerenciadorContatos.adicionarContato(contato);

    nomeF.value = '';
    emailF.value = '';
    telefoneF.value = '';
    mensagemF.value = '';
});

//add manipulador de eventos para o botao exibir a lista de contatos
mostrarContatos.addEventListener('click', () => {
    gerenciadorContatos.exibirContatos();
    listaContatos.style.display = 'block';
})

ocultarContatos.addEventListener('click', ()=>{
    listaContatos.style.display = 'none';
})