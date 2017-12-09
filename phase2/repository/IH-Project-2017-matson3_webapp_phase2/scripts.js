class NewYorkCityClimate {
	constructor(id=null, temp=null, rain=null) {
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

var climate = new NewYorkCityClimate(null, null, null);

// *       *     *     *** *   *
// **     **    * *     *  **  *
// * *   * *   *   *    *  * * *
// *  * *  *  *******   *  *  **
// *   *   * *       * *** *   *
$(document).ready( function() {
	updateNYCClimateData(climate);
	
	NCDCgetAllDataTypes();
	
	NCDCgetCityID(new City("New York City", "US", "NY")).then(
	(id) => {
		
		climate.updateID(id);
		    
	    function getRain() {
			//NCDC has a limit of 5 requests/second; Getting precipitation is 4 requests, so overlap can happen, causing an error to occur
			setTimeout( () => {
				NCDCgetAnnualPrecipitationDays(climate.id).then(
			    (rain) => { climate.updateRain(rain); console.log("getRain resolved") }, 
			    (error) => climate.updateRain("<b>Unavailable</b>: " + error)
		    )}, 1000);
	    }
		
		NCDCgetAverageTemperatures(climate.id).then(
    		(temp) => {
				console.log("Temperatures received");
    			climate.updateTemperature(temp);
    			getRain();
    		    
    		}
    		,(error) => {
    			climate.updateTemperature("<b>Unavailable</b>: " + error)
    			getRain();
		});
		
	}, (error) => climate.updateID(error)
	);
	
});





function updateNYCClimateData(climateStructure) {
	var text = $("#nycClimateData");
	
	function smartAppend(value) {
		if(value === null) text.append("Loading...");
		else text.append(value.toString());
	}
	
	text.html("<b>ID</b>: ");
	smartAppend(climateStructure.id);
	
	text.append("<br><b>Average Temperatures</b>: ");
	smartAppend(climateStructure.temp);
	
	text.append("<br><b>Annual Days with Notable Precipitation</b>: ");
	smartAppend(climate.rain);
}

function appendToData(string) {
	$("#data").append(string + "<br>");
}