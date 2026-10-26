import { Client, IntentsBitField, Message } from "discord.js";
import * as dotenv from "dotenv"
dotenv.config()

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

client.on('ready', () => {
    console.log("No Ar")
})

client.on('messageCreate', (message) => {
    if(message.author.bot) return

    if(message.content == "oi"){
        message.reply("Oi Math")
    } else if (!message.content.match(/[a-zA-Z]/)) {
        message.reply("Eu não entendi. Por favor, reformule sua pergunta.")
    } else {
        message.reply("Desculpe, não posso responder a isso.")
    }

    if(message.content == "Qual é a capital da França?"){
        message.reply("A capital da França é Paris.")
    }

    if(message.content == "Quem foi o primeiro presidente dos Estados Unidos?"){
        message.reply("O primeiro presidente dos Estados Unidos foi George Washington.")
    }

    if(message.content == "Como funciona a fotossíntese?"){
        message.reply("A fotossíntese é o processo pelo qual as plantas e outros organismos autotróficos convertem luz solar em energia química para produzir alimentos.")
    }

    if(message.content == "Qual é a fórmula química da água?"){
        message.reply("A fórmula química da água é H2O, o que significa que uma molécula de água é composta por dois átomos de hidrogênio e um átomo de oxigênio.")
    }

    if(message.content == "Quem escreveu 'Romeu e Julieta'?"){
        message.reply("Romeu e Julieta foi escrito por William Shakespeare.")
    }

    if(message.content == "Qual é a velocidade da luz?"){
        message.reply("A velocidade da luz no vácuo é aproximadamente 299.792.458 metros por segundo (aproximadamente 300 mil quilômetros por segundo).")
    }

    if(message.content == "Quem pintou a Mona Lisa?"){
        message.reply("A Mona Lisa foi pintada por Leonardo da Vinci.")
    }

    if(message.content == "O que é a Teoria da Relatividade?"){
        message.reply("A Teoria da Relatividade é uma teoria desenvolvida por Albert Einstein que descreve como o espaço, o tempo e a gravidade estão interconectados.")
    }
})


client.login(process.env.TOKEN)
