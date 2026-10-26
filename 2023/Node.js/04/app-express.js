let express = require("express")
let app = express()

app.get('/', function(req, res){
    // req = requisição (o que o usuario pede) ---- res = resposta (o que respondemos para ele)
    res.send("Meu server")
})

app.listen(3000, function() {
    console.log("funciona")
})