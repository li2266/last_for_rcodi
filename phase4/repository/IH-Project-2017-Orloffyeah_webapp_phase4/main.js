const NY_COMPLAINT_DATA = "https://data.cityofnewyork.us/resource/qgea-i56i.json";
const NY_ATHLETIC_DATA = "https://data.cityofnewyork.us/resource/9wwi-sb8x.json";
const NY_HOUSES_DATA = "https://data.cityofnewyork.us/resource/hg8x-zxpr.json";
const ZILLOW_ZWSID = "X1-ZWz1g487d81pu3_5rw5j";
//const ZILLOW_EXAMPLE_URL = "http://www.zillow.com/webservice/GetZestimate.htm?zws-id=X1-ZWz1g487d81pu3_5rw5j&zpid=55501550&rentzestimate=true";
const ZILLOW_BASE_URL = "http://www.zillow.com/webservice/GetZestimate.htm?zws-id=X1-ZWz1g487d81pu3_5rw5j&zpid=";
const ZILLOW_END_URL = "&rentzestimate=true"

var data;
var map;
var geocoder;
var address;

var complaints = [];
var parks_Basket = [], parks_Tennis = [], parks_Volley = [];
var houses = [];
var returnedDataSports = [];
var infoShow;
var zipCodes = [10001, 10003, 10009, 10011, 10012, 10013, 10014];
var zipRanges = [[0, 84], [85, 277], [278, 486], [487,666], [667, 792], [793, 1027], [1028, 1258]];

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
}

// Custom Icons Links: [Larceny, Robbery, Forgery, Basketball, Tennis, Volleyball]
var icons = ["https://i.imgur.com/RCy9w57.png?1",
			"https://i.imgur.com/EFkj6Pf.png?1",
			"https://i.imgur.com/vYm94Su.png?1",
			"https://i.imgur.com/3snebH9.png?1",
			"https://i.imgur.com/6gWrQ5K.png?1",
			"https://i.imgur.com/mEZrtDA.png?1",
			"https://i.imgur.com/D7Ue77y.png?1"]
			
//--------------------------------- Zillow Test ----------------------------------------

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
		//Duplicate to get 3 houses per ZIP area
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
			console.log("Rent: " + rent.find("amount").text());
			console.log("Address: " + latlng.find("street").text());
			console.log("Lat: " + latlng.find("latitude").text());
			console.log("Long: " + latlng.find("longitude").text());
			
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
					'<br/> Aprox. Rent: $' + rent.find("amount").text() + "/month"
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
					'<br/> Borough: ' + result.boro_nm
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
					content: '<br/> Sport: ' + marker.getTitle()
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
					content: '<br/> Sport: ' + marker.getTitle()
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
					content: '<br/> Sport: ' + marker.getTitle()
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

function getZillowData(){
	$.ajax({
		type: 'GET',
		url: zillowurl,
		contentType: 'text/plain',
		xhrFields: { ithCredentials: false },
		headers: {'Accept':'application/json'},
		dataType: 'json',
		success: function (data) {
			console.log(data);
		}
	});
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
	var svg = d3.select("svg")
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
	var svg = d3.select("svg")
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
	loadPark();
	loadZPID();
});