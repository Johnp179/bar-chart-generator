import "./index.scss";

const numberOfEntities = document.querySelector("#number-of-entities");
const templateXYValues = document.querySelector("#template-xy-values");
const xyValuesContainer = document.querySelector("#xy-values-container")
const addRemove = document.querySelector("#add-remove");
const generateGraph = document.querySelector("#generate-graph");
const maxNumberOfEntities = 20;
let amountOfEntities

for(let i = 0; i < maxNumberOfEntities; i++){
    let xyValue = templateXYValues.content.cloneNode(true);
    xyValuesContainer.insertBefore(xyValue, addRemove);
}

const xyValues = document.querySelectorAll(".xy-values");
const errors = document.querySelectorAll(".errors");
const numberOfEntitiesErrors = document.querySelectorAll("#number-of-entities-error label");

numberOfEntities.addEventListener("input", function(){

    generateGraph.style.display = "none";
    xyValuesContainer.style.display = "none";
    document.querySelector("#graph-container").style.display = "none";

    if(this.value === ""){
        numberOfEntitiesErrors[2].style.display = "block";
        numberOfEntitiesErrors[1].style.display = "none";
        this.style.boxShadow = "0 0 10px red";
        this.classList.remove("green-outline");
        return;
    } 

    if(this.value < 0 || isNaN(this.value)){
        numberOfEntitiesErrors[1].style.display = "block";
        numberOfEntitiesErrors[2].style.display = "none";
        this.style.boxShadow = "0 0 10px red";
        this.classList.remove("green-outline");
        return;
    } 
    if(this.value > maxNumberOfEntities){
        xyValuesContainer.style.display = "none";
        numberOfEntitiesErrors[0].style.display = "block";
        this.style.boxShadow = "0 0 10px red";
        this.classList.remove("green-outline");
        return
    } 

    // errors[errors.length -1].style.display = "none";
    this.style.boxShadow = "none";
    this.classList.add("green-outline");
    numberOfEntitiesErrors[0].style.display = "none";
    numberOfEntitiesErrors[1].style.display = "none";
    numberOfEntitiesErrors[2].style.display = "none";
    generateGraph.style.display = "block";
    // addRemove.style.display = "flex";
    xyValuesContainer.style.display = "flex";
    amountOfEntities = this.value;

    for(let i = 0; i < this.value; i ++){
        xyValues[i].style.display = "block";
    }

    for(let i = this.value; i < maxNumberOfEntities; i ++){
        let xValue = xyValues[i].querySelector(".x-value");
        let yValue = xyValues[i].querySelector(".y-value");
        let xError = xyValues[i].querySelectorAll(".errors")[0];
        let yError = xyValues[i].querySelectorAll(".errors")[1];
        xyValues[i].style.display = "none";
        xError.style.visibility =  "hidden";
        yError.style.visibility =  "hidden";
        xValue.style.boxShadow = "none";
        yValue.style.boxShadow = "none";
        // xValue.value = "";
        // yValue.value = "";
    }
  

})

// document.querySelector("#remove").addEventListener("click",()=>{

//     if(amountOfEntities === 0) return;
    
//     amountOfEntities --;
//     const xyValueToRemove = xyValues[amountOfEntities];
//     const xValue = xyValueToRemove.querySelector(".x-value");
//     const yValue = xyValueToRemove.querySelector(".y-value");
//     const xError = xyValueToRemove.querySelectorAll(".errors")[0];
//     const yError = xyValueToRemove.querySelectorAll(".errors")[1];

//     errors[errors.length -1].style.display = "none";
//     xyValueToRemove.style.display = "none";
//     xError.style.visibility =  "hidden";
//     yError.style.visibility =  "hidden";
//     xValue.style.boxShadow = "none";
//     yValue.style.boxShadow = "none";
//     xValue.value = "";
//     yValue.value = ""; 

// });

// document.querySelector("#add").addEventListener("click", ()=>{

//     if(amountOfEntities < maxNumberOfEntities){
//         xyValues[amountOfEntities].style.display = "block";
//         amountOfEntities ++;
//     }else{
//         errors[errors.length -1].style.display = "block";
//     }
   
// });


const inputs = Array.from(document.querySelectorAll("input"));

