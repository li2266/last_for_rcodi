var climateApiKey = 'isTiwPnJNRRpYhOHHnHKagCUnyTEOvIw';
var climateUrl = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=PRECIP_15&stationid=COOP:010008&units=metric&startdate=2010-05-01&enddate=2010-05-31';
var c = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/datatypes?offset=900';
$(document).ready(function(){

	$("#contact").click(function(){
	    window.location.assign("contactus.html");
	});
	$("#Weather").click(function(){
	    
	    $.ajax({ 
    type : "GET", 
    url : c,//climateUrl, 
    beforeSend: function(xhr){xhr.setRequestHeader('token', climateApiKey);},
    success : function(result) 
    { 
        
         console.log('climate',result);
         document.getElementById("para").innerHTML = result.results[0].name;
    }, 
    error : function(result) 
    { 
        
    } 
	});
		alert("Safety filter will be applied");
	});
		$("#Affordability").click(function(){
		alert("Affordabilty filter will be applied here");
	});
		$("#Recreation").click(function(){
		    
		    
		
	});
		$("#Dining").click(function(){
		alert("Restaurants will be listed here");
	});
	

});

function proximityAPI(newValue)
{
	document.getElementById("proximityValue").innerHTML=newValue;
}
function safetyAPI(newValue)
{
	document.getElementById("safetyValue").innerHTML=newValue;
}
function budgetAPI(newValue)
{
	document.getElementById("budgetValue").innerHTML=newValue;
}
function recAPI(newValue)
{
	document.getElementById("recValue").innerHTML=newValue;
}
function diningAPI(newValue)
{
	document.getElementById("diningValue").innerHTML=newValue;
}