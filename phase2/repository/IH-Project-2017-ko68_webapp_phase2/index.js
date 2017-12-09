 //weather API implementation   
function weather()
{
    
    
var test = document.getElementById("txtprice").value;
document.getElementById("show").innerHTML = test;


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
     console.log(data) //data._(whatever specific data want from the array)__
   }
    
})

var test2 = document.getElementById("txtprice").value;
document.getElementById("show2").innerHTML = test2;
}








//dataset 2 implementation  
function studioRent(){
$(document).ready(function(){

	$("#id_btn5").click(function(){
		$.ajax({
			type:"GET",
			url: "https://www.quandl.com/api/v3/datasets/ZILLOW/Z10003_MRP1B.json?api_key=cJd3pGaqseWAeCyCR3cE",
			dataType: 'json',
			jsonCallback: 'resultsHandler'
		});
	});
});



function resultsHandler(result){
	console.log(result.results);
	var studioRent = $("<table></table>");
	studioRent.append('<tr><th>Date</th><th>Value</th></tr>');
	for(var i = 0; i < result.results.length; ++i){
		studioRent.append('<tr><td>' + result.results[i].id + '</td><td>' + result.results[i].value + '</td></tr>');
	}

	$('body').append(studioRent);
}
}








//dataset 3 imlementation
$(document).ready(function(){

	$("#id_btn5").click(function(){
		$.ajax({
			type:"GET",
			url: "https://www.quandl.com/api/v3/datasets/ZILLOW/Z10075_ZHVI1B.json?api_key=cJd3pGaqseWAeCyCR3cE",
			dataType: 'json',
			jsonCallback: 'resultsHandler'
		});
	});
});

function resultsHandler(result){
	console.log(result.results);
	var oneBed = $("<table></table>");
	oneBed.append('<tr><th>Date</th><th>Value</th></tr>');
	for(var i = 0; i < result.results.length; ++i){
		oneBed.append('<tr><td>' + result.results[i].id + '</td><td>' + result.results[i].value + '</td></tr>');
	}

	$('body').append(oneBed);
}







//add number of rooms and distance from school
//housing profile submit button (might not need username and password)
function submitFunction() 
{
    var price = document.getElementById("txtPrice").value;
    var username = document.getElementById("txtUsername").value
    var password1 = document.getElementById("txtPassword1").value;
    var password2 = document.getElementById("txtPassword2").value;
    
    if(username === null || username == " " || username.length === 0) //username check
    {
        alert("Please input a valid username.");
    }
    //check if username is taken
   else if (password1 === null || password1 == " " || password1.length === 0)
   {
       alert("Please input a password.");
   }
   else if(password1 !== password2) //password check
     {
       alert ("Passwords do not match.");
     }
  else if (tryParse (price) === false) //rent check
   {
       if (typeof price != 'number') //type check
        {
            alert ("Please input a price without the dollar sign (ex. $789 -> 789)");
         }
   }
   else if(document.getElementById("Car").checked === false  && document.getElementById("Walk").checked === false && 
   document.getElementById("Bus").checked === false && document.getElementById("Train").checked === false && 
   document.getElementById("Bike").checked === false && document.getElementById("taxiService").checked === false) //check if transportation is selected
   {
       alert ("Please select a mode of transportation.");
   }

   else if(document.getElementById("moreSafe").checked === false && document.getElementById("moreAffordable").checked === false &&
   document.getElementById("both").checked === false) //checks if affordable/safe question is selected
   {
       alert ("Please complete all fields.");
   }
    else  //saves user information in an array
    {
        document.location.href='HousingResults.html'
        //if need to save housing profile answers insert code here
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









/*

//Current problem
function skipCreateUser()
{
    if (submitFuntion()===true)
    {
        document.location.href='HousingResults.html'
    }
}
*/


             
            


    
