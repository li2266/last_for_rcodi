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

// *       *     *     *** *   *
// **     **    * *     *  **  *
// * *   * *   *   *    *  * * *
// *  * *  *  *******   *  *  **
// *   *   * *       * *** *   *
$(document).ready( function() {
	updateNYCClimateData(climate);
	
	//test();
	/*NCDCgetCityID2(new City("New York", "US", "NY")).then( (id) => {
		console.log("From table: " + id);
	});*/
	
	
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




function countryDropDown() {
    document.getElementById("CountrySelector").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
	var svg = d3.select("body").append("svg")
		.attr("height", "100%")
		.attr("width",  "100%");

function updateNYCClimateData(climateStructure) {
	console.log(climateStructure)
	/*d3.select("#nycClimateData")
		.selectAll("div")
		.data(climateStructure.temp)
			.enter()
			.append("div")
			.attr("width", function(d) { console.log(d); return d + "px"; })
			.text(function(d){ console.log(d); return d; } );
	*/
	

	
	/*var text = $("#nycClimateData");
	
	function smartAppend(value) {
		if(value === null) text.append("Loading...");
		else text.append(value.toString());
	}
	text.html("");
	
	text.append("<b>Average Temperatures</b>: ");
	smartAppend(climateStructure.temp);
	text.append("<br>");
	
	text.append("<b>Annual Days with Notable Precipitation</b>: ");
	smartAppend(climate.rain);
	text.append("<br>");*/
}

function appendToData(string) {
	$("#data").append(string + "<br>");
}

