const express       = require('express');
const app           = express();
const db            = require('./db/connection');
const bodyParser    = require('body-parser');

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(bodyParser.urlencoded({extended: false}));

// Path: db\connection.js
db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(error => {
    console.error('Unable to connect to the database:', error)
});

// rota pra pagina inicial - useless por enquanto. 
app.get('/', (req, res) => {
    res.send('Hello World');
});

// rotas pras partes dos prompts, talvez seja valido colocar um "get' pra galeria de prompts + video
app.use('/prompts', require('./routes/prompts'));