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
    getMaxTemp();
    getMinTemp();
}

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});

//---------------------------------------------------MUSEUMS DATASET AND FUNCTIONS------------------------------------------------------

var museumIcon = 'https://i.imgur.com/RVdSDPo.png';
var museumMarkers = [];

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


//---------------------------------------------VACCINATION DATASETS AND FUNCTIONS---------------------------------------------------------

var vaccinationMarkers = [];
var vaccinationIcon = "https://i.imgur.com/q0wDL3Z.png";

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

//---------------------------------------------BIKE ROUTES DATASETS AND FUNCTIONS---------------------------------------------------------

var bikeRoutesPaths=[];

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

//---------------------------------------------------ART GALLERIES DATASET AND FUNCTIONS------------------------------------------------------

var artIcon = 'https://i.imgur.com/xXl4fk7.png';
var artMarkers = [];

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

//---------------------------------------------------TEMPERATURE DATASET AND FUNCTIONS------------------------------------------------------

var maxTempArr=[];

function getMaxTemp(){
    var maxTemp = $.ajax({
    url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=tmax&units=metric&startdate=2016-01-01&enddate=2016-12-31&locationid=CITY:US360019&stationid=GHCND:USC00281335&limit=365',
    headers:{'token':'eYjeNHMGBxpRMYhExpkXBivkbGiIDvFc'}})
    
    .done(function(){
        for(i=0;i<364;i++){
            maxTempArr.push([maxTemp.responseJSON.results[i].value,maxTemp.responseJSON.results[i].date.split("T")[0]]);
        }
    actualizar();
    })
    .fail(function(error){
        console.error(error);
    });
}

var minTempArr=[];

function getMinTemp(){
    var minTemp = $.ajax({
    url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=tmin&units=metric&startdate=2016-01-01&enddate=2016-12-31&locationid=CITY:US360019&stationid=GHCND:USC00281335&limit=365',
    headers:{'token':'eYjeNHMGBxpRMYhExpkXBivkbGiIDvFc'}})
    
    .done(function(){
        for(i=0;i<365;i++){
            minTempArr.push([minTemp.responseJSON.results[i].value, minTemp.responseJSON.results[i].date.split("T")[0]]);
        }
        console.log(minTempArr);
    })
    .fail(function(error){
        console.error(error);
    });
}

function actualizar(){
    var svg = d3.select("svg");
		margin = {top: 20, right: 20, bottom: 30, left: 50},
		width = 1200 - margin.right - margin.left,
		height = 400 - margin.top - margin.bottom,
		g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var parseTime = d3.timeParse("%Y-%m-%d");
    
    console.log("2016-01-04");
    
    var x = d3.scaleTime()
		.rangeRound([0, width]);

	var y = d3.scaleLinear()
		.rangeRound([height, 0]);

	var line = d3.line()
		.x(function(data) { return x(data.date); })
		.y(function(data) { return y(data.close); })
    
    	var data = maxTempArr.map(function(data){
		return{
			date: parseTime(data[1]),
			close: data[0]
		};
            
	});
    
    
	x.domain(d3.extent(data, function(d) {return d.date; }));
	y.domain(d3.extent(data, function(d) {return d.close; }));
    
    g.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x));

	g.append("g")
		.call(d3.axisLeft(y))
		.append("text")
		.attr("fill", "#000")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy" , "0.7em")
		.text("Temperature in celsuis degrees")

	g.append("path")
		.datum(data)
		.attr("fill", "none")
		.attr("stroke", "steelblue")
		.attr("stroke-width", 1.5)
		.attr("d", line);
        console.log(data);
}

