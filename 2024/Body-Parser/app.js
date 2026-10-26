const express = require('express')
const bodyParser = require('body-parser')

const app = express(); // Mova a declaração do 'app' para o início

const books = [{
        bookName: "Dom Casmurro",
        bookAuthor: "Machado de Assis",
        bookPages: 520,
        bookPrice: 250,
        bookState: "disponível"
    },
    {
        bookName: "Os Miseráveis",
        bookAuthor: "Victor Hugo",
        bookPages: 410,
        bookPrice: 240,
        bookState: "disponível"
    }
]

app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", function (req, res) {
    res.render("home", {
        data: books
    })
})

app.post("/", (req, res) => {
    const inputBookName = req.body.bookName
    const inputBookAuthor = req.body.bookAuthor
    const inputBookPages = req.body.bookPages
    const inputBookPrice = req.body.bookPrice

    books.push({
        bookName: inputBookName,
        bookAuthor: inputBookAuthor,
        bookPages: inputBookPages,
        bookPrice: inputBookPrice,
        bookState: "Disponível"
    })

    res.render("home", {
        data: books
    })
})

app.post('/emprestar', (req, res) => {
    var requestedBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName == requestedBookName) {
            book.bookState = "Indisponível";
        }
    })
    res.render("home", {
        data: books
    })
})

app.post('/devolver', (req, res) => {
    var requestedBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName == requestedBookName) {
            book.bookState = "Disponível";
        }
    })
    res.render("home", {
        data: books
    })
})

app.post('/deletar', (req, res) => {
    var requestedBookName = req.body.bookName;
    var j = 0;
    books.forEach(book => {
        j = j + 1;
        if (book.bookName == requestedBookName) {
            books.splice((j - 1), 1)
        }
    })
    res.render("home", {
        data: books
    })
})

app.listen(3000, (req, res) => {
    console.log("Servidor rodando na porta 3000")
})
