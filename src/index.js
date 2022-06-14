import "./index.scss"


document.querySelector("#width-adjust").addEventListener("input",function(){
    document.querySelector("#container").style.width = this.value + "px"
})


document.querySelector("#number-of-entities").addEventListener("input", function(){
    var nameValueParis = document.querySelector("#name-value-pairs")
    var graph = document.querySelector("#graph");
    var names = document.querySelector("#names");

    while(nameValueParis.firstChild){
        nameValueParis.removeChild(nameValueParis.firstChild);
    }

    if(this.value > 20){
        document.querySelectorAll(".errors")[3].style.visibility = "visible";
    }else{
        document.querySelectorAll(".errors")[3].style.visibility = "hidden";

        var templateValues = document.querySelector("#template-values");
        var templateBar = document.querySelector("#template-bar");
        var templateName = document.querySelector("#template-name");

        for(var i = 0; i < this.value; i++){
            var XYvalues = templateValues.content.cloneNode(true)
            var bar = templateBar.content.cloneNode(true)
            var name = templateName.content.cloneNode(true)

            nameValueParis.appendChild(XYvalues);
            graph.appendChild(bar);
            names.appendChild(name);

        }

    }
})

document.querySelector("#generate-graph").addEventListener("click", generate)

function generate(){
    document.querySelector("#title h1").innerHTML =  document.querySelector("#graph-title").value;
    document.querySelector("#x-axis h2").innerHTML =  document.querySelector("#x-axis-title").value;
    document.querySelector("#y-axis h2").innerHTML =  document.querySelector("#y-axis-title").value;

    var yValues = Array.from(document.querySelectorAll(".y-value"));
    var bars = document.querySelectorAll(".bar");
    var barValue = document.querySelectorAll(".bar-value");
    var maxYValue = yValues.reduce(function(max, element){
        return Math.max(max, element.value);
    }, 0)

    var noEntities = document.querySelector("#number-of-entities");     
    var barWidth = (100 - noEntities.value*2)/noEntities.value;
    barWidth = barWidth.toFixed(2);

    yValues.forEach(function(element, index){
        var percentHeight = (element.value / maxYValue) * 100;
        percentHeight = percentHeight.toFixed(2);
        bars[index].style.width = barWidth + "%";
        bars[index].style.height = percentHeight+"%";
        bars[index].style.top = (100-percentHeight)+"%";
        barValue[index].innerHTML = element.value;

    })
    var names = document.querySelectorAll(".name")
    var xValues = Array.from(document.querySelectorAll(".x-value"));
    xValues.forEach(function(element, index){
        names[index].innerHTML = element.value;
        names[index].style.width = barWidth + "%";
    })
}