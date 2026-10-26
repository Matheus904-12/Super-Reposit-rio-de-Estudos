let http = require("http")
// chama o modulo http do Node, por ser um modulon ativo do node, não é necessário indicar com "./"

// usamos o createServer para abrir o servidor para nos comuncarmos com o cliente
http.createServer(function(req, res){
    res.end("Meu server HTTP")
}).listen(3000)
console.log("Está funcionando")