//saves user rent input
function submitFunction() 
    {
    var  x = document.getElementById("txtPrice").value;
   if (tryParse (x) === false)
   {
    if (typeof x != 'number') //type check
    {
        alert ("Please input a price without the dollar sign (ex. $789 -> 789)");
    }
   }
    else
    {
    x = parseFloat (x);
    
  // document.getElementById("demo").innerHTML = x; 
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



 //weather API    
function weather()
{
var myToken = "EEfJIpjkMkYfTAcdJuFQJAnRFHHfEFsr";
var weatherURL = "https://www.ncdc.noaa.gov/cdo-web/api/v2/locations";

$.ajax({
    type: "GET",
    url: weatherURL,
    dataType: 'json',
    headers:{
        token: myToken
    },
 success: function( data ) {
     console.log(data);          //data._(whatever specific data want from the array)__
   }
    
})

}