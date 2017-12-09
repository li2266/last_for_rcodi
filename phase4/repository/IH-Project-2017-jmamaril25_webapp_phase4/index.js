//ON DOCUMENT LOAD...
$(document).ready(function() {
    $('select').material_select();
});

//******** VARIABLES ********//
//API DETAILS
var nycNeigborhoodsUrl = 'https://data.cityofnewyork.us/api/geospatial/cpf4-rkhq?method=export&format=GeoJSON';
var nycNeighborhoods  = ['Alphabet City', 'Battery Park City', 'Beekman Place', 'Carnegie Hill', 'Chelsea', 'Chinatown', 'Civic Center', 'Clinton', 'East Harlem', 'East Village', 'Ellis Island', 'Flatiron', 'Governors Island', 'Gramercy Park', 'Greenwich Village', 'Hamilton Heights', 'Harlem', 'Herald Square', 'Hudson Square', 'Hudson Yards', 'Inwood', 'Lenox Hill', 'Liberty Island', 'Lincoln Square', 'Little Italy', 'Lower East Side', 'Manhattan Valley', 'Manhattanville', 'Midtown', 'Morningside Heights', 'Murray Hill', 'NoHo', 'Peter Cooper Village', 'Roosevelt Island', 'SoHo', 'South Street Seaport', 'South Village', 'Stuyvesant Town', 'Sutton Place', 'Times Square', 'Tribeca', 'Tudor City', 'Turtle Bay', 'Two Bridges', 'Union Square', 'Upper East Side', 'Upper West Side', 'Wall Street', 'Washington Heights', 'West Harlem', 'West Village', 'World Trade Center', 'Yorkville'];
var zillowNycNeighborhoods = ['', 'N15845_MRPAH', 'C2308_ZRIAH', 'N562_MRPMF', 'N141_MRPAH', 'N2876_MRPMF', '', 'N279_MRPAH', 'N29_MRPAH', 'N15735_MRPAH', '', 'N15803_MRPAH', '', 'N105_MRPAH', 'N159_MRPAH', 'N15757_MRPAH', 'N27_MRPAH', '', '', 'C3830_ZRIAH', 'N15773_MRPAH', '', '', '', 'N15897_MRPAH', 'N2438_MRPAH', 'N3348_ZRIAH', 'N16085_MRPMF', 'N15831_MRPAH', 'N15765_MRPAH', 'N800_MRPAH', 'N1163_MRPAH', '', 'N11999_MRPMF', 'N750_MRP1B', '', '', 'N2426_MRPAH', 'N15820_MRPAH', '', 'N15838_MRPAH', 'N15843_MRPAH', 'N15829_MRPAH', '', '', 'N7_MRPAH', 'N4_MRPAH', '', 'N14_MRPAH', '', 'N15817_MRPAH', '', 'C6280_MVALFAH'];
var zillowApiKey = '.json?api_key=beDsmsA8nC7m5fQymG_j';
//GLOBAL VARIABLES
var map;
var coordinates;
var zillowPriceAverages;
//OBJECTS
var climate = {name: 'Climate', url: 'https://api.weather.gov/points/40.7291,-73.9965/forecast', json: climateJson = {}, isActive: false};
var zillow = {name: 'Zillow', url: 'https://www.quandl.com/api/v3/datasets/ZILLOW/', json: zillowJson = {}, isActive: false};
var safety = {name: 'Safe', url: 'https://data.ny.gov/resource/yvdw-83ff.geojson', json: safetyJson = {}, isActive: false};
var transportation = {name: 'Transportation', url: '', isActive: false};
var traffic = {name: 'Traffic', url: '', isActive: false};
var bikePaths = {name: 'Bike Paths', url: '', isActive: false};
var museums = {name: 'Museums', url: 'https://data.cityofnewyork.us/api/geospatial/ekax-ky3z?method=export&format=GeoJSON', json: nycMuseumsJson = {}, isActive: false};
var careerCenters = {name: 'CareerCenters', url: 'https://data.ny.gov/api/views/g8h7-98zz/rows.json?accessType=DOWNLOAD', json: careerCentersJson = {}, isActive: false};
var farmersMarkets = {name: 'Farmer\'s Markets', url: 'https://data.cityofnewyork.us/api/views/j8gx-kc43/rows.json?accessType=DOWNLOAD', json: farmersMarketJson = {}, isActive: false};
var airQuality = {name: 'Air Quality', url: 'https://data.cityofnewyork.us/api/views/c3uy-2p5r/rows.json?accessType=DOWNLOAD', json: airQualityJson = {}, isActive: false};

//***** DATABASE REQUESTS *****//
//CLIMATE API REQUEST
$.ajax({ 
    type : "GET", 
    url : climate.url, 
    success : function(result) { 
        climate.json = result;
        console.log('climate', climate.json);
        updateWeather();
    }, 
    error : function(result) { 
        //handle the error 
    } 
});
//ZILLOW API REQUEST
$.ajax({ 
    type : "GET", 
    url : zillow.url + zillowNycNeighborhoods[1] + zillowApiKey,
    success : function(result) {
        zillow.json = result;
        console.log('zillow', zillow.json);
    }, 
    error : function(result) { 
        //handle the error 
    } 
}); 
//NYC MUSEUMS DATABASE REQUEST
$.ajax({ 
    type : "GET", 
    url : museums.url,
    success : function(result) {
        museums.json = result;
        console.log('museums', museums.json);
    }, 
    error : function(result) { 
        //handle the error 
    } 
}); 
//NYC FARMERS MARKET DATABASE REQUEST
$.ajax({ 
    type : "GET", 
    url : farmersMarkets.url,
    success : function(result) { 
        farmersMarkets.json = result;
        //parseJson(nycFarmersMarketJson);
    }, 
    error : function(result) { 
        //handle the error 
    } 
}); 
//NYC CAREER CENTERS DATABASE REQUEST
$.ajax({ 
    type : "GET", 
    url : careerCenters.url,
    success : function(result) { 
        careerCenters.json = result;
        console.log('career centers', careerCenters.json);
    }, 
    error : function(result) { 
        //handle the error 
    } 
});
//NYC AIR QUALITY DATABASE REQUEST
$.ajax({ 
    type : "GET", 
    url : airQuality.url,
    success : function(result) { 
        airQuality.json = result;
        console.log('air quality', airQuality.json);
    }, 
    error : function(result) { 
        //handle the error 
    } 
});
//***** SAFETY FILTERS *****//
//NYC FIRE STATIONS DATABASE REQUEST
$.ajax({ 
    type : "GET", 
    url : safety.url,
    success : function(result) { 
        safety.json = result;
        console.log('fire stations', safety.json);
    }, 
    error : function(result) { 
        //handle the error 
    } 
});

//UPDATE THE DAILY BRIEFING
function updateWeather() {
    var name;
    var desc;
    var temp;
    for(var i = 0; i < 3; i++) {
        name = climate.json.properties.periods[i].name;
        desc = climate.json.properties.periods[i].shortForecast;
        temp = climate.json.properties.periods[i].temperature;
        $('#weather').append('<li><strong>' + name + ': </strong>' + desc + ' - ' + temp + '&#8457;' + '</li>');
    }
}

//CODE TO TOGGLE DIFFERENT DATA LAYERS WILL GO HERE
$('#choices').on('change', function() {
    var array = [];
    for (var i = 0; i < $(this).val().length; i++) {
        array.push($(this).val()[i]);
    }
    
    if (array.indexOf('1') > -1) {
        if(!(safety.isActive))
            $('#safety').fadeIn().css("display", "inline-block");
        safety.isActive = true;
    }
    else {
        if(safety.isActive)
            $('#safety').fadeOut();
        safety.isActive = false;
    }
    if (array.indexOf('2') > -1) {
        if(!(transportation.isActive))
            $('#subway').fadeIn().css("display", "inline-block");
        transportation.isActive = true;
    }
    else {
        if(transportation.isActive)
            $('#subway').fadeOut();
        transportation.isActive = false;
    }
    if (array.indexOf('3') > -1) {
        if(!(traffic.isActive))
            $('#traffic').fadeIn().css("display", "inline-block");
        traffic.isActive = true;
    }
    else {
        if(traffic.isActive)
            $('#traffic').fadeOut();
        traffic.isActive = false;
    }
    if (array.indexOf('4') > -1) {
        if(!(bikePaths.isActive))
            $('#bike-paths').fadeIn().css("display", "inline-block");
        bikePaths.isActive = true;
    }
    else {
        if(bikePaths.isActive)
            $('#bike-paths').fadeOut();
        bikePaths.isActive = false;
    }
    if (array.indexOf('5') > -1) {
        if(!(museums.isActive))
            $('#museums').fadeIn().css("display", "inline-block");
        museums.isActive = true;
    }
    else {
        if(museums.isActive)
            $('#museums').fadeOut();
        museums.isActive = false;
    }
    if (array.indexOf('6') > -1) {
        if(!(careerCenters.isActive))
            $('#career-centers').fadeIn().css("display", "inline-block");
        careerCenters.isActive = true;
    }
    else {
        if(careerCenters.isActive)
            $('#career-centers').fadeOut();
        careerCenters.isActive = false;
    }
    if (array.indexOf('7') > -1) {
        if(!(farmersMarkets.isActive))
            $('#farmers-markets').fadeIn().css("display", "inline-block");
        farmersMarkets.isActive = true;
    }
    else {
        if(farmersMarkets.isActive)
            $('#farmers-markets').fadeOut();
        farmersMarkets.isActive = false;
    }
    
    console.log(array);
    reloadGoogleMaps();
});

//UPDATES THE GOOGLE MAP TO REFLECT THE ADDED FILTERS
function reloadGoogleMaps() {
    var thisFunc = this, map;

	thisFunc.init = function () {
		map = new google.maps.Map(d3.select("#map").node(), {
            zoom: 12,
            center: new google.maps.LatLng(40.7291, -73.9965),
            mapTypeId: 'roadmap'
        });
		
		if(safety.isActive) {
            map.data.loadGeoJson(safety.url);
        }
        
        if(transportation.isActive) {
            var transitLayer = new google.maps.TransitLayer();
            transitLayer.setMap(map);
        }
        
        if(traffic.isActive) {
            var trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);
        }
		
		if(bikePaths.isActive) {
            var bikeLayer = new google.maps.BicyclingLayer();
            bikeLayer.setMap(map);
        }
        
        if(museums.isActive) {
            map.data.loadGeoJson(museums.url);
        }
        
        if(careerCenters.isActive) {
            
        }
        
        if(farmersMarkets.isActive) {
            for (var i = 1; i < farmersMarkets.json.data.length-1; i++) {
                var latitude = parseFloat(farmersMarkets.json.data[i][farmersMarkets.json.data[i].length-2]);
                var longitude = parseFloat(farmersMarkets.json.data[i][farmersMarkets.json.data[i].length-1]);
                addMarker({lat: latitude, lng: longitude});
            }
        }
        
        // Set the stroke width, and fill color for each polygon
        map.data.setStyle({
            fillOpacity: '0.15',
            fillColor: '#00BBD3',
            strokeWeight: 1
        });
        
        map.data.loadGeoJson(nycNeigborhoodsUrl);

		google.maps.event.addDomListenerOnce(map, 'idle', function () {
		    google.maps.event.addDomListener(window, 'resize', function () {
		        map.setCenter(new google.maps.LatLng(40.7291, -73.9965));
		    });
		});
	};
	
    thisFunc.getMap = function() {
        return map;
    };
	thisFunc.init();
}

function addMarker(coords) {
    var marker = new google.maps.Marker({
        position: coords,
        map: map
    });
}

//INITIALIZE GOOGLE MAP
function initMap() {
    map = new google.maps.Map(d3.select("#map").node(), {
        zoom: 12,
        center: new google.maps.LatLng(40.7291, -73.9965),
        mapTypeId: 'roadmap'
    });
    
    map.data.setStyle({
            fillOpacity: '0.15',
            fillColor: '#00BBD3',
            strokeWeight: 1
        });
        
    map.data.loadGeoJson(nycNeigborhoodsUrl);
}



















