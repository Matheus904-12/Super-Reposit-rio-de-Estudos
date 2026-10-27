const discord = require("discord.js")
const cliente = new discord.Cliente()

cliente.on("ready", () => {
    console.log("logado")
})

cliente.on('message', (message) => {
    if (message.content === "oi"){
        message.reaply("Oi Math")
    }
})

cliente,login('REMOVIDO_TOKEN')