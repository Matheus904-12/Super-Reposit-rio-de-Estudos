//https://viacep..com.br/ws/${seu_cep_aqui}/json
//change : busca com auto preechimento conforme o dado inserido

const cep = document.getElementById("cep")

cep.addEventListener("change", (evento) => {
    let cepUsuario = evento.target
    buscaCEP(cepUsuario.value)
})

async function buscaCEP(cepUsuario) {
    
    let erroCep = document.getElementById("erro")
    erroCep.innerHTML = ""

    try {
        let consultaCEP = await fetch(`https://viacep.com.br/ws/${cepUsuario}/json`)
        let consultaCEPJson = await consultaCEP.json()
        console.log(consultaCEPJson);

        if (consultaCEPJson.erro) {
            throw Error ("CEP Inexistente, adicione outro valor!")
        }

        preencheCampos(consultaCEPJson)
        console.log("CEP Encontrado!")
    }
    catch {
        erroCep.innerHTML = "<p>CEP Inválido, insira o CEP novamente!</p>"
        apagarCampos()
    }
}

function preencheCampos(cepJson) {
    console.log(cepJson.logradouro);
    console.log(cepJson.bairro);
    console.log(cepJson.cidade);
    console.log(cepJson.estado);

    let rua = document.getElementById("rua")
    let bairro = document.getElementById("bairro")
    let cidade = document.getElementById("cidade")
    let estado = document.getElementById("estado")

    rua.value = cepJson.logradouro;
    bairro.value = cepJson.bairro;
    cidade.value = cepJson.localidade;
    estado.value = cepJson.uf;
}

function apagarCampos() {

    let rua = document.getElementById("rua")
    let bairro = document.getElementById("bairro")
    let cidade = document.getElementById("cidade")
    let estado = document.getElementById("estado")

    rua.value = ""
    bairro.value = ""
    cidade.value = ""
    estado.value = ""
}