inputs.forEach((element, index)=>{
    // index 3 corresponds to the numberOfEntities so can be skipped
    if(index === 3) return;

    //index 0, 1 and 2 correspond to title, y-axis and x-axis respectively; only need to
    //check if they are empty or not which is the same check as for the x-values. The listener is 
    //as follows
    if(index === 0 || index === 1 || index === 2 || element.className.includes("x-value")){
        element.addEventListener("input", ()=>{
            if(!element.value){
                element.style.boxShadow = "0 0 10px red";
                errors[index].style.visibility = "visible";
                element.classList.remove("green-outline");
            }else{
                element.style.boxShadow = "none";
                element.classList.add("green-outline");
                errors[index].style.visibility = "hidden";
            }
        })
        return;
    }

    // elements left are y-values, the listener is as follows
    element.addEventListener("input", ()=>{
        if(!element.value || element.value < 0 || isNaN(element.value)){
            element.style.boxShadow = "0 0 10px red";
            errors[index].style.visibility = "visible";
            element.classList.remove("green-outline");
        }else{
            element.style.boxShadow = "none";
            element.classList.add("green-outline");
            errors[index].style.visibility = "hidden";
        }
    
    })


})



document.querySelector("#generate-graph button").addEventListener("click", generate);

function generate(){

    document.querySelector("#graph").innerHTML = "";
    document.querySelector("#x-components").innerHTML = "";
    document.querySelector("#graph-container").style.display = "none";
    errors[errors.length -1].style.display = "none";

    let error = {
        emptyFields: false,
        invalidYValue: false
    };

    // only need to check inputs which are displayed in the DOM. This is the first 4(title, y-axis, x-axis and No of entities) plus
    // the xy-values, the amount of which is equal to amountOfEntities *2.
    const inputsToCheck = inputs.slice(0, 4 + amountOfEntities*2);
    const xyInputsToCheck = inputsToCheck.slice(4);

    inputsToCheck.forEach((element, index) => {
        // index 3 corresponds to the number of entities so can be skipped
        if(index == 3) return;

        //index 0, 1 and 2 correspond to title, y-axis and x-axis respectively; only need to
        //check if they are empty or not which is the same check as for the x-values

        if(index == 0 || index == 1 || index == 2 || element.className.includes("x-value")){
            if(!element.value){
                element.style.boxShadow = "0 0 10px red";
                error.emptyFields = true;
                errors[index].style.visibility = "visible";
            }
            return;
        }
        // elements left are y-values, the check is as follows:
        if(!element.value || element.value < 0 || isNaN(element.value)){
            element.style.boxShadow = "0 0 10px red";
            error.invalidYValue = true;
            errors[index].style.visibility = "visible";
        }
        
   
    })

    if(error.emptyFields || error.invalidYValue) return;

    const graphTitle = document.querySelector("#graph-title");
    const xAxisTitle = document.querySelector("#x-axis-title");
    const yAxisTitle = document.querySelector("#y-axis-title");
    const templateBar = document.querySelector("#template-bar");
    const xInputs = xyInputsToCheck.filter(element => element.className.includes("x-value"));
    const yInputs = xyInputsToCheck.filter(element => element.className.includes("y-value"));
    
    document.querySelector("#graph-container").style.display = "flex"; 
    document.querySelector("#title h1").textContent = graphTitle.value;
    document.querySelector("#x-axis-name h2").textContent = xAxisTitle.value;
    document.querySelector("#y-axis h2").textContent = yAxisTitle.value;
    const maxYValue = yInputs.reduce((max, element) => Math.max(max, element.value), 0);
    const numberOfBars = amountOfEntities;
    const totalWidthOfBars = 80; // leaving extra 20% for gaps
    const barWidth = (totalWidthOfBars / numberOfBars).toFixed(2) + "%";

    yInputs.forEach(element => {
        const barHeight = (element.value / maxYValue * 100).toFixed(2) + "%";
        const barNode = templateBar.content.cloneNode(true);
        const bar = barNode.querySelector(".bar");
        const barValue = barNode.querySelector(".bar-value");
        bar.style.width = barWidth;
        bar.style.height = barHeight;
        barValue.textContent = element.value;
        graph.appendChild(barNode);

    })

    const templateXComponent = document.querySelector("#template-x-component");
    const xComponents = document.querySelector("#x-components");

    xInputs.forEach(element => {
        const xComponentNode = templateXComponent.content.cloneNode(true);
        const xComponent = xComponentNode.querySelector(".x-component");
        xComponent.textContent = element.value;
        xComponent.style.width = barWidth;
        xComponents.appendChild(xComponent)

    })



}