const form = document.querySelector('.login-form');

//select campos entrada usuario e senha
const usernameInput = form.querySelector('input[type="text"]');
// we id pelo tipo de input, usando form ao inves de document pra indicar qual classe ou dentro doq vai achar o input
const senhaInput = form.querySelector('input[type="password"]');

//detect qnd user clica em submit
form.addEventListener('submit', (event) => {
    //previne q a pag reload qnd form for enviado
    event.preventDefault();

    //usa trim() para remover espaços vazios antes ou dps de cada campo
    const usuario = usernameInput.value.trim();
    const senha = senhaInput.value.trim();

    //verif se tem campos vazios
    if (usuario === '' || senha === '') {
        alert('Por favor, preencha os campos.');
    }
    // verif se info ta correta
    else if (usuario === 'usuario' && senha === 'senha') {
        alert('bem-vindo')

        //redirect user pra outra pag dps login
        location.replace("/Tarefa/index.html", "_self")
    }
    else {
        alert('Usuário ou senha incorreto, tente novamente')
    }
});

// Para a página de cadastro

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.cadastro-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obter os valores dos campos
        const nome = document.querySelector('input[name="nome"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const senha = document.querySelector('input[name="senha"]').value;
        const confirmarSenha = document.querySelector('input[name="confirmarSenha"]').value;

        // Validar os campos
        if (nome === '' || email === '' || senha === '' || confirmarSenha === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem. Por favor, tente novamente.');
            return;
        }

        // Se todos os campos estiverem preenchidos e as senhas coincidirem
        // Você pode adicionar aqui o código para enviar os dados do formulário
        // para um servidor ou fazer qualquer outra ação necessária.

        alert('Cadastro realizado com sucesso!');
    });
});