var data = new Date().getMonth()+2;
console.log(data)

var relogio = setInterval(function () {
    let horasRestantes = new Date().getHours();
    let minutosRestantes = new Date().getMinutes();
    let segundosRestantes = new Date().getSeconds();
    let diasRestantes = new Date().getDay();
    console.log(`Tempo restante até a próxima segunda-feira: ${diasRestantes} dias, ${horasRestantes} horas, ${minutosRestantes} minutos, ${segundosRestantes} segundos`);

}, 1000);