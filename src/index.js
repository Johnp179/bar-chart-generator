import "./index.scss";

const numberOfEntries = document.querySelector("#number-of-entities");
const templateValues = document.querySelector("#template-xy-values");
const xyValuesContainer = document.querySelector("#xy-values-container")
const addRemove = document.querySelector("#add-remove");
const errors = document.querySelectorAll("#error p")
const maxNumberOfEntries = 20;


numberOfEntries.addEventListener("input",function(){

    errors[0].style.display = "none";
    document.querySelector("#generate-graph").style.display = "none";
    addRemove.style.display = "none";

    if(this.value <= 0 || isNaN(this.value)) return xyValuesContainer.style.display = "none";
    
    if(this.value > maxNumberOfEntries) return errors[1].style.display = "block";
    
    errors[1].style.display = "none";
    document.querySelector("#generate-graph").style.display = "block";
    addRemove.style.display = "flex";
    xyValuesContainer.style.display = "flex";

    while(xyValuesContainer.children.length > 1){
        let firstChild = xyValuesContainer.firstElementChild;
        xyValuesContainer.removeChild(firstChild);
    }

    for(let i = 0; i < this.value; i++){
        let xyValue = templateValues.content.cloneNode(true);
        xyValuesContainer.insertBefore(xyValue, addRemove);
        
    }

})

document.querySelector("#remove").addEventListener("click",()=>{

    errors[1].style.display = "none";

    if(xyValuesContainer.children.length > 2){
        const childToRemove = addRemove.previousElementSibling;
        xyValuesContainer.removeChild(childToRemove);
    }else{
        const childToRemove = addRemove.previousElementSibling;
        xyValuesContainer.removeChild(childToRemove);
        addRemove.style.display = "none";
    }

   
});

document.querySelector("#add").addEventListener("click", ()=>{

    const currentNumberOfEntries = xyValuesContainer.children.length - 1;
    if(currentNumberOfEntries < maxNumberOfEntries){
        const xyValue = templateValues.content.cloneNode(true);
        xyValuesContainer.insertBefore(xyValue, addRemove)
    }else{
        errors[1].style.display = "block";
    }
   
});



document.querySelector("#generate-graph button").addEventListener("click", generate);

function generate(){
    let error = {
        emptyFields: false,
        invalidYValue: false
    }

    const inputs = document.querySelectorAll("input");
    const yValues = Array.from(document.querySelectorAll(".y-value")); //Array.from is necessary for the reduce method to work.

    inputs.forEach(element=>{

        if(!element.value){
            element.style.boxShadow = "0 0 10px red";
            error.emptyFields = true;
        }

        if(element.className == "y-value"){
            if(!element.value || isNaN(element.value)){
                element.style.boxShadow = "0 0 10px red";
                error.invalidYValue = true;
            }
        }
   
        element.addEventListener("input",()=>{

            if(element.className != "y-value"){
                if(element.value){
                    element.style.boxShadow = "none";
                }else{
                    element.style.boxShadow = "0 0 10px red";
                }
            }

            if(element.className == "y-value"){
                if(element.value && !isNaN(element.value)){
                    element.style.boxShadow = "none";
                }else{
                    element.style.boxShadow = "0 0 10px red";
                }
            }

            let error = {
                emptyFields: false,
                invalidYValue: false
            }

            for(let i = 0; i < inputs.length; i++){
                if(!inputs[i].value){
                    error.emptyFields  = true;
                    break;
                }
            }

            for(let i = 0; i < yValues.length; i++){
                if(!yValues[i].value || isNaN(yValues[i].value)){
                    error.invalidYValue = true;
                    break;
                }
            }

            error.emptyFields ? errors[0].style.display = "block" :  errors[0].style.display = "none";
            error.invalidYValue ? errors[2].style.display = "block" : errors[2].style.display = "none";
  
        })
    })

    if(error.emptyFields) errors[0].style.display = "block";
    if(error.invalidYValue) errors[2].style.display = "block";
    if(error.emptyFields || error.invalidYValue) return;

    const graphTitle = document.querySelector("#graph-title");
    const xAxisTitle = document.querySelector("#x-axis-title");
    const yAxisTitle = document.querySelector("#y-axis-title");
    const graph = document.querySelector("#graph");
    const templateBar = document.querySelector("#template-bar");
    
    document.querySelector("#graph-container").style.display = "flex"; 
    document.querySelector("#title h1").textContent = graphTitle.value;
    document.querySelector("#x-axis-name h2").textContent = xAxisTitle.value;
    document.querySelector("#y-axis h2").textContent = yAxisTitle.value;
    graph.innerHTML = "";
    const maxYValue = yValues.reduce((max, element) => Math.max(max, element.value), 0);
    const numberOfBars = document.querySelectorAll(".xy-values").length;
    const totalWidthOfBars = 80; // leaving extra 20% for gaps
    const barWidth = (totalWidthOfBars / numberOfBars).toFixed(2) + "%";

    yValues.forEach(element => {
        const barHeight = (element.value / maxYValue * 100).toFixed(2) + "%";
        const barNode = templateBar.content.cloneNode(true);
        const bar = barNode.querySelector(".bar");
        const barValue = barNode.querySelector(".bar-value");
        bar.style.width = barWidth;
        bar.style.height = barHeight;
        barValue.textContent = element.value;
        graph.appendChild(barNode);

    })

    const xValues = document.querySelectorAll(".x-value");
    const templateXComponent = document.querySelector("#template-x-component");
    const xComponents = document.querySelector("#x-components");
    xComponents.innerHTML = "";

    xValues.forEach(element => {
        const xComponentNode = templateXComponent.content.cloneNode(true);
        const xComponent = xComponentNode.querySelector(".x-component");
        xComponent.textContent = element.value;
        xComponent.style.width = barWidth;
        xComponents.appendChild(xComponent)

    })



}