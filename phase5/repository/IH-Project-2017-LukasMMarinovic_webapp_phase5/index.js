var distance = document.getElementById("range");
var budget = document.getElementsByClassName("cost");


d3.json("https://www.ncdc.noaa.gov/cdo-web/api/v2/") //import weather dataset
    .header("token","EygGYOGJVdtlSXlWRCQJBCmBVUWoaGLl")
    .get(function(error,root){
        console.log(root.results);
    })

d3.json("ZILLOW/PRR 10003_MLPLH") //import apartment pricing dataset
    .get(function(error,root){
        console.log(root.results);
    })

d3.json(/*gind a dataset for this?*/) //import crime dataset
    .header("token","EygGYOGJVdtlSXlWRCQJBCmBVUWoaGLl")
    .get(function(error,root){
        console.log(root.results);


class appartment{
    distance;
    price;
}
d3.select("#range").node().value;
d3.select("#cost").node().value;
if (range < appartment.distance)


function findLowest()
{
    var houseOfLowestCost; //make this array
    //use zillow database thingy here

    return houseOfLowestCost;
}
function findSafest()
{
    var houseSafest; //as array
    //use crime dataset
    return houseSafest;
}


function defineBudget()
{
    var max = cost;
}

function reccomendHome();
{
    
}

/*distance.addEventListener("click", function(){
    alert("RDAGERDG")
});


var counter = 0;
function log() {
    var button = document.getElementById("button");
    button.innerHTML = "I have been clicked " + ++counter + " times";
}*/