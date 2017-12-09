const NY_COMPLAINT_DATA = "https://data.cityofnewyork.us/resource/qgea-i56i.json";
const NY_ATHLETIC_DATA = "https://data.cityofnewyork.us/resource/9wwi-sb8x.json";
const NY_SUBWAY_DATA = "https://data.cityofnewyork.us/resource/he7q-3hwy.json";
const NY_BUS_DATA = "https://data.cityofnewyork.us/resource/t4f2-8md7.json";
const ZILLOW_ZWSID = "X1-ZWz1g487d81pu3_5rw5j";
//const ZILLOW_EXAMPLE_URL = "http://www.zillow.com/webservice/GetZestimate.htm?zws-id=X1-ZWz1g487d81pu3_5rw5j&zpid=55501550&rentzestimate=true";
const ZILLOW_BASE_URL = "http://www.zillow.com/webservice/GetZestimate.htm?zws-id=X1-ZWz1g487d81pu3_5rw5j&zpid=";
const ZILLOW_END_URL = "&rentzestimate=true";
const NCDC_BASE_URL = "https://www.ncdc.noaa.gov/cdo-web/api/v2/";
const NCDC_TOKEN = "BsLZnmqqVaSAunVkXpRSJSIqIDQEJXkf";
const NCDC_PRECIPITATION_DATA_START = "data?datasetid=PRECIP_HLY&locationid=CITY:";
const NCDC_PRECIPITATION_DATA_END = "&units=metric&startdate=2013-01-01&enddate=2013-12-01&limit=1000"

var data;
var map;
var nyuMarker;
var geocoder;
var address;

var complaints = [];
var subways = [];
var busStops = [];
var parks_Basket = [], parks_Tennis = [], parks_Volley = [];
var houses = [];
var minValRent = 1000000;
var minValZPID = 0;
var minValPos = 0;
var returnedDataSports = [];
var infoShow;
var zipCodes = [10001, 10003, 10011, 10012, 10009,
				10013, 10014, 10002, 10010, 10004,
				10007, 11201, 11205, 11206, 11211,
				11231, 11214, 11223, 11224, 11229,
				11235, 11354, 11355, 11358, 11365];
				
/*var zipRanges = [[0, 84], [85, 277], [278, 486], [487,666], [667, 792],
				[793, 1027], [1028, 1258], [1259, 1360], [1361, 1453], [1454, 1473],
				[1474, 1518], [1519, 1757], [1758, 1995], [1996, 2214], [2215, 2460],
				[2461, 2760], [2761, 3060], [3061, 3345], [3346, 3581], [3582, 3881],
				[3882, 4159], [4160, 4436], [4437, 4703], [4704, 5003], [5004, 5303]];
*/
var zipRanges = [[0, 49], [50, 99], [100, 149], [150, 199], [200, 249],
				[250, 299], [300, 349], [350, 399], [400, 449], [450, 499],
				[500, 549], [550, 599], [600, 649], [650, 699], [700, 749],
				[750, 799], [800, 849], [850, 899], [900, 949], [950, 949],
				[950, 999], [1000, 1049], [1050, 1099], [1100, 1149], [1150, 1199]];

var larcenyCheck,
	robberyCheck, 
	forgeryCheck;
	
//--------------------------------- Navbar Affix ----------------------------------------
$(document).ready(function(){
    $(".navbar").affix({offset: {top: $("header").outerHeight(true)} });
});

//--------------------------------- Google Maps ----------------------------------------
function initMap() {
	map = new google.maps.Map(document.getElementById('googleMapContainer'), {
		center: {lat: 40.7291, lng: -73.9965},
		zoom: 16
	});
	
	geocoder = new google.maps.Geocoder;
	nyuMarker = new google.maps.Marker({
				position: new google.maps.LatLng(40.7291,
												 -73.9965),
				map: null
			});
}

