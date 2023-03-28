const express = require('express');
const router = express.Router();
const Prompt = require('../models/Prompt');

router.get('/', (req, res) => {
    Prompt.findAll().then(prompts => {
        res.send(prompts);
    }).catch(error => {
        res.send('Error: ' + error);
    })
});

router.post('/new', (req, res) => {
    
    let {inicio, prompt} = req.body;
    let realPrompt = ''

    
    if(typeof(prompt) == 'string'){
        realPrompt = `${inicio*12}: ${prompt}`;
    }
    else{
        // Recebe todos os prompts e os transforma em um único prommpt de entrada pra API
        for(let i = 0; i < prompt.length; i++){
            realPrompt += `${inicio[i]*12}: ${prompt[i]} | `;
        }
    }
    
    console.log(realPrompt);
    Prompt.create({
        prompt: realPrompt
    })
    .then(() => {
        res.redirect('/'); 
    }).catch(error => {
        res.send('Error: ' + error);
    })
});

module.exports = router;