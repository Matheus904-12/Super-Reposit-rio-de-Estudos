
const express = require('express');
const Calculadora = require('../model/calculo');
const resultado = express.Router();

resultado.post('/', (req, res) => {
    const { cateto1, cateto2 } = req.body;
    const hipotenusa = Calculadora.Hipotenusa( //model
        parseFloat(cateto1), parseFloat(cateto2));
    res.redirect(`/resultado.html?hipotenusa=${hipotenusa}`); //view
    //res.sen(À hipotenusa é: ${hipotenusa}`); Resposta sem página
});

module.exports = resultado;