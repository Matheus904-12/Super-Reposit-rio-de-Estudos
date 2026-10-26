
const express = require('express');
const Calculadora = require('./model/calculadora');
const resultado = express.Router();

resultado.post('/', (req, res) => {
    const { numero1, numero2 } = req.body;
    const mmc = Calculadora.MMC(
        parseFloat(numero1), parseFloat(numero2)
    );
    res.redirect(`/resultado.html?mmc=${mmc}`);
});

module.exports = resultado;
