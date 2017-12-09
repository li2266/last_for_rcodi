var slider = new Slider("#radiusSlider");
slider.on("slide", function(sliderValue) {
	document.getElementById("sliderVal").textContent = sliderValue;
});

var precpArr=[];
var minTempArr=[];
var maxTempArr=[];


var museumIcon = 'https://i.imgur.com/jl7bwH0.png';
var museumMarkers = [];

 function getMuseums(){
    var museums = $.get("https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD")
    .done(function(){
        for (var i = 0; i < (museums.responseJSON.data).length; i++) {
            var name = museums.responseJSON.data[i][9];
            var posStr = museums.responseJSON.data[i][8];
            
            var pos = posStr.split("(")[1].split(")")[0].split(" ");
            var latlng = new google.maps.LatLng(pos[1],pos[0]);
            var marker = new google.maps.Marker({
                position: latlng,
                map:map,
                icon: museumIcon,
                title: name
            });
            museumMarkers.push(marker);
            marker.setMap(null);
        }
    })
    .fail(function(error){
        console.error(error);
    });
}

var fireIcon = "https://i.imgur.com/Ut6dYqk.png";
var fireMarkers = [];
function getFireStations(){
    
    var stations = $.get("https://data.cityofnewyork.us/resource/byk8-bdfw.json")
    .done(function(){
        data = stations.responseJSON;
        for (var i = 0; i < data.length; i++) {
            var latlng = new google.maps.LatLng(data[i].latitude, data[i].longitude);
            var marker = new google.maps.Marker({
                position: latlng,
                map:map,
                icon: fireIcon,
                title: data[i].facilityname
            });
            fireMarkers.push(marker);
            marker.setMap(null); 
        } 
    })
    .fail(function(error){
        console.error(error);
    });
}

function getHouses(){
var houseMarkers = [];   
    var houses = $.get("https://data.cityofnewyork.us/resource/ffxx-dfvk.json")
    .done(function(){
        data = houses.responseJSON;
        for (var i = 0; i < data.length; i++) {
            var a = data[i].location_street_a;
            var b = data[i].location_street_b;
            var c = data[i].location_street_c;
            var d = data[i].location_street_d;  
            if ((c !== undefined)&&(d !== undefined)){
               var address = a+b+c+d;   
            }
            else {
               var address = a+b; 
            }
            var rent = data[i].avg_monthly_gross_rent;
            var latlng;
            	var geocoder = new google.maps.Geocoder();
            	geocoder.geocode( { 'address' : address}, function(results, status){
            		if(status == google.maps.GeocoderStatus.OK){
            		    
            		    var marker = new google.maps.Marker({
                            position: (results[0].geometry.location),
                            map:map,
                            title: rent
                        });
                        houseMarkers.push(marker);
            		   
            		};
            	});
        }
        
    })
    .fail(function(error){
        console.error(error);
    });
}

var coordinates = []
var boundariesPolygons = [];
function getBoundaries(){
    var boundaries = $.get("https://data.cityofnewyork.us/resource/7t3b-ywvw.json")
    .done(function(){
        data = boundaries.responseJSON;
        for (var i = 0; i < data.length; i++) {
            var boro_coord = data[i].the_geom.coordinates[0];
            coordinates.push(boro_coord);
        }
        console.log(coordinates);
        /*
        var bermudaTriangle = new google.maps.Polygon({
          paths: coordinates,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: '#FF0000',
          fillOpacity: 0.35
        });
        bermudaTriangle.setMap(map); */
    })
    .fail(function(error){
        console.error(error);
    });
}

var vaccineIcon = "https://i.imgur.com/SJAJLMZ.png";
var vaccineMarkers = [];
function getVaccineLocations(){
    var vaccines = $.get("https://data.cityofnewyork.us/api/views/w9ei-idxz/rows.json?accessType=DOWNLOAD")
    .done(function(){
        data = vaccines.responseJSON.data;
        for (var i = 0; i < data.length; i++) {
            var latlng = new google.maps.LatLng(data[i][19],data[i][20]);
            var marker = new google.maps.Marker({
                position: latlng,
                map:map,
                icon: vaccineIcon,
                title: data[i][15]
            });
            vaccineMarkers.push(marker);
            marker.setMap(null);
        } 
    })
    .fail(function(error){
        console.error(error);
    });
}

var museums_on = false;
function putMuseums(){
    if (museums_on === false){
        for(var i=0; i<museumMarkers.length;i++){
            museumMarkers[i].setMap(
                map);
        }
        museums_on = true;
    }
    else{
        for(var j=0; j<museumMarkers.length;j++){
            museumMarkers[j].setMap(null);
        }
        museums_on = false;
    }
}

var fireStations_on = false;
function putFireStations(){
    if (fireStations_on === false){
        for(var i=0; i<fireMarkers.length;i++){
            fireMarkers[i].setMap(map);
        }
        fireStations_on = true;
    }
    else{
        for(var j=0; j<fireMarkers.length;j++){
            fireMarkers[j].setMap(null);
        }
        fireStations_on = false;
    }
}

var vaccines_on = false;
function putVaccineLocations(){
    if (vaccines_on === false){
        for(var i=0; i<vaccineMarkers.length;i++){
            vaccineMarkers[i].setMap(map);
        }
        vaccines_on = true;
    }
    else{
        for(var j=0; j<vaccineMarkers.length;j++){
            vaccineMarkers[j].setMap(null);
        }
        vaccines_on = false;
    }
}


// --------BIKE ROUTES

bikePath_on = false;
function bikeLayers() {
    if (bikePath_on === false){
        bikeLayer.setMap(map);
        bikePath_on = true;
    } else {
        bikeLayer.setMap(null);
        bikePath_on = false;
    }
}


// ---------- WEATHER INFORMATION

function getMaxTemp(){
    var maxTemp = $.ajax({
    url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=tmax&units=metric&startdate=2016-01-01&enddate=2016-12-31&locationid=CITY:US360019&stationid=GHCND:USW00094728&limit=365',
    headers:{'token':'eYjeNHMGBxpRMYhExpkXBivkbGiIDvFc'}})
    
    .done(function(){
        for(i=0;i<maxTemp.responseJSON.results.length;i++){
            maxTempArr.push([maxTemp.responseJSON.results[i].value,maxTemp.responseJSON.results[i].date.split("T")[0]]);
        }

    })
    .fail(function(error){
        console.error(error);
    });
}  

function graphMaxTemp(){
    
    var svg = d3.select("svg");
		margin = {top: 10,right: $(window).width()*0.05, bottom: 10, left: $(window).width()*0.05},
		width = $(window).width() - margin.right - margin.left,
		height = 500 - margin.top - margin.bottom,
		g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var parseTime = d3.timeParse("%Y-%m-%d");

    var area = d3.area()
        .x(function(data) { return x(data.date); })
        .y0(height*0.669)
        .y1(function(data) { return y(data.close); });

	var x = d3.scaleTime()
		.rangeRound([0, width*0.9]);

	var y = d3.scaleLinear()
		.rangeRound([height, 0]);
    
    var data = maxTempArr.map(function(data){
		return{
			date: parseTime(data[1]),
			close: data[0]
		};
            
	});
    
	x.domain(d3.extent(data, function(d) {return d.date; }));
	y.domain([-20,40]);

	g.append("path")
        .datum(data)
        .attr("fill", "#FFF5CC")
		.attr("stroke", "#FFCC00")
		.attr("stroke-width", 1.5)
        .attr("d", area);
		
    g.append("g")
		.call(d3.axisLeft(y))
		.append("text")
		.attr("fill", "#000")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy" , "0.7em")
		.text("Temperature in celsuis degrees");

	g.append("g")
		.call(d3.axisBottom(x))
		.attr("transform", "translate(0," + height*0.669 + ")");

}

//-----------------------------------------------------LAST YEAR LOWEST TEMPERATURE------------------------------------------------------


function getMinTemp(){
    var minTemp = $.ajax({
    url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=tmin&units=metric&startdate=2016-01-01&enddate=2016-12-31&locationid=CITY:US360019&stationid=GHCND:USW00094728&limit=365',
    headers:{'token':'eYjeNHMGBxpRMYhExpkXBivkbGiIDvFc'}})
    
    .done(function(){
        for(i=0;i<minTemp.responseJSON.results.length;i++){
            minTempArr.push([minTemp.responseJSON.results[i].value, minTemp.responseJSON.results[i].date.split("T")[0]]);
        }
    })
    .fail(function(error){
        console.error(error);
    });
}

function graphMinTemp(){
    
    var svg = d3.select("svg");
		margin = {top: 10,right: $(window).width()*0.05, bottom: 10, left: $(window).width()*0.05},
		width = $(window).width() - margin.right - margin.left,
		height = 500 - margin.top - margin.bottom,
		g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var parseTime = d3.timeParse("%Y-%m-%d");
    
    var x = d3.scaleTime()
		.rangeRound([0, width*0.9]);

	var y = d3.scaleLinear()
		.rangeRound([height, 0]);

    var area = d3.area()
        .x(function(data) { return x(data.date); })
        .y0(height*0.669)
        .y1(function(data) { return y(data.close); });
    
    	var data = minTempArr.map(function(data){
		return{
			date: parseTime(data[1]),
			close: data[0]
		};
            
	});
    
    
	x.domain(d3.extent(data, function(d) {return d.date; }));
	y.domain([-20,40]);
    
    g.append("path")
        .datum(data)
        .attr("fill", "#FFF5CC")
		.attr("stroke", "#FFCC00")
		.attr("stroke-width", 1.5)
        .attr("d", area);
    
    g.append("g")
		.call(d3.axisLeft(y))
		.append("text")
		.attr("fill", "#000")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy" , "0.7em")
		.text("Temperature in celsuis degrees");

	g.append("g")
		.attr("transform", "translate(0," + height*0.669 + ")")
		.call(d3.axisBottom(x));
}

//-----------------------------------------------------PAINT CLIMATE CHARTS----------------------------------------------------------


function getChart(){
    d3.select("svg").text("")
    if(document.getElementById("selectChart").value == "minTemp"){
        graphMinTemp();
    }else if(document.getElementById("selectChart").value == "maxTemp"){
        graphMaxTemp();
    }else{
        graphPrecp();
    }
}

// --------GOOGLE MAPS

var map;
var bikeLayer
function onGoogleMapResponse () {
    var NYU = {lat: 40.7291, lng: -73.9965};
    map = new google.maps.Map(document.getElementById('googleMapContainer'), {
        center: (NYU),
        zoom: 14
    });
    
    var marker = new google.maps.Marker({
        position: NYU,
        map:map,
        title: "NYU Stern School of Business"
    });
    
    bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(null);
    
    getMuseums();
    getFireStations();
    getVaccineLocations();
    getBoundaries();
    getMaxTemp();
    getMinTemp();
    getHouses();
    
    var cityCircle = new google.maps.Circle({
          strokeColor: '#ffd21e',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#ffd21e',
          fillOpacity: 0.25,
          map: map,
          center: (NYU),
          radius: 0
        });
        
        
    
    
        
    //SLider for changing what "Near" means.
    slider.on("slide", function(sliderValue) {
        cityCircle.setRadius(parseFloat(parseInt(document.getElementById("sliderVal").textContent)) * 1609.43);
        //cityCircle.setRadius(parseInt(document.getElementById("sliderVal").textContent) * 1000);
    });

}

function centerMap(){
    map.setCenter({lat: 40.7291, lng: -73.9965});
}


// ----------Buttons

$(document).ready(function(){
    $("#museumsButton").on("click", putMuseums);
    $("#fireButton").on("click", putFireStations);
    $("#vaccineButton").on("click", putVaccineLocations);
    $("#pathsButton").on("click", bikeLayers);
    $("#crimesButton").on("click", centerMap);
    
});