var minRent;
var maxRent;
//housing profile submit button
function submitFunction() 
{
    var minPrice = document.getElementById("txtPriceMin").value;
    var maxPrice = document.getElementById("txtPriceMax").value
    
   
 if (tryParse (minPrice) === false || tryParse(maxPrice)===false) //rent check
   {
       if (typeof minPrice != 'number' || typeof maxPrice != 'number') //type check
        {
            alert ("Please input a price without the dollar sign (ex. $789 -> 789).");
         }
   }
   else if (parseFloat(minPrice) > parseFloat(maxPrice))
   {
       alert("Please input the lowest desired price value first.");
   }
    else  
    {
        alert("Finding your perfect house now!");
        document.getElementById('startInstructions').style.display = 'none';
       //SAVE info
       minRent = parseFloat(document.getElementById("txtPriceMin").value);
       maxRent = parseFloat(document.getElementById("txtPriceMax").value);
    }
}
    
    
//check if a string can be converted to a number    
function tryParse (num) 
{
    if (num !== null)
    {
        if (num.length >0)
        {
            if (!isNaN(num))
            {
                return parseFloat(num);
            }
        }
    }
    return false;
}



 //weather API implementation 
 
function weather()
{
var weatherURL = "https://api.weather.gov/points/40.7291,-73.9965/forecast";

$.ajax({
    type: "GET",
    url: weatherURL,
    dataType: 'json',
   
 success: function( data ) {
  
   console.log(data);

 }
       
});

}


//NY Death Dataset
function crime()
{
    var deathURL = "https://data.cityofnewyork.us/api/views/jb7j-dtam/rows.json?accessType=DOWNLOAD";
    
    $.ajax({
    type: "GET",
    url: deathURL,
    dataType: 'json',
    
 success: function( data ) {
     console.log(data);
   }
});

}

//NY available housing by area dataset 
function availableHousing()
{
    var availableURL = "https://data.cityofnewyork.us/api/views/6qzy-b4x8/rows.json?accessType=DOWNLOAD";
    
    $.ajax({
    type: "GET",
    url: availableURL,
    dataType: 'json',
    
 success: function( data ) {
     console.log(data);
   }
});

}

//NY available housing by building dataset
function buildingUnits()
{
    var unitsURL = "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";
    
    $.ajax({
    type: "GET",
    url: unitsURL,
    dataType: 'json',
    
 success: function( data ) {
     console.log(data);
   }
});

}



