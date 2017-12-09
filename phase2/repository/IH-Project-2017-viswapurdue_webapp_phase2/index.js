$(document).ready(function(){

	$("#Proximity").click(function(){
	    alert("Proximity API will be called");
	});
	$("#Safety").click(function(){
		alert("Safety filter will be applied");
	});
		$("#Affordability").click(function(){
		alert("Affordabilty filter will be applied here");
	});
		$("#Recreation").click(function(){
		alert("Rec centers will be listed here");
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