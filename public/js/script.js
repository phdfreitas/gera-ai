const novoPrompt = () => {
    
    let inputText = document.createElement("input");
    inputText.setAttribute("type", "text");
    inputText.setAttribute("name", "prompt");

    let inputNumber = document.createElement("input");
    inputNumber.setAttribute("type", "number");
    inputNumber.setAttribute("name", "inicio");

    let div = document.createElement("div");
    div.appendChild(document.createTextNode("Início"));
    div.appendChild(inputNumber);
    div.appendChild(document.createTextNode("Prompt"));
    div.appendChild(inputText);
    
    
    let prompts = document.getElementById("promptsExtras")
    prompts.appendChild(div);
}