/*Player de música*/
let wavesurfer;
(function handleAudioPlayer(){
    let playPauseButton = document.querySelector("#playPauseButton");
    let stopButton = document.querySelector("#stopButton");
    let waveform = document.querySelector("#waveform");

    let player = document.querySelector("#player");
    if(localStorage.getItem("music") == null && player){
        player.style.display = "none";
    }

    if(waveform){
        wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: '#8D8D8D',
            progressColor: '#fff',
            barWidth: 3,
            barHeight: 3,
            responsive: true,
            barRadius: 3,
            hideScrollbar: true,
        });

        playPauseButton.addEventListener("click", function(){
            wavesurfer.playPause();
        });

        stopButton.addEventListener("click", function(){
            wavesurfer.stop();
        });

        wavesurfer.on('finish', function () {
            wavesurfer.stop();
        });
    }
})()

const novoPrompt = () => {
    
    let inputsBasicos = document.getElementById("inputsBasicos");

    let novaDiv = document.createElement("div");
    novaDiv.setAttribute("class", "form-group");
    novaDiv.innerHTML = inputsBasicos.innerHTML;
    
    /**/    
    let totalSpan = document.querySelectorAll("span").length;
    let span = document.getElementById("configuracoesExtras");
    
    let divIcones = document.createElement("div");
    divIcones.setAttribute("class", "iconesConfiguracoesExtras");

    let span1 = document.createElement("span");
    span1.innerHTML = span.innerHTML;
    span1.id = "configuracoesExtras" + (totalSpan + 1);
    span1.setAttribute("class", "configuracoesExtrasStyle");
    span1.childNodes[1].setAttribute("id", "configExtras" + (totalSpan + 1));
    span1.childNodes[1].setAttribute("class", "configExtrasStyle");
    span1.childNodes[1].setAttribute("onclick", "configuracoesExtras(this)");

    span1.childNodes[3].setAttribute("id", "excluirPrompt" + (totalSpan + 1));
    span1.childNodes[3].setAttribute("class", "excluirPromptStyle");
    divIcones.appendChild(span1);


    novaDiv.appendChild(divIcones);
    /**/

    let inputExtras = document.querySelector("#inputsExtras");
    
    let novaDivInputExtras = document.createElement("div");
    novaDivInputExtras.id = "inputsExtras" + (totalSpan + 1);
    novaDivInputExtras.setAttribute("class", "inputsExtrasStyle");
    novaDivInputExtras.innerHTML = inputExtras.innerHTML;

    novaDivInputExtras.childNodes[3].setAttribute("id", "btnFechar" + (totalSpan + 1));
    novaDivInputExtras.childNodes[3].setAttribute("class", "btnFecharStyle");
    novaDivInputExtras.childNodes[3].setAttribute("onclick", "configuracoesExtras(this)");

    novaDivInputExtras.childNodes[5].childNodes[3].setAttribute("name", "angulo" + (totalSpan + 1));
    novaDivInputExtras.childNodes[7].childNodes[3].setAttribute("name", "zoom" + (totalSpan + 1));
    novaDivInputExtras.childNodes[9].childNodes[3].setAttribute("name", "eixoX" + (totalSpan + 1));
    novaDivInputExtras.childNodes[11].childNodes[3].setAttribute("name", "eixoY" + (totalSpan + 1));

    novaDiv.appendChild(novaDivInputExtras);

    let divFormGroup = document.createElement("div")
    divFormGroup.setAttribute("id", "form-group")
    divFormGroup.appendChild(novaDiv);

    let prompts = document.getElementById("promptsExtras")
    prompts.appendChild(divFormGroup);
}

(function handleMusic() {
    
    let rota = window.location.pathname;

    let inputAudioSource = document.querySelector("#inputAudioSource");
    if(inputAudioSource){
        document.querySelector("#inputAudioSource").addEventListener("change", function(){
            const fileReader = new FileReader();

            fileReader.addEventListener("load", function(){
                localStorage.setItem("music", fileReader.result);
                
                if (rota != "/") {
                    window.location.reload();     
                } 
                
            });
            fileReader.readAsDataURL(this.files[0]);
        });

        document.addEventListener("DOMContentLoaded", function(){
            if(localStorage.getItem("music")){
                wavesurfer.load(localStorage.getItem("music"));
            } 
        });
    }
})()

function configuracoesExtras(element) {
    
    let idValue = element.id.length < 12 ? element.id.substring(9) : element.id.substring(12);

    let inputsExtras = document.getElementById("inputsExtras" + idValue);
    inputsExtras.classList.toggle("show");
}

function configuracoesExtrasFechar(element){

    let pai = element.parentNode.parentNode
    if (pai.childNodes.length > 3) {
        pai.childNodes[8].classList.toggle("show");
    }
    else{
        pai.childNodes[1].classList.toggle("show");
    }
}

function excluirPrompt(element){
    let promptParaExcluir = element.parentNode.parentNode.parentNode.parentNode;
    
    if (promptParaExcluir.id == "form") {
        let naoPermiteExcluirPrimeiroPrompt = document.getElementById("naoPermiteExcluirPrimeiroPrompt");
        naoPermiteExcluirPrimeiroPrompt.classList.remove("displayNoneElement");

        setTimeout(() => {
            naoPermiteExcluirPrimeiroPrompt.classList.add("displayNoneElement");
        }, 3000);
    }
    else{
        promptParaExcluir.parentNode.removeChild(promptParaExcluir);
    }
}

function configuracoesExtrasGerais(){
    let inputsExtrasGerais = document.getElementById("inputsExtrasGerais");
    inputsExtrasGerais.classList.toggle("show");
}

function exibirLetraMusica(){
    let letraMusica = document.getElementById("divAreaLetraMusica");
    letraMusica.classList.toggle("show");
}

function exportarPrompt(){
    let promptsInicio = document.querySelectorAll("input[name='inicio']");
    let prompts = document.querySelectorAll("textarea[name='prompt']");

    let resultadoFinal = '{\n'
    
    prompts.forEach((element, index) => {
        if (index == prompts.length - 1) {
            resultadoFinal += `\t"${promptsInicio[index].value * 12}": "${element.value}"\n}`;
        }
        else{
            resultadoFinal += `\t"${promptsInicio[index].value * 12}": "${element.value}",\n`;
        }
    });

    let download = document.createElement("a");
    download.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(resultadoFinal));
    download.setAttribute("download", "prompt.txt");
    download.style.display = "none";
    document.body.appendChild(download);
    download.click();
    document.body.removeChild(download);
}

document.addEventListener("DOMContentLoaded", function(){
    let linkReplicate = document.querySelector("#resposta");
    let home = document.querySelector('.home');

    if (linkReplicate != "" && linkReplicate != null) {
        let btnRecuperarVideo = document.querySelector("#btnRecuperarVideo");
        btnRecuperarVideo.click();
    }

    if (home) {
        let random = Math.floor(Math.random() * 9);           
        
        let allGifs = [
                'assets/gifs/video1.gif', 'assets/gifs/video2.gif', 'assets/gifs/video3.gif',
                'assets/gifs/video6.gif', 'assets/gifs/video5.gif', 'assets/gifs/video6.gif',
                'assets/gifs/video7.gif', 'assets/gifs/video8.gif', 'assets/gifs/video9.gif'
            ];
        //atribui o elemento aleatorio ao background-image do elemento home
        home.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('" + allGifs[random] + "')";
        home.style.backgroundSize = "cover";
        home.style.backgroundPosition = "center";
    }
});

function adicionarAudio(){
    let music = localStorage.getItem("music");
    let alertaMusicaNaoAdicionada = document.querySelector("#alertaMusicaNaoAdicionada");
    
    if(music){
        window.location.href = "/dashboard";
    }
    else{
        alertaMusicaNaoAdicionada.classList.remove("displayNoneElement");
    }
}

function continuarSemMusica(){
    localStorage.removeItem("music");
    window.location.href = "/dashboard";
}

function inserirToken(){
    let token = document.querySelector("#linkTokenReplicate").value;
    localStorage.setItem("replicate", token);
}

function enviaTokenReplicate(){
    let token = localStorage.getItem("replicate");
    let linkReplicate = document.querySelector("#linkReplicateIdVideoReplicate");
    linkReplicate.value = token;
}