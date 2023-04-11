const express           = require('express');
const expressHandlebars = require('express-handlebars');
const app               = express();
const path              = require('path');
const db                = require('./db/connection');
const bodyParser        = require('body-parser');
const fetch = require('node-fetch');

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(bodyParser.urlencoded({extended: false}));


// Handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expressHandlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Path: db\connection.js
db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(error => {
    console.error('Unable to connect to the database:', error)
});

// rota pra pagina inicial - useless por enquanto. 
app.get('/', (req, res) => {
    res.render('index');
});

// rota para a página de output do video gerado pelo usuário
app.post('/output', (req, res) => {
    const {videoId} = req.body;
    console.log('videoId: ', videoId);

    const newResponse = fetch(`https://api.replicate.com/v1/predictions/${videoId}`, {
        "headers": {
        "Authorization": "Token ",
        "Content-Type": "application/json"
        }
    })

    newResponse.then(res => res.json())
    .then(data => {
        const {output} = data;
        console.log(data)
        res.render('output', {output});
    });
})

// rotas pras partes dos prompts, talvez seja valido colocar um "get' pra galeria de prompts + video
app.use('/prompts', require('./routes/prompts'));

app.get('/galeria', (req, res) => {
    res.render('galeria');
})

app.get('/:id', (req, res) => {
    const {id} = req.params;
    res.render('video', {id});
})