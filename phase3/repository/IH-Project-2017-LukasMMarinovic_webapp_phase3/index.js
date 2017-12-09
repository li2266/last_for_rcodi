var distance = document.getElementById("range");
var budget = document.getElementsByClassName("cost");


d3.json("https://www.ncdc.noaa.gov/cdo-web/api/v2/")
    .header("token","EygGYOGJVdtlSXlWRCQJBCmBVUWoaGLl")
    .get(function(error,root){
        console.log(root.results);
    })

class appartment{
    distance;
    price;

}
d3.select("#range").node().value;
d3.select("#cost").node().value;
if (range < appartment.distance  )



/*function defineBudget()
{

}

distance.addEventListener("click", function(){
    alert("RDAGERDG")
});


var counter = 0;
function log() {
    var button = document.getElementById("button");
    button.innerHTML = "I have been clicked " + ++counter + " times";
}*/