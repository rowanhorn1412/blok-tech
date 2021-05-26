// require packages
const express = require('express');
const app = express();
const port = 3000;

// Middleware set-up
app.set('view engine', 'ejs');
app.set('views', 'view');
app.use(express.static('static'))


app.get('/', (req, res) => {
    res.send('Hello world!')
});

app.get('/movies', (req, res) => {
    res.send('<h1>MOVIES</h1>')
});

app.get('/', (req, res) => {
    res.send('<h1>PETS</h1>')
});

app.use(function (req, res, next) {
    res.status(404).send("<h1>nope 404..</h1>")
});

// Server deploying on https://localhost:
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});

