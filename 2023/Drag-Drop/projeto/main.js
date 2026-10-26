let raiz = document.getElementById("raiz");

raiz.addEventListener('dragstart', iniciarArrasto);
raiz.addEventListener('dragover', permitirSoltar);
raiz.addEventListener('drop', soltarTarefa);

class ListaDeTarefas{
    constructor(local, titulo = "lista de tarefas"){
        this.local = local;
        this.titulo = titulo;
        this.arrayDeCartoes = [];
        this.renderizar();
    }

    adicionarTarefa(){
        let texto = this.input.value;
    let cartao = new Cartao(texto, this.div, this);
    this.arrayDeCartoes.push(cartao);
    this.div.insertBefore(cartao.cartao, this.div.lastElementChild);
}

    renderizar(){
        this.criarElementoListaDeTarefas();
        this.local.append(this.elementoListaDeTarefas);
    }

    criarElementoListaDeTarefas(){
        this.h2 = document.createElement('h2');
        this.h2.innerText = this.titulo;
        this.input = document.createElement('input');
        this.input.classList.add("comentario");
        this.botao = document.createElement('button');
        this.botao.innerText = 'Adicionar';
        this.botao.classList.add("btn-salvar");
        this.botao.id = "botao-tarefa";
        this.div = document.createElement('div');
        this.elementoListaDeTarefas = document.createElement('div');

        this.botao.addEventListener('click', ()=>{
            if(this.input.value != ""){
                this.adicionarTarefa.call(this);
                this.input.value = "";
            }
        });

        this.elementoListaDeTarefas.append(this.h2);
        this.elementoListaDeTarefas.append(this.input);
        this.elementoListaDeTarefas.append(this.botao);
        this.elementoListaDeTarefas.append(this.div);
        this.elementoListaDeTarefas.classList.add("listaDeTarefas");
    }

    // Adicione esta função para tornar os cartões arrastáveis
    tornarCartoesArrastaveis() {
        let cartoes = this.div.querySelectorAll('.cartao');

        cartoes.forEach(cartao => {
            cartao.draggable = true;

            cartao.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', null);
                this.cartaoArrastado = cartao;
            });

            cartao.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            cartao.addEventListener('drop', (e) => {
                if (this.cartaoArrastado !== cartao) {
                    this.div.insertBefore(this.cartaoArrastado, cartao);
                }
            });
        });
    }
}

class Cartao{
    constructor(texto, local, listaDeTarefas){
        this.local = local;
        this.listaDeTarefas = listaDeTarefas;
        this.estado = {
            texto: texto,
            descricao: "Clique para escrever uma descrição...",
            comentarios: []
        }
        this.renderizar();
    }

    
    renderizar(){
        this.cartao = document.createElement('div');
        this.cartao.classList.add("cartao");
        this.cartao.addEventListener('click', (e)=>{
            if(e.target != this.botaoExcluir){
                this.mostrarMenu.call(this);
            }
        });

        this.p = document.createElement('p');
        this.p.innerText = this.estado.texto;

        this.botaoExcluir = document.createElement('button');
        this.botaoExcluir.innerText = "X";
        this.botaoExcluir.addEventListener('click', ()=>{
            this.excluirCartao.call(this);
        });

        this.cartao.append(this.p);
        this.cartao.append(this.botaoExcluir);
        
        this.local.append(this.cartao);
    }

    excluirCartao(){
        this.cartao.remove();
        let i = this.listaDeTarefas.arrayDeCartoes.indexOf(this);
        this.listaDeTarefas.arrayDeCartoes.splice(i,1);
    }

    mostrarMenu(){

        this.menu = document.createElement("div");
        this.menuContainer = document.createElement("div");
        this.menuTitulo = document.createElement("div");
        this.menuDescricao = document.createElement("div");
        this.entradaComentarios = document.createElement("input");
        this.botaoComentarios = document.createElement('button');
        this.menuComentarios = document.createElement("div");


        this.menu.className = "menu";
        this.menuContainer.className = "menuContainer";
        this.menuTitulo.className = "menuTitulo";
        this.menuDescricao.className = "menuDescricao";
        this.menuComentarios.className = "menuComentarios";
        this.entradaComentarios.className = "entradaComentarios comentario";
        this.botaoComentarios.className = "botaoComentarios btn-salvar";

        this.botaoComentarios.innerText = "Adicionar";
        this.entradaComentarios.placeholder = "Escreva um comentário...";

        this.menuContainer.addEventListener('click', (e)=>{
            console.log(e.target);
            if(e.target.classList.contains("menuContainer")){
                this.menuContainer.remove();
            }
        });
        
        this.botaoComentarios.addEventListener('click', ()=>{
            if(this.entradaComentarios.value != ""){
            this.estado.comentarios.push(this.entradaComentarios.value);
            this.renderizarComentarios();
            this.entradaComentarios.value = "";
            }
        })

        this.menu.append(this.menuTitulo);
        this.menu.append(this.menuDescricao);
        this.menu.append(this.entradaComentarios);
        this.menu.append(this.botaoComentarios);
        this.menu.append(this.menuComentarios);
        this.menuContainer.append(this.menu);
        raiz.append(this.menuContainer);

        this.descricaoEditavel = new TextoEditavel(this.estado.descricao, this.menuDescricao, this, "descricao", "textarea");
        this.tituloEditavel = new TextoEditavel(this.estado.texto, this.menuTitulo, this, "texto", "input");
        
        this.renderizarComentarios();
    }

    renderizarComentarios(){

        let comentariosDOMAtuais = Array.from(this.menuComentarios.childNodes);

        comentariosDOMAtuais.forEach(comentarioDOM =>{
            comentarioDOM.remove();
        });

        this.estado.comentarios.forEach(comentario =>{
            new Comentario(comentario, this.menuComentarios, this);
        });
    }
}



class TextoEditavel{
    constructor(texto, local, cartao, propriedade, tipoDeEntrada){
        this.texto = texto;
        this.local = local;
        this.cartao = cartao;
        this.propriedade = propriedade;
        this.tipoDeEntrada = tipoDeEntrada;
        this.renderizar();
    }

    renderizar(){
        this.div = document.createElement("div");
        this.p = document.createElement("p");

        this.p.innerText = this.texto;

        this.p.addEventListener('click', ()=>{
            this.mostrarAreaDeTextoEditavel.call(this);
        });

        this.div.append(this.p);
        this.local.append(this.div);
    }

    mostrarAreaDeTextoEditavel(){
        let textoAntigo = this.texto;

        this.entrada = document.createElement(this.tipoDeEntrada);
        this.botaoSalvar = document.createElement("button");

        this.p.remove();
        this.entrada.value = textoAntigo;
        this.botaoSalvar.innerText = "Salvar";
        this.botaoSalvar.className = "btn-salvar";
        this.entrada.classList.add("comentario");

        this.botaoSalvar.addEventListener('click', ()=>{
            this.texto = this.entrada.value;
            this.cartao.estado[this.propriedade] = this.entrada.value;
            if(this.propriedade == "texto"){
                this.cartao.p.innerText = this.entrada.value;
            }
            this.div.remove();
            this.renderizar();
        });

        function clicarBotaoSalvar(evento, objeto){
            if (evento.keyCode === 13) {
                evento.preventDefault();
                objeto.botaoSalvar.click();
              }
        }

        this.entrada.addEventListener("keyup", (e)=>{
            if(this.tipoDeEntrada == "input"){
                clicarBotaoSalvar(e, this);
            }
        });

        this.div.append(this.entrada);

        if(this.tipoDeEntrada == "textarea"){
            this.div.append(this.botaoSalvar);
        }

        this.entrada.select();
    }

}

class Comentario{
    constructor(texto, local, cartao){
        this.texto = texto;
        this.local = local;
        this.cartao = cartao;
        this.renderizar();
    }

    renderizar(){
        this.div = document.createElement('div');
        this.div.className = "comentario";
        this.div.innerText = this.texto;
        
        this.local.append(this.div);
    }
}

//-------------main------------

// Adicione a funcionalidade de arrastar e soltar usando SortableJS
let sortableColunas = new Sortable(document.getElementById('raiz'), {
    group: 'colunas',
    draggable: '.coluna',
    animation: 150,
    handle: '.coluna-header',
    onEnd: function(evt) {
        console.log('Coluna movida:', evt.from, '=>', evt.to);
    }
});

let sortableCartoes = new Sortable(raiz, {
    group: 'cartoes',
    draggable: '.cartao',
    animation: 150,
    onEnd: function(evt) {
        console.log('Cartão movido:', evt.from, '=>', evt.to);
    }
});

let adicionarNovaListaInput = document.getElementById("adicionarNovaListaInput");
let adicionarNovaListaBotao = document.getElementById("adicionarNovaListaBotao");

adicionarNovaListaBotao.addEventListener('click', () => {
    if (adicionarNovaListaInput.value.trim() !== "") {
        new ListaDeTarefas(raiz, adicionarNovaListaInput.value);
        adicionarNovaListaInput.value = "";
    }
});

let listaDeTarefas1 = new ListaDeTarefas(raiz);
let listaDeTarefas2 = new ListaDeTarefas(raiz);
let listaDeTarefas3 = new ListaDeTarefas(raiz);

let dragged; // Referência ao elemento arrastado

function iniciarArrasto(event) {
    dragged = event.target;
    event.dataTransfer.setData("text/plain", null);
}

function permitirSoltar(event) {
    event.preventDefault();
}

function soltarTarefa(event) {
    event.preventDefault();
    if (event.target.classList.contains("cartao")) {
        event.target.appendChild(dragged);
    }
}


// Adicione a funcionalidade de arrastar e soltar usando SortableJS
colunas.forEach(coluna => {
    new Sortable(coluna.querySelector('ul'), {
        group: 'tarefas',
        animation: 150,
        draggable: '.cartao',
        onEnd: function(evt) {
            console.log(evt.from, '=>', evt.to);
        }
    });
});


let adicionarCartaoBotao = document.getElementById("adicionarCartao");

function adicionarCartao(event) {
    event.preventDefault();

    let novoCartao = new Cartao("Novo Cartão", listaDeTarefas1.div, listaDeTarefas1);
    listaDeTarefas1.arrayDeCartoes.push(novoCartao);
    listaDeTarefas1.div.insertBefore(novoCartao.cartao, listaDeTarefas1.div.lastElementChild);
}

adicionarCartaoBotao.addEventListener('click', adicionarCartao);