// Custom Icons Links: [Larceny, Robbery, Forgery, Basketball, Tennis, Volleyball]
var icons = ["https://i.imgur.com/RCy9w57.png?1",
			"https://i.imgur.com/EFkj6Pf.png?1",
			"https://i.imgur.com/vYm94Su.png?1",
			"https://i.imgur.com/3snebH9.png?1",
			"https://i.imgur.com/6gWrQ5K.png?1",
			"https://i.imgur.com/mEZrtDA.png?1",
			"https://i.imgur.com/D7Ue77y.png?1",
			"https://i.imgur.com/EeWtmRD.png?1",
			"https://i.imgur.com/XA1YfPF.png?1",
			"https://i.imgur.com/Y8IPeI6.png?1"]

//--------------------------------- Google Maps(Distance Calculation) ----------------------------------------
function calculateDistance(marker1, marker2){
	return google.maps.geometry.spherical.computeDistanceBetween (marker1.position, marker2.position);
}		

			
//--------------------------------- Zillow Data ----------------------------------------

function getRandom(min, max) {
	var random = Math.floor(Math.random() * (max - min) ) + min;
    return random;
}

function loadZPID(){
	// Iterate through JSON object
	/*for(var entry in ZILLOW_ZPID){
		if(ZILLOW_ZPID[entry].zip == "10001")
		{
			console.log(ZILLOW_ZPID[entry].zip);
		}
	}*/
	
	var rand;
	var zpid;
	
	for(i = 0; i < zipRanges.length; i++){
		rand = getRandom(zipRanges[i][0], zipRanges[i][1]);
		zpid = ZILLOW_ZPID[rand].zpid;
		getZPIDData(zpid);
		
		//Duplicate to get 2 houses per ZIP area
		rand = getRandom(zipRanges[i][0], zipRanges[i][1]);
		zpid = ZILLOW_ZPID[rand].zpid;
		getZPIDData(zpid);
	}
};

function getZPIDData(zpid){
	/*$.ajax({
		xhrFields: {
			withCredentials: true
		},
		headers: {
			//'Access-Control-Allow-Origin': '*'
		},
		type: "GET",
		url: ZILLOW_BASE_URL+zpid+ZILLOW_END_URL,
		dataType: "xml",
		success: xmlParser
   });*/
   
   
   // CORS Solution Provided by "PerryW" in Stackoverflow (Reference in README)
   
   var xmlSource = ZILLOW_BASE_URL+zpid+ZILLOW_END_URL;

	// build the yql query. Could be just a string - I think join makes easier reading
    var yqlURL = [
        "http://query.yahooapis.com/v1/public/yql",
        "?q=" + encodeURIComponent("select * from xml where url='" + xmlSource + "'"),
        "&format=xml&callback=?"
    ].join("");

	// AJAX method      
    $.getJSON(yqlURL, function(data){
        xmlContent = $(data.results[0]);
		var code = $(xmlContent).find("message").find("code").text();
		var rent = $(xmlContent).find("rentzestimate");
		var latlng = $(xmlContent).find("address");
		if(code == "0" && rent.find("amount").text() != "")
		{
			// Determine cheapest rent
			if(parseInt(rent.find("amount").text()) < minValRent){
				minValRent = parseInt(rent.find("amount").text());
				minValZPID = zpid;
				minValPos = houses.length;
			}
				
			/*console.log("Rent: " + rent.find("amount").text());
			console.log("Address: " + latlng.find("street").text());
			console.log("Lat: " + latlng.find("latitude").text());
			console.log("Long: " + latlng.find("longitude").text());*/
			
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(parseFloat(latlng.find("latitude").text()),
												 parseFloat(latlng.find("longitude").text())),
				map: null,
				icon: icons[6],
				title: latlng.find("street").text()
			});
			
			// Show information stored in infoShow when clicking a marker
			marker.addListener('click', function() {
				if(infoShow){
					infoShow.close();
				}
				infoShow = new google.maps.InfoWindow({
					content: '<br/> Address: '  +  latlng.find("street").text() +
					'<br/> ZIP Code: ' + latlng.find("zipcode").text() +
					'<br/> Aprox. Rent: $' + rent.find("amount").text() + "/month" +
					'<br/> Distance to NYU: ' + calculateDistance(marker, nyuMarker).toFixed(0) + 'm'
				});
				infoShow.open(map, marker);
			});
			
			houses.push(marker);
		}
		else
		{
			console.log("ZPID " + zpid + " not available.");
		}
			
    });
}

function showZPIDData(type){
	for (var i = 0; i < houses.length; i++){
		houses[i].setMap(type);
	}
}

$(document).ready(function() {
	$("#getHousesDataButton").on('click', function(){
		
		var boolChanger = true;
		
		houses[minValPos].setIcon(icons[7]);
		
		if (boolChanger){
			showZPIDData(map)
			boolChanger = false;
		}
		else if(!boolChanger){
			showZPIDData(null);
			boolChanger = true;
		}
	});
});

//--------------------------------- NCDC (Climate Dataset) ----------------------------------------
function loadClimate(){
	//console.log(NCDC_BASE_URL + NCDC_PRECIPITATION_DATA_START + "US360019" + NCDC_PRECIPITATION_DATA_END);
	
	$.ajax({ 
		url:NCDC_BASE_URL + NCDC_PRECIPITATION_DATA_START + "US360019" + NCDC_PRECIPITATION_DATA_END,
		//url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/locations?datasetid=PRECIP_HLY&locationcategoryid=CITY&limit=1000",
		//url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/datatypes?limit=1000",
		headers:{ 
			'token':NCDC_TOKEN
		},
		success: showClimate
	});
};

function showClimate(data){
	
	var sum = 0;
	var max = 0;
	var min = 1;
	var avg;
	
	for(var i=0; i < data.results.length; i++){
		//console.log(data.results[i]);
		if(data.results[i].value != 9999){
			sum += (data.results[i].value/10);
		
			if(data.results[i].value/10 > max){
				max = data.results[i].value/10;
			}
			
			if(data.results[i].value/10 < min && 0 < data.results[i].value/10){
				min = data.results[i].value/10;
			}
		}
	}
	
	avg = sum/data.results.length;
	document.getElementById("avrg-rain").textContent = ("Average Rainfall(mm): "+(avg).toFixed(2));
	document.getElementById("max-rain").textContent = ("Maximum Rainfall(mm): "+(max).toFixed(2));
	document.getElementById("min-rain").textContent = ("Minimum Rainfall(mm): "+(min).toFixed(2));
	
	switch(true){
		case (avg<=2.5):
			document.getElementById("avrg-rain-msg").textContent = "Sunny almost everyday, lucky you!";
			break;
		case (avg > 2.5 && avg <= 25):
			document.getElementById("avrg-rain-msg").textContent = "A damp city, nothing to worry about.";
			break;
		case (avg > 25 && avg <= 50):
			document.getElementById("avrg-rain-msg").textContent = "Some minor rains, an umbrella isn't a bad idea.";
			break;
		case (avg > 50 && avg <= 75):
			document.getElementById("avrg-rain-msg").textContent = "Prepare to get caught in a rainstorm, if it's cloudy outside, best to stay inside.";
			break;
		case (avg > 75 && avg <= 100):
			document.getElementById("avrg-rain-msg").textContent = "Street floodings and power outages, if possible avoid going to the street.";
			break;
		case (avg > 100):
			document.getElementById("avrg-rain-msg").textContent = "This is of biblical proportions, might as well bring a boat.";
			break;
	}
}


//--------------------------------- Complaint ----------------------------------------
function loadComplaint(){
	$.getJSON(NY_COMPLAINT_DATA, function(data, tStatus){
		$.each(data, function(i, result){
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(parseFloat(result.latitude),
												 parseFloat(result.longitude)),
				map: null,
				title: result.ofns_desc
			});
			// Add Google Marker to an array, in order to access it later
			if(result.ofns_desc == "PETIT LARCENY" || result.ofns_desc == "GRAND LARCENY")
			{
				marker.setIcon(icons[0]);
			}
			else if(result.ofns_desc == "ROBBERY"){
				marker.setIcon(icons[1]);
			}
			else if(result.ofns_desc == "FORGERY"){
				marker.setIcon(icons[2]);
			}
			
			complaints.push(marker);
			
			
			// Show information stored in infoShow when clicking a marker
			marker.addListener('click', function() {
				if(infoShow){
					infoShow.close();
				}
				infoShow = new google.maps.InfoWindow({
					content: result.ofns_desc + 
					'<br/> Borough: ' + result.boro_nm +
					'<br/> Distance to NYU: ' + calculateDistance(marker, nyuMarker).toFixed(0) + 'm'
				});
				infoShow.open(map, marker);
			});
		});
	});
};

