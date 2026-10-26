const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const { setNome, getNome } = require('./nome');
const { setIdade, getIdade } = require('./idade');
const { setEstado, getEstado } = require('./estado');

function registrar() {
    rl.question('Digite seu nome: ', (n) => {
        setNome(n);
        rl.question('Digite seu estado: ', (e) => {
            setEstado(e);
            console.log('Registro efetuado com sucesso!');
            menu();
        });
    });
}

function editarNome() {
    rl.question(`Nome atual: ${getNome()}. Digite o novo nome: `, (n) => {
        setNome(n);
        console.log('Nome atualizado com sucesso!');
        menu();
    });
}

function editarIdade() {
    rl.question(`Idade atual: ${getIdade()}. Digite uma nova idade: `, (i) => {
        setIdade(i);
        console.log('Idade atualizada com sucesso!');
        menu();
    });
}

function editarEstado() {
    rl.question(`Estado atual: ${getEstado()}. Digite o novo estado: `, (e) => {
        setEstado(e);
        console.log('Estado atualizado com sucesso!');
        menu();
    });
}

function mostrarRegistro() {
    console.log(`Nome: ${getNome()}, Estado: ${getEstado()}`);
    menu();
}

function menu() {
    console.log('\nMenu:');
    console.log('1. Registrar');
    console.log('2. Editar Nome');
    console.log('3. Editar Idade')
    console.log('4. Editar Estado');
    console.log('5. Mostrar Registro');
    console.log('6. Sair');

    rl.question('Escolha uma opção: ', (opcao) => {
        switch(opcao) {
            case '1':
                registrar();
                break;
            case '2':
                editarNome();
                break;
            case '3':
                editarEstado();
                break;
            case '4':
                editarIdade();
                break;    
            case '5':
                mostrarRegistro();
                break;
            case '6':
                rl.close();
                break;
            default:
                console.log('Opção inválida. Tente novamente.');
                menu();
        }
    });
}

menu();
