//------------------------------ICONS-----------------------------------

var museumIcon = 'https://i.imgur.com/RVdSDPo.png';
var vaccinationIcon = "https://i.imgur.com/q0wDL3Z.png";
var artIcon = 'https://i.imgur.com/xXl4fk7.png';
var homeIcon = "https://i.imgur.com/iQxfhTR.png";

//------------------------------ARRAYS----------------------------------

//Climate (For D3.js)
var precpArr=[];
var minTempArr=[];
var maxTempArr=[];

//For map markers
var houseMarkers = [];
var artMarkers = [];
var bikeRoutesPaths=[];
var vaccinationMarkers = [];
var museumMarkers = [];
var firehousesMarkers = []

//-----------------GOOGLE MAPS AND INITIALIZE THINGS :B-----------------

/*Google Maps js */
var map;
var bikeLayer;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7291, lng: -73.9965},
        zoom: 13
    });
    bikeLayer = new google.maps.BicyclingLayer();
    getMuseums();
    getVaccination();
    getBikeRoutes();
    getArt();
    getFirehouse();
    getHouse();
    getMaxTemp();
    getMinTemp();
    getPrecp();
}

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});

//------------------------------------------------MUSEUMS GET DATASET AND FUNCTIONS------------------------------------------------------

function getMuseums(){
    var museums = $.get("https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD")
    .done(function(){
        for (var i = 0; i < (museums.responseJSON.data).length; i++) {
            var posStr = museums.responseJSON.data[i][8];
            var pos = posStr.split("(")[1].split(")")[0].split(" ");
            var latlng = new google.maps.LatLng(pos[1],pos[0]);
            var marker = new google.maps.Marker({
                position: latlng,
                map:map,
                icon: museumIcon
            });
            museumMarkers.push(marker);
            marker.setMap(null);
        }
    })
    .fail(function(error){
        console.error(error);
    });
}

function putMuseums(toDo){
    for(var i=0; i<museumMarkers.length;i++){
        museumMarkers[i].setMap(toDo);
    }
}

function museums(){
    if(document.getElementById("museumsButton").checked){
        putMuseums(map);
    }else{
        putMuseums(null);
    }
}


//------------------------------------------VACCINATION GET DATASETS AND FUNCTIONS---------------------------------------------------------

function getVaccination(){
    var vaccinations = $.get("https://data.cityofnewyork.us/api/views/w9ei-idxz/rows.json?accessType=DOWNLOAD")
    .done(function(){
        for(var i=0;i<(vaccinations.responseJSON.data).length;i++){
            var latlng = new google.maps.LatLng(vaccinations.responseJSON.data[i][19],vaccinations.responseJSON.data[i][20]);
            var marker = new google.maps.Marker({
                position: latlng,
                map:map,
                icon:vaccinationIcon
            });
            vaccinationMarkers.push(marker);
            marker.setMap(null);
        }
    })
    .fail(function(error){
        console.error(error);
    });
}

function putVaccination(toDo){
    for(var i=0;i<vaccinationMarkers.length;i++){
        vaccinationMarkers[i].setMap(toDo);
    }
}

function vaccination(){
    if(document.getElementById("vaccinationButton").checked){
        putVaccination(map);
    }else{
        putVaccination(null);
    }
}

//------------------------------------------BIKE GET ROUTES DATASETS AND FUNCTIONS---------------------------------------------------------

function getBikeRoutes(){
    var bikeRoutes = $.get("https://data.ny.gov/api/views/bzam-7she/rows.json?accessType=DOWNLOAD")
    
    .done(function(){
        for(var i=0;i<(bikeRoutes.responseJSON.data).length;i++){
            var walk = [];
            var posStr = bikeRoutes.responseJSON.data[i][9];
            var pos = posStr.split("((")[1].split(")")[0].split(", ");
            for(var j = 0; j<pos.length; j++){
                var lonlat = pos[j].split(" ");
                var latlon = {"lat": Number(lonlat[1]), "lng": Number(lonlat[0])};
                walk.push(latlon);
            }
            var polyline = new google.maps.Polyline({
                path: walk,
                geodesic: true,
                strokeColor: '#F39C12',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
            bikeRoutesPaths.push(polyline);
            polyline.setMap(null);
        }
        document.getElementById("bikeRules").style.display = "none";
    })
    .fail(function(error){
        console.error(error);
    });
}

function putBikeroutes(toDo){
    for(var i=0;i<bikeRoutesPaths.length;i++){
        bikeRoutesPaths[i].setMap(toDo);
    }
}

function bikeRoutes(){
    if(document.getElementById("bikeRoutesButton").checked){
        putBikeroutes(map);
        bikeLayer.setMap(map);
    }else{
        putBikeroutes(null);
        bikeLayer.setMap(null);
    }
    var x = document.getElementById("bikeRules");
    if(x.style.display === "none"){
        x.style.display = "block";
    }else{
        x.style.display = "none";
    }
}

//------------------------------------------------ART GET GALLERIES DATASET AND FUNCTIONS------------------------------------------------------

function getArt(){
    var art = $.get("https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json?accessType=DOWNLOAD")
    .done(function(){
        for (var i = 0; i < (art.responseJSON.data).length; i++) {
            var posStr = art.responseJSON.data[i][9];
            var pos = posStr.split("(")[1].split(")")[0].split(" ");
            var latlng = new google.maps.LatLng(pos[1],pos[0]);
            var marker = new google.maps.Marker({
                position: latlng,
                map:map,
                icon: artIcon
            });
            artMarkers.push(marker);
            marker.setMap(null);
        }
    })
    .fail(function(error){
        console.error(error);
    });
}

function putArt(toDo){
    for(var i=0; i<artMarkers.length;i++){
        artMarkers[i].setMap(toDo);
    }
}

function art(){
    if(document.getElementById("artButton").checked){
        putArt(map);
    }else{
        putArt(null);
    }
}

//------------------------------------------------FIREHOUSES GET DATASET AND FUNCTIONS------------------------------------------------------

function getFirehouse(){
    var firehouses = $.get("https://data.cityofnewyork.us/api/views/hc8x-tcnd/rows.json?accessType=DOWNLOAD")
    .done(function(){
        for (var i = 0; i < (firehouses.responseJSON.data).length; i++) {
            var latlng = new google.maps.LatLng(firehouses.responseJSON.data[i][12],firehouses.responseJSON.data[i][13]);
            var marker = new google.maps.Marker({
                position: latlng,
                map:map,
            });
            firehousesMarkers.push(marker);
            //.setMap(null);
            console.log(firehouses);
        }
    })
    .fail(function(error){
        console.error(error);
    });
}

function putFirehouse(toDo){
    for(var i=0; i<firehousesMarkers.length;i++){
        firehousesMarkers[i].setMap(toDo);
    }
}

function firehouse(){
    if(document.getElementById("museumsButton").checked){
        putMuseums(map);
    }else{
        putMuseums(null);
    }
}

//------------------------------------------------BUILDINGS GET DATASET AND FUNCTIONS------------------------------------------------------

function getHouse(){
    var house = $.ajax("https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD")
        .done(function(){
        for (var i = 0; i < (house.responseJSON.data).length; i++) {
            var latlng = new google.maps.LatLng(house.responseJSON.data[i][23],house.responseJSON.data[i][24]);
            var marker = new google.maps.Marker({
                position: latlng,
                map:map,
                icon: homeIcon
            });
            
            houseMarkers.push(marker);
            //marker.setMap(null);
        }
    })
    .fail(function(error){
        console.error(error);
    });
}

function putHouse(toDo){
    for(var i=0; i<artMarkers.length;i++){
        houseMarkers[i].setMap(toDo);
    }
}

function house(){
    if(document.getElementById("artButton").checked){
        putArt(map);
    }else{
        putArt(null);
    }
}

//---------------------------------------------------TEMPERATURE DATASET AND FUNCTIONS------------------------------------------------------


//-----------------------------------------------------LAST YEAR HIGHEST TEMPERATURE------------------------------------------------------

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

//-----------------------------------------------------LAST YEAR PRECIPITATIONS------------------------------------------------------


function getPrecp(){
    var precp = $.ajax({
    url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=prcp&units=metric&startdate=2016-01-01&enddate=2016-12-31&locationid=CITY:US360019&stationid=GHCND:USW00094728&limit=365',
    headers:{'token':'eYjeNHMGBxpRMYhExpkXBivkbGiIDvFc'}})
    
    .done(function(){
        for(i=0;i<precp.responseJSON.results.length;i++){
            precpArr.push([precp.responseJSON.results[i].value, precp.responseJSON.results[i].date.split("T")[0]]);
        }
        getChart();
    })
    .fail(function(error){
        console.error(error);
    });
}

function graphPrecp(){
    
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
        .y0(height)
        .y1(function(data) { return y(data.close); });
    
    	var data = precpArr.map(function(data){
		return{
			date: parseTime(data[1]),
			close: data[0]
		};
            
	});
    
    
	x.domain(d3.extent(data, function(d) {return d.date; }));
	y.domain(d3.extent(data, function(d) {return d.close; }));
    
    g.append("path")
        .datum(data)
        .attr("fill", "#E7F1FD")
		.attr("stroke", "#1878F0")
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
		.attr("transform", "translate(0," + height+ ")")
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