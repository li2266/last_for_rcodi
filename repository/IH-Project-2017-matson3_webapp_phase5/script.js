class NewYorkCityClimate {
	constructor(id=null, temp=new Seasonal(), rain=new Seasonal()) {
		this.id = id;
		this.temp = temp;
		this.rain = rain;
	}
	
	updateID(id) {
		this.id = id;
		updateNYCClimateData(this);
	}
	
	updateTemperature(temp) {
		this.temp = temp;
		updateNYCClimateData(this);
	}
	
	updateRain(rain) {
		this.rain = rain;
		updateNYCClimateData(this);
	}
}

var climate = new NewYorkCityClimate();
var climate2 = new NewYorkCityClimate();
var tempChart;
var rainChart;

// *       *     *     *** *   *
// **     **    * *     *  **  *
// * *   * *   *   *    *  * * *
// *  * *  *  *******   *  *  **
// *   *   * *       * *** *   *
$(document).ready( function() {
	debugger;
	initializeDropdown();
	tempChart = new chart('inches', climate.rain.a);
	rainChart = new chart("°F", climate.temp.a);
	
	updateNYCClimateData(climate);
	
	NCDCgetCityID2(new City("New York", "US", "NY")).then(
	(id) => {
		climate.updateID(id);
		    
	    function getRain() {
			//NCDC has a limit of 5 requests/second; Getting precipitation is 4 requests, so overlap can happen, causing an error to occur
			//This delays the request by a second to ensure that the data will be received (in theory)
			setTimeout( () => {
				NCDCgetAnnualPrecipitationDays(climate.id).then(
			    (rain) => { climate.updateRain(rain); }, 
			    (error) => climate.updateRain("<b>Unavailable</b>: " + error)
		    )}, 1000);
	    }
		
		NCDCgetAverageTemperatures(climate.id).then(
    		(temp) => {
    			climate.updateTemperature(temp);
    			getRain();
    		    
    		}
    		,(error) => {
    			climate.updateTemperature("<b>Unavailable</b>: " + error)
    			getRain();
		});
		
	}, (error) => {
		alert("Could not load Climate data");
		climate.updateTemperature("Error");
		climate.updateRain("Error");
	});
	
});

/*var place = {
	country: null
	,state: null
	,city: null
	,stateReady: false
	,cityReady: false
};*/


var place = new City();
location.stateReady = false;
location.cityReady = false;/**/

function initializeDropdown() {
	loadCountries();
	loadStates();
	loadCities();
}/**/

function loadCountries() {
	var dropdown = $("#countrySelector");
	//console.log(locationList);
	for(var country in locationList) {
		if(country == "Done") continue;
		dropdown.append("<a class='country' href='#" + country + "'>" + country + "</a>")
		//console.log(country);
	}
}/**/

function loadStates() {
	var dropdown = $("#stateSelector");
	
	if(place.stateReady) {
		
	} else {
		dropdown.attr("background-color=gray");
	}
}

function loadCities() {
	var dropdown = $("#citySelector");
	if(place.cityReady) {
		console.log(locationList[location.country]);
	} else {
		dropdown.attr("background-color=gray")
	}
}/**/


$(".country").click( () => {
	alert($(this).innerHTML);
});

function filterCountry() {
	var input = $("#countryInput");
	var filter = input.val().toUpperCase();
	var div = $("#countrySelector").children();
	
	for(var i = 1; i < div.length; i++) {
		if(div[i].innerHTML.indexOf(filter) > -1)
			div[i].style.display = "";
		else
			div[i].style.display = "none";
	}
}

function filterState() {
	var input = $("#stateInput");
	var filter = input.val().toUpperCase();
	var div = $("#stateSelector").children();
	
	for(var i = 1; i < div.length; i++) {
		if(div[i].innerHTML.indexOf(filter) > -1)
			div[i].style.display = "";
		else
			div[i].style.display = "none";
	}
}

function filterCity() {
	var input = $("#cityInput");
	var filter = input.val().toUpperCase();
	var div = $("#citySelector").children();
	
	for(var i = 1; i < div.length; i++) {
		if(div[i].innerHTML.indexOf(filter) > -1)
			div[i].style.display = "";
		else
			div[i].style.display = "none";
	}
}

function stateDropDown() {
	if(place.stateReady) document.getElementById("stateSelector").classList.toggle("show");
}

function countryDropDown() {
    document.getElementById("countrySelector").classList.toggle("show");
}

setInterval( () => {
	var tempearatures = climate.temp.a;
	var tempearatures2 = climate2.temp.a;
	var rain = climate.rain.a;
	var rain2 = climate2.rain.a;
	rainChart.render(tempearatures, tempearatures2);
	tempChart.render(rain, rain2);
}
, 2000);

function updateNYCClimateData() {
	var tempearatures = climate.temp.a;
	var rain = climate.rain.a;
	rainChart.render(tempearatures);
	tempChart.render(rain);
}