function setComplaint(type, crime){
	for (var i = 0; i < complaints.length; i++){
		switch(crime){
			case "LARCENY":
				if(complaints[i].getTitle() == "PETIT LARCENY" || complaints[i].getTitle() == "GRAND LARCENY"){
					complaints[i].setMap(type);
				}
				break;
			case "ROBBERY":
				if(complaints[i].getTitle() == "ROBBERY"){
					complaints[i].setMap(type);
				}
				break;
			case "FORGERY":
				if(complaints[i].getTitle() == "FORGERY"){
					complaints[i].setMap(type);
				}
				break;
		}
	}
}

$(document).ready(function() {
	$("#getCrimeDataButton").on('click', function(){
		
		larcenyCheck = document.getElementById("crime_larceny_checkbox").checked;
		robberyCheck = document.getElementById("crime_robbery_checkbox").checked;
		forgeryCheck = document.getElementById("crime_forgery_checkbox").checked;
		
		if (larcenyCheck){
			setComplaint(map, "LARCENY")
		}
		else if(!larcenyCheck){
			setComplaint(null, "LARCENY")	
		}
		
		if (robberyCheck){
			setComplaint(map, "ROBBERY")
		}
		else if(!robberyCheck){
			setComplaint(null, "ROBBERY")	
		}
		
		if (forgeryCheck){
			setComplaint(map, "FORGERY")
		}
		else if(!forgeryCheck){
			setComplaint(null, "FORGERY")	
		}
		
		d3.selectAll("svg > *").remove(); // "Erase" previous graph
		showCrimeChart()
		document.getElementById("graph_title").textContent = "Crime Chart";
	});
});

//--------------------------------- Transportation ----------------------------------------
//--------------------------------- Subway ----------------------------------------
function loadSubway(){
	$.getJSON(NY_SUBWAY_DATA, function(data, tStatus){
		$.each(data, function(i, result){
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(parseFloat(result.the_geom.coordinates[1]),
												 parseFloat(result.the_geom.coordinates[0])),
				map: null,
				title: result.name
			});
			
			marker.setIcon(icons[8]);
			
			// Show information stored in infoShow when clicking a marker
			marker.addListener('click', function() {
				if(infoShow){
					infoShow.close();
				}
				infoShow = new google.maps.InfoWindow({
					content: result.name +
					'<br/> Distance to NYU: ' + calculateDistance(marker, nyuMarker).toFixed(0) + 'm'
				});
				infoShow.open(map, marker);
			});
			
			// Add Google Marker to an array, in order to access it later
			subways.push(marker);
		});
	});
};

function setSubway(type){
	for (var i = 0; i < subways.length; i++){
		subways[i].setMap(type);
	}
}

//--------------------------------- Bus Stops ----------------------------------------

function loadBuses(){
	$.getJSON(NY_BUS_DATA, function(data, tStatus){
		$.each(data, function(i, result){
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(parseFloat(result.latitude),
												 parseFloat(result.longitude)),
				map: null,
				title: result.location
			});
			
			marker.setIcon(icons[9]);
			
			// Show information stored in infoShow when clicking a marker
			marker.addListener('click', function() {
				if(infoShow){
					infoShow.close();
				}
				infoShow = new google.maps.InfoWindow({
					content: result.location +
					'<br/> Distance to NYU: ' + calculateDistance(marker, nyuMarker).toFixed(0) + 'm'
				});
				infoShow.open(map, marker);
			});
			
			// Add Google Marker to an array, in order to access it later
			busStops.push(marker);
		});
	});
};

function setBuses(type){
	for (var i = 0; i < busStops.length; i++){
		busStops[i].setMap(type);
	}
}

$(document).ready(function() {
	$("#getTransportDataButton").on('click', function(){
		
		subwayCheck = document.getElementById("subway_checkbox").checked;
		busCheck = document.getElementById("bus_checkbox").checked;
		
		if (subwayCheck){
			setSubway(map)
		}
		else if(!subwayCheck){
			setSubway(null)	
		}
		
		if (busCheck){
			setBuses(map)
		}
		else if(!busCheck){
			setBuses(null)	
		}
	});
});

//--------------------------------- Athletic ----------------------------------------

/*function getSportData(dataSet, sport){
	returnedDataSports.push($.grep(dataSet, function (data, index) {
		return data.sport == "Yes";
	}));
}*/

function loadPark(){
	$.getJSON(NY_ATHLETIC_DATA, function(data, tStatus){
		
		returnedDataSports.push($.grep(data, function (data, index) {
			return data.basketball == "Yes";
		}));
		
		$.each(returnedDataSports[0], function(i, result){
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(parseFloat(result.the_geom.coordinates[0][0][0][1]),
												 parseFloat(result.the_geom.coordinates[0][0][0][0])),
				map: null,
				icon: icons[3],
				title: "Basketball",
			});
			// Add Google Marker to an array, in order to access it later
			parks_Basket.push(marker);
			
			// Show information stored in infoShow when clicking a marker
			marker.addListener('click', function() {
				if(infoShow){
					infoShow.close();
				}
				infoShow = new google.maps.InfoWindow({
					content: '<br/> Sport: ' + marker.getTitle() +
					'<br/> Distance to NYU: ' + calculateDistance(marker, nyuMarker).toFixed(0) + 'm'
				});
				infoShow.open(map, marker);
			});
		});
		
		returnedDataSports.push($.grep(data, function (data, index) {
			return data.tennis == "Yes";
		}));
		
		$.each(returnedDataSports[1], function(i, result){
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(parseFloat(result.the_geom.coordinates[0][0][0][1]),
												 parseFloat(result.the_geom.coordinates[0][0][0][0])),
				map: null,
				icon: icons[4],
				title: "Tennis",
			});
			// Add Google Marker to an array, in order to access it later
			parks_Tennis.push(marker);
			
			// Show information stored in infoShow when clicking a marker
			marker.addListener('click', function() {
				if(infoShow){
					infoShow.close();
				}
				infoShow = new google.maps.InfoWindow({
					content: '<br/> Sport: ' + marker.getTitle() +
					'<br/> Distance to NYU: ' + calculateDistance(marker, nyuMarker).toFixed(0) + 'm'
				});
				infoShow.open(map, marker);
			});
		});
		
		returnedDataSports.push($.grep(data, function (data, index) {
			return data.volleyball == "Yes";
		}));
		
		$.each(returnedDataSports[2], function(i, result){
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(parseFloat(result.the_geom.coordinates[0][0][0][1]),
												 parseFloat(result.the_geom.coordinates[0][0][0][0])),
				map: null,
				icon: icons[5],
				title: "Volleyball",
			});
			// Add Google Marker to an array, in order to access it later
			parks_Volley.push(marker);
			
			// Show information stored in infoShow when clicking a marker
			marker.addListener('click', function() {
				if(infoShow){
					infoShow.close();
				}
				infoShow = new google.maps.InfoWindow({
					content: '<br/> Sport: ' + marker.getTitle() +
					'<br/> Distance to NYU: ' + calculateDistance(marker, nyuMarker).toFixed(0) + 'm'
				});
				infoShow.open(map, marker);
			});
		});
	});
};

function setPark(type, sports){
	switch(sports){
		
			case "BASKETBALL":
				for (var i = 0; i < parks_Basket.length; i++){
					parks_Basket[i].setMap(type);
				}
				break;
			case "TENNIS":
				for (var i = 0; i < parks_Tennis.length; i++){
					parks_Tennis[i].setMap(type);
				}
				break;
			case "VOLLEYBALL":
				for (var i = 0; i < parks_Volley.length; i++){
					parks_Volley[i].setMap(type);
				}
				break;
	}
}

$(document).ready(function() {
	$("#getParksDataButton").on('click', function(){
		
		basketCheck = document.getElementById("basket_checkbox").checked;
		tennisCheck = document.getElementById("tennis_checkbox").checked;
		volleyCheck = document.getElementById("volley_checkbox").checked;
		
		if (basketCheck){
			setPark(map, "BASKETBALL")
		}
		else if(!basketCheck){
			setPark(null, "BASKETBALL")	
		}
		
		if (tennisCheck){
			setPark(map, "TENNIS")
		}
		else if(!tennisCheck){
			setPark(null, "TENNIS")	
		}
		
		if (volleyCheck){
			setPark(map, "VOLLEYBALL")
		}
		else if(!volleyCheck){
			setPark(null, "VOLLEYBALL")	
		}
		
		d3.selectAll("svg > *").remove(); // "Erase" previous graph
		showParksChart()
		document.getElementById("graph_title").textContent = "Parks/Sports Chart";
	});
});

//--------------------------------- D3 Graphs ----------------------------------------
//--------------------------------- D3 Crime Graphs ----------------------------------------
function showCrimeChart(){
	var margin = {top: 20, right: 20, bottom: 70, left: 40},
		width = 600 - margin.left - margin.right,
		height = 600 - margin.top - margin.bottom;

	// set the ranges
	var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
	var y = d3.scale.linear().range([height, 0]);

	// define the axis
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")


	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.ticks(10);


	// add the SVG element
	var svg = d3.select("#infoChart")
		.attr("width", 1200 + margin.left + margin.right)
		.attr("height", 600 + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", 
			  "translate(" + margin.left + "," + margin.top + ")");


			  
	var offenseCount = [0, 0, 0, 0];
	// load the data
	d3.json(NY_COMPLAINT_DATA, function(error, data) {
		
		data.forEach(function(d) {
			switch(d.ofns_desc)
			{
				case "PETIT LARCENY":
					offenseCount[0]++;
					d.Letter = d.ofns_desc;
					d.Freq = offenseCount[0];
					break;
				case "GRAND LARCENY":
					offenseCount[1]++;
					d.Letter = d.ofns_desc;
					d.Freq = offenseCount[1];
					break;
				case "ROBBERY":
					offenseCount[2]++;
					d.Letter = d.ofns_desc;
					d.Freq = offenseCount[2];
					break;
				case "FORGERY":
					offenseCount[3]++;
					d.Letter = d.ofns_desc;
					d.Freq = offenseCount[3];
					break;
			}
		});
		
	console.log(offenseCount);
	  // scale the range of the data
	  x.domain(data.map(function(d){ 
		if(d.Letter == "FORGERY"
		|| d.Letter == "ROBBERY" 
		|| d.Letter == "PETIT LARCENY" 
		|| d.Letter == "GRAND LARCENY"){
			return d.Letter; 
		}
		}));
	  y.domain([0, d3.max(data, function(d) { 
		if(d.Letter == "FORGERY"
		|| d.Letter == "ROBBERY" 
		|| d.Letter == "PETIT LARCENY" 
		|| d.Letter == "GRAND LARCENY"){
			return d.Freq; 
		} })]);

	  // add axis
	  svg.append("g")
		  .attr("class", "x axis")
		  .attr("transform", "translate(0," + height + ")")
		  .call(xAxis)
		.selectAll("text")
		  .style("text-anchor", "end")
		  .attr("dx", "-.8em")
		  .attr("dy", "-.55em")
		  .attr("transform", "rotate(-90)" );

	  svg.append("g")
		  .attr("class", "y axis")
		  .call(yAxis)
		.append("text")
		  .attr("transform", "rotate(-90)")
		  .attr("y", 5)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .text("Ocurrences");
				  
	  // Add bar chart
	  var bars = svg.selectAll("bar")
		  .data(data)
		.enter().append("rect")
		  .attr("class", "bar")
		  .attr("x", function(d){ 
			if(d.Letter == "FORGERY"
			|| d.Letter == "ROBBERY" 
			|| d.Letter == "PETIT LARCENY" 
			|| d.Letter == "GRAND LARCENY"){
				return x(d.Letter); 
			}
			})
		  .attr("width", x.rangeBand())
		  .attr("y", function(d){ 
			if(d.Letter == "FORGERY"
			|| d.Letter == "ROBBERY" 
			|| d.Letter == "PETIT LARCENY" 
			|| d.Letter == "GRAND LARCENY"){
				return y(d.Freq); 
			}
			})
		  .attr("height", function(d) { 
			if(d.Letter == "FORGERY"
			|| d.Letter == "ROBBERY" 
			|| d.Letter == "PETIT LARCENY" 
			|| d.Letter == "GRAND LARCENY"){
				return height - y(d.Freq); 
			}
			})

	});
};

//--------------------------------- D3 Parks Graphs ----------------------------------------
function showParksChart(){
	var margin = {top: 20, right: 20, bottom: 70, left: 40},
		width = 600 - margin.left - margin.right,
		height = 600 - margin.top - margin.bottom;

	// set the ranges
	var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
	var y = d3.scale.linear().range([height, 0]);

	// define the axis
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")


	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.ticks(10);


	// add the SVG element
	var svg = d3.select("#infoChart")
		.attr("width", 1200 + margin.left + margin.right)
		.attr("height", 600 + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", 
			  "translate(" + margin.left + "," + margin.top + ")");


			  
	var sportCount = [0, 0, 0];
	// load the data
	d3.json(NY_ATHLETIC_DATA, function(error, data) {
		data.forEach(function(d) {			
			if(d.basketball == "Yes")
			{
				sportCount[0]++;
				d.Letter = "BASKETBALL"
				d.Freq = sportCount[0];
			}
			
			if(d.tennis == "Yes")
			{
				sportCount[1]++;
				d.Letter = "TENNIS"
				d.Freq = sportCount[1];
			}
			
			if(d.volleyball == "Yes")
			{
				sportCount[2]++;
				d.Letter = "VOLLEYBALL"
				d.Freq = sportCount[2];
			}
		});
		
	console.log(sportCount);
	  // scale the range of the data
	  x.domain(data.map(function(d){ 
		if(d.Letter == "BASKETBALL"
		|| d.Letter == "TENNIS" 
		|| d.Letter == "VOLLEYBALL" ){
			return d.Letter; 
		}
		}));
	  y.domain([0, d3.max(data, function(d) { 
		if(d.Letter == "BASKETBALL"
		|| d.Letter == "TENNIS" 
		|| d.Letter == "VOLLEYBALL" ){
			return d.Freq; 
		} })]);

	  // add axis
	  svg.append("g")
		  .attr("class", "x axis")
		  .attr("transform", "translate(0," + height + ")")
		  .call(xAxis)
		.selectAll("text")
		  .style("text-anchor", "end")
		  .attr("dx", "-.8em")
		  .attr("dy", "-.55em")
		  .attr("transform", "rotate(-90)" );

	  svg.append("g")
		  .attr("class", "y axis")
		  .call(yAxis)
		.append("text")
		  .attr("transform", "rotate(-90)")
		  .attr("y", 5)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .text("Available Parks");
				  
	  // Add bar chart
	  var bars = svg.selectAll("bar")
		  .data(data)
		.enter().append("rect")
		  .attr("class", "bar")
		  .attr("x", function(d){ 
			if(d.Letter == "BASKETBALL"
			|| d.Letter == "TENNIS" 
			|| d.Letter == "VOLLEYBALL" ){
				return x(d.Letter); 
			}
			})
		  .attr("width", x.rangeBand())
		  .attr("y", function(d){ 
			if(d.Letter == "BASKETBALL"
			|| d.Letter == "TENNIS" 
			|| d.Letter == "VOLLEYBALL" ){
				return y(d.Freq); 
			}
			})
		  .attr("height", function(d) { 
			if(d.Letter == "BASKETBALL"
			|| d.Letter == "TENNIS" 
			|| d.Letter == "VOLLEYBALL" ){
				return height - y(d.Freq); 
			}
			})

	});
};

//--------------------------------- Instantiation ----------------------------------------
$(document).ready(function() {
	loadComplaint();
	loadSubway();
	loadBuses();
	loadPark();
	loadZPID();
	loadClimate();
});