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
    
    let {inicio, prompt, fim} = req.body;
    
    let realPrompt = ''
    let maxFrames = '';
    
    let angle = '';
    let zoom = '';
    let translationX = '';
    let translationY = '';

    console.log('re.body: ', req.body);

    if(typeof(prompt) == 'string'){
        realPrompt = `${inicio*12}: ${prompt}`;
        maxFrames  = fim*12;

        /*for (let index = 2; index < Object.keys(req.body).length; index++) {
            const element = Object.keys(req.body)[index];
            
            if(element.substring(0, 6) == 'angulo'){
                angle += `${inicio*12}:(${req.body[element]})`;
            }
            else if(element.substring(0, 4) == 'zoom'){
                zoom += `${inicio*12}:(${req.body[element]})`;
            }
            else if(element.substring(0, 5) == 'eixoX'){
                translationX += `${inicio*12}:(${req.body[element]})`;
            }
            else if(element.substring(0, 5) == 'eixoY'){
                translationY += `${inicio*12}:(${req.body[element]})`;
            }
    
            console.log('angle>', angle, zoom, translationX, translationY);
        }*/
    }
    else{
        // Recebe todos os prompts e os transforma em um único prommpt de entrada pra API
        for(let i = 0; i < prompt.length; i++){
            realPrompt += `${inicio[i]*12}: ${prompt[i]} | `;
            
            if (i == prompt.length - 1) {
                maxFrames += fim[i]*12;
            }
        }

        realPrompt = realPrompt.substring(0, realPrompt.length - 3);
    }

    console.log('realPrompt: ', realPrompt, 'maxFrames: ', maxFrames);

    const response = fetch(
        "https://api.replicate.com/v1/predictions", 
        {
            "body": `{"version": "e22e77495f2fb83c34d5fae2ad8ab63c0a87b6b573b6208e1535b23b89ea66d6", "input": {"max_frames": "${maxFrames}", "animation_prompts": "${realPrompt}", "fps": 12 }}`,
            "headers": {
                "Authorization": "Token ed6353364d7d83e774d4e31e9fe314613c5bc55c",
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