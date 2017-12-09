const NY_COMPLAINT_DATA = "https://data.cityofnewyork.us/resource/qgea-i56i.json";
const NY_ATHLETIC_DATA = "https://data.cityofnewyork.us/resource/9wwi-sb8x.json";

var data;
var map;

var complaints = [];
var parks_Basket = [], parks_Tennis = [], parks_Volley = [];
var returnedDataSports = [];
var infoShow;

var larcenyCheck,
	robberyCheck, 
	forgeryCheck;

	
//--------------------------------- Navbar Affix ----------------------------------------
$(document).ready(function(){
    $(".navbar").affix({offset: {top: $("header").outerHeight(true)} });
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

//--------------------------------- Google Maps ----------------------------------------
function initMap() {
	map = new google.maps.Map(document.getElementById('googleMapContainer'), {
		center: {lat: 40.7291, lng: -73.9965},
		zoom: 16
	});
}

/*var iconBase = 'https://drive.google.com/uc?export=view&id=';
var icons = {
          larceny: {
            icon: iconBase + 'parking_lot_maps.png'
          },
          robbery: {
            icon: iconBase + 'library_maps.png'
          },
          forgery: {
            icon: iconBase + 'info-i_maps.png'
          },
		  basketball: {
            icon: iconBase + 'info-i_maps.png'
          },
		  tennis: {
            icon: iconBase + 'info-i_maps.png'
          },
		  volleyball: {
            icon: iconBase + 'info-i_maps.png'
          }
        };*/

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
loadComplaint();
loadPark();