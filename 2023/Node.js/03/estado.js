let estado = "";

function setEstado(e) {
    estado = e;
}

function getEstado() {
    return estado;
}

module.exports = { setEstado, getEstado };
