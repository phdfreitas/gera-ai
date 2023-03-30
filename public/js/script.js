const novoPrompt = () => {
    
    let inputText = document.createElement("input");
    inputText.setAttribute("type", "text");
    inputText.setAttribute("name", "prompt");

    let inputNumber = document.createElement("input");
    inputNumber.setAttribute("type", "number");
    inputNumber.setAttribute("name", "inicio");

    let div1 = document.createElement("div");
    div1.className = "inputInicio"
    div1.appendChild(document.createTextNode("Início"));
    div1.appendChild(inputNumber);

    let div2 = document.createElement("div")
    div2.className = "inputPrompt"
    div2.appendChild(document.createTextNode("Prompt"));
    div2.appendChild(inputText);
    
    let div3 = document.createElement("div")
    div3.setAttribute("id", "form-group")
    
    div3.appendChild(div1);
    div3.appendChild(div2);

    let prompts = document.getElementById("promptsExtras")
    prompts.appendChild(div3);
}