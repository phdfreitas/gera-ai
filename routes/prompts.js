const express = require('express');
const router = express.Router();
const Prompt = require('../models/Prompt');
const fetch = require('node-fetch');

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

        realPrompt = realPrompt.substring(0, realPrompt.length - 3);
    }
    
    const response = fetch(
        "https://api.replicate.com/v1/predictions", 
        {
            "body": `{"version": "e22e77495f2fb83c34d5fae2ad8ab63c0a87b6b573b6208e1535b23b89ea66d6", "input": {"max_frames": 130, "animation_prompts": "${realPrompt}", "fps": 12 }}`,
            "headers": {
                "Authorization": "Token ",
                "Content-Type": "application/json"
            },
            "method": "POST"
    });
    
    response.then(res => res.json())
    .then(data => {  
        const {id} = data;
        console.log('data: ', data);
        console.log('ID: ', id);
        res.redirect(`/${id}`);
    }).catch(error => {
        res.send('Error: ' + error);
    })
});

module.exports = router;