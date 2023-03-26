const novoPrompt = () => {
    
    let label = document.createElement("label");
    label.innerHTML = "Prompt: ";
    
    let inputText = document.createElement("input");
    inputText.setAttribute("type", "text");

    let inputNumber1 = document.createElement("input");
    inputNumber1.setAttribute("type", "number");

    let inputNumber2 = document.createElement("input");
    inputNumber2.setAttribute("type", "number");

    let div = document.createElement("div");
    div.appendChild(label);
    div.appendChild(inputText);
    div.appendChild(document.createTextNode("Início: "));
    div.appendChild(inputNumber1);
    div.appendChild(document.createTextNode(" Fim: "));
    div.appendChild(inputNumber2);

    // Adiciona o novo div ao formulário
    document.getElementById("prompts").appendChild(div);
}