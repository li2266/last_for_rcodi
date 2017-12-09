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
   else if(document.getElementById("Car").checked === false  && document.getElementById("Walk").checked === false && 
   document.getElementById("Bus").checked === false && document.getElementById("Train").checked === false && 
   document.getElementById("Bike").checked === false && document.getElementById("taxiService").checked === false) //check if transportation is selected
   {
       alert ("Please select a mode of transportation.");
   }
    else  //saves user information in an array
    {
        //Need to save housing profile answers!!!
        document.location.href='HousingResults.html'
        return true;
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
var myToken = "EEfJIpjkMkYfTAcdJuFQJAnRFHHfEFsr";
var weatherURL = "https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets";

$.ajax({
    type: "GET",
    url: weatherURL,
    dataType: 'json',
    headers:{
        token: myToken
    }, 
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



