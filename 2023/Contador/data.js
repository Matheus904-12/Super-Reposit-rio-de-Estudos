var data = new Date().getMonth()+2;
console.log(data)

var relogio = setInterval(function () {
    let horas = new Date().getHours();
    let minutos = new Date().getMinutes();
    let segundos = new Date().getSeconds();
    console.log(`${horas}:${minutos}:${segundos}`)
}, 1000);