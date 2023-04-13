const novoPrompt = () => {
    
    let inputsBasicos = document.getElementById("inputsBasicos");

    let novaDiv = document.createElement("div");
    novaDiv.setAttribute("class", "form-group");
    novaDiv.innerHTML = inputsBasicos.innerHTML;
    
    /**/    
    let totalSpan = document.querySelectorAll("span").length;
    let span = document.getElementById("configuracoesExtras");
    
    let divIcones = document.createElement("div");
    divIcones.setAttribute("class", "iconesConfiguracoesExtras1");

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

    console.log(novaDivInputExtras.childNodes);

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
    document.querySelector("#inputAudioSource").addEventListener("change", function(){
        const fileReader = new FileReader();

        fileReader.addEventListener("load", function(){
            localStorage.setItem("music", fileReader.result);
            window.location.reload();    
        });
        fileReader.readAsDataURL(this.files[0]);
    });

    document.addEventListener("DOMContentLoaded", function(){
        if(localStorage.getItem("music")){
            document.querySelector("#audioSource").src = localStorage.getItem("music");
            document.querySelector("#musica").load();   
        }
    });
})()

function configuracoesExtras(element) {
    console.log(element.id);

    let idValue = element.id.length < 12 ? element.id.substring(9) : element.id.substring(12);

    let inputsExtras = document.getElementById("inputsExtras" + idValue);
    inputsExtras.classList.toggle("show");
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

    console.log(resultadoFinal);
}

function videoReplicateGerando(){
    console.log("videoReplicateGerando");
}

document.addEventListener("DOMContentLoaded", function(){
    let linkReplicate = document.querySelector("#resposta");
    if (linkReplicate != "" && linkReplicate != null) {
        console.log(linkReplicate.innerHTML);
        let btnRecuperarVideo = document.querySelector("#btnRecuperarVideo");
        btnRecuperarVideo.click();
    }
});

/*
(function form() {
    document.querySelector("#form").addEventListener("submit", function(event){
        event.preventDefault();

        let promptsInicio = document.querySelectorAll("input[name='inicio']");
        let prompts = document.querySelectorAll("textarea[name='prompt']");
        let linkReplicate = document.querySelector("input[name='linkTokenReplicate']");
        let emailUsuario = document.querySelector("input[name='emailUsuario']");

        console.log(promptsInicio);
        console.log(prompts);
        console.log(linkReplicate);
        console.log(emailUsuario);
    });
})();*/