let nome = "";

function setNome(n) {
    nome = n;
}

function getNome() {
    return nome;
}

module.exports = { setNome, getNome };
