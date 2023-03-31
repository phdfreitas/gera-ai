const express           = require('express');
const expressHandlebars = require('express-handlebars');
const app               = express();
const path              = require('path');
const db                = require('./db/connection');
const bodyParser        = require('body-parser');

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

// rotas pras partes dos prompts, talvez seja valido colocar um "get' pra galeria de prompts + video
app.use('/prompts', require('./routes/prompts'));

app.get('/galeria', (req, res) => {
    res.render('galeria');
})