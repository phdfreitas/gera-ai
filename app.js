const express           = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser        = require('body-parser');
const path              = require('path');
const fetch             = require('node-fetch');

const app               = express();

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

// rota pra pagina inicial
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.post('/dashboard', (req, res) => {
    
    console.log(req.body);

    let {linkTokenReplicate} = req.body;
    let {inicio, prompt, fim} = req.body;
    let {anguloFinal, zoomFinal, eixoXFinal, eixoYFinal} = req.body;

    let realPrompt = ''
    let maxFrames = 0;

    let angleApi = '';
    let zoomApi = '';
    let translationXApi = '';
    let translationYApi = '';

    let opcoesExtrasGerais = false;
    
    if (anguloFinal != 0 && zoomFinal != 0 && eixoXFinal != 0 && eixoYFinal != 0) {
        angleApi = anguloFinal;
        zoomApi = zoomFinal;
        translationXApi = eixoXFinal;
        translationYApi = eixoYFinal;
        opcoesExtrasGerais = true;
    }
    
    if(typeof(prompt) == 'string'){
        realPrompt = `${inicio*12}: ${prompt}`;
        maxFrames  = fim*12;

        if (!opcoesExtrasGerais) {

            let {angulo, zoom, eixoX, eixoY} = req.body;
            angleApi = angulo;
            zoomApi = zoom;
            translationXApi = eixoX;
            translationYApi = eixoY;
        }
    }
    else{
        let passoPromptsExtras = 3;

        // Recebe todos os prompts e os transforma em um único prommpt de entrada pra API
        for(let i = 0; i < prompt.length; i++){
            realPrompt += `${inicio[i]*12}: ${prompt[i]} | `;
            
            let anguloAtual = Object.values(req.body)[passoPromptsExtras++];
            let zoomAtual   = Object.values(req.body)[passoPromptsExtras++];
            let eixoXAtual  = Object.values(req.body)[passoPromptsExtras++];
            let eixoYAtual  = Object.values(req.body)[passoPromptsExtras++];
            
            if(!opcoesExtrasGerais){
                angleApi += `${inicio[i]*12}:(${anguloAtual}) | `;
                zoomApi += `${inicio[i]*12}:(${zoomAtual}) | `;
                translationXApi += `${inicio[i]*12}:(${eixoXAtual}) | `;
                translationYApi += `${inicio[i]*12}:(${eixoYAtual}) | `;
            }

            if (i == prompt.length - 1) {
                maxFrames += fim[i]*12;
            }
        }
        
        realPrompt = realPrompt.substring(0, realPrompt.length - 3);
        angleApi = angleApi.substring(0, angleApi.length - 3);
        zoomApi = zoomApi.substring(0, zoomApi.length - 3);
        translationXApi = translationXApi.substring(0, translationXApi.length - 3);
        translationYApi = translationYApi.substring(0, translationYApi.length - 3);
    }

    console.log('realPrompt: ', realPrompt, 'maxFrames: ', maxFrames);
    console.log('angleApi: ', angleApi, '\nzoomApi: ', zoomApi, '\ntranslationXApi: ', translationXApi, '\ntranslationYApi: ', translationYApi);

    const response = fetch(
        "https://api.replicate.com/v1/predictions", 
        {
            "body": `{"version": "e22e77495f2fb83c34d5fae2ad8ab63c0a87b6b573b6208e1535b23b89ea66d6", "input": {"max_frames": ${maxFrames}, "animation_prompts": "${realPrompt}", "fps": 12, "angle": "${angleApi}", "translation_x": "${translationXApi}", "translation_y": "${translationYApi}"}}`,
            "headers": {
                "Authorization": `Token ${linkTokenReplicate}`,
                "Content-Type": "application/json"
            },
            "method": "POST"
    });
    
    response.then(res => res.json())
    .then(data => {
        console.log(data);
        res.render('dashboard', {data});
    }).catch(error => {
        res.send('Error: ' + error);
    })
});

// rota para a página de output do video gerado pelo usuário
app.post('/output', (req, res) => {
    const {idVideoReplicate, linkReplicateIdVideoReplicate} = req.body;

    const newResponse = fetch(`https://api.replicate.com/v1/predictions/${idVideoReplicate}`, {
        "headers": {
        "Authorization": `Token ${linkReplicateIdVideoReplicate}`,
        "Content-Type": "application/json"
        }
    })
    
    newResponse.then(res => res.json())
    .then(data => {
        console.log(data);
        res.render('dashboard', {data});
    });
})

app.get('/galeria', (req, res) => {
    res.render('galeria');
})

app.get('/:id', (req, res) => {
    const {id} = req.params;
    res.render('video', {id});
})

//c0bf7e75c30de553867592c1d8c50e771d18e7a9