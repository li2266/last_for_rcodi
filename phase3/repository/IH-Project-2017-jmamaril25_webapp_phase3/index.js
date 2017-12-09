//ON DOCUMENT LOAD...
$(document).ready(function() {
    $('select').material_select();
});

//******** VARIABLES ********//
//API KEYS
var zillowApiKey = 'beDsmsA8nC7m5fQymG_j';
//BASE API URLS
var climateUrl = 'https://api.weather.gov/points/40.7291,-73.9965/forecast';
var zillowUrl = 'https://www.quandl.com/api/v3/datasets/ZILLOW/';
var nycNeigborhoodsUrl = 'https://data.cityofnewyork.us/api/geospatial/cpf4-rkhq?method=export&format=GeoJSON';
var nycMuseumsUrl = 'https://data.cityofnewyork.us/resource/fn6f-htvy.json';
var nycFarmersMarketUrl = 'https://data.cityofnewyork.us/api/views/j8gx-kc43/rows.json?accessType=DOWNLOAD';
var nycCareerCentersUrl = 'https://data.ny.gov/api/views/g8h7-98zz/rows.json?accessType=DOWNLOAD';
var nycFireStationsUrl = 'https://data.ny.gov/resource/yvdw-83ff.geojson';
var nycSchoolSafetyUrl = 'https://data.cityofnewyork.us/api/views/qybk-bjjc/rows.json?accessType=DOWNLOAD';
var nycAirQualityUrl = 'https://data.cityofnewyork.us/api/views/c3uy-2p5r/rows.json?accessType=DOWNLOAD';
//API SPECIFICATIONS
var nycNeighborhoods  = ['Alphabet City', 'Battery Park City', 'Beekman Place', 'Carnegie Hill', 'Chelsea', 'Chinatown', 'Civic Center', 'Clinton', 'East Harlem', 'East Village', 'Ellis Island', 'Flatiron', 'Governors Island', 'Gramercy Park', 'Greenwich Village', 'Hamilton Heights', 'Harlem', 'Herald Square', 'Hudson Square', 'Hudson Yards', 'Inwood', 'Lenox Hill', 'Liberty Island', 'Lincoln Square', 'Little Italy', 'Lower East Side', 'Manhattan Valley', 'Manhattanville', 'Midtown', 'Morningside Heights', 'Murray Hill', 'NoHo', 'Peter Cooper Village', 'Roosevelt Island', 'SoHo', 'South Street Seaport', 'South Village', 'Stuyvesant Town', 'Sutton Place', 'Times Square', 'Tribeca', 'Tudor City', 'Turtle Bay', 'Two Bridges', 'Union Square', 'Upper East Side', 'Upper West Side', 'Wall Street', 'Washington Heights', 'West Harlem', 'West Village', 'World Trade Center', 'Yorkville'];
var zillowNycNeighborhoods = ['', 'N15845_MRPAH', 'C2308_ZRIAH', 'N562_MRPMF', 'N141_MRPAH', 'N2876_MRPMF', '', 'N279_MRPAH', 'N29_MRPAH', 'N15735_MRPAH', '', 'N15803_MRPAH', '', 'N105_MRPAH', 'N159_MRPAH', 'N15757_MRPAH', 'N27_MRPAH', '', '', 'C3830_ZRIAH', 'N15773_MRPAH', '', '', '', 'N15897_MRPAH', 'N2438_MRPAH', 'N3348_ZRIAH', 'N16085_MRPMF', 'N15831_MRPAH', 'N15765_MRPAH', 'N800_MRPAH', 'N1163_MRPAH', '', 'N11999_MRPMF', 'N750_MRP1B', '', '', 'N2426_MRPAH', 'N15820_MRPAH', '', 'N15838_MRPAH', 'N15843_MRPAH', 'N15829_MRPAH', '', '', 'N7_MRPAH', 'N4_MRPAH', '', 'N14_MRPAH', '', 'N15817_MRPAH', '', 'C6280_MVALFAH'];
//JSON OBJECTS
var climateJson;
var zillowJson;
var nycMuseumsJson;
var nycFarmersMarketJson;
var nycCareerCentersJson;
var nycFireStationsJson;
var nycSchoolSafetyJson;
var nycAirQualityJson;
//GLOBAL VARIABLES
var map;
var coordinates;
var zillowPriceAverages;
var safety = false; 
var transportation = false;
var traffic = false;
var bikePaths = false;
var museums = false;
var careerCenters = false;

//***** DATABASE REQUESTS *****//
//CLIMATE API REQUEST
$.ajax({ 
    type : "GET", 
    url : climateUrl, 
    success : function(result) { 
        climateJson = result;
        console.log('climate', climateJson);
    }, 
    error : function(result) { 
        //handle the error 
    } 
});
//ZILLOW API REQUEST
// for(var i = 0; i < nycNeighborhoods.length - 1; i++) {
//     $.ajax({ 
//         type : "GET", 
//         url : zillowUrl + zillowNycNeighborhoods[i],
//         success : function(result) { 
//             zillowJson = result;
//             console.log('zillow', zillowJson);
//         }, 
//         error : function(result) { 
//             //handle the error 
//         } 
//     });
// }
//NYC MUSEUMS DATABASE REQUEST
$.ajax({ 
    type : "GET", 
    url : nycMuseumsUrl,
    success : function(result) {
        nycMuseumsJson = result;
        console.log('museums', nycMuseumsJson);
    }, 
    error : function(result) { 
        //handle the error 
    } 
}); 
//NYC FARMERS MARKET DATABASE REQUEST
$.ajax({ 
    type : "GET", 
    url : nycFarmersMarketUrl,
    success : function(result) { 
        nycFarmersMarketJson = result;
        console.log('farmers market', nycFarmersMarketJson);
        console.log('farmers market', nycFarmersMarketJson.data[0][nycFarmersMarketJson.data[0].length-1]);
        //parseJson(nycFarmersMarketJson);
    }, 
    error : function(result) { 
        //handle the error 
    } 
}); 
//NYC CAREER CENTERS DATABASE REQUEST
$.ajax({ 
    type : "GET", 
    url : nycCareerCentersUrl,
    success : function(result) { 
        nycCareerCenterJson = result;
        console.log('career centers', nycCareerCenterJson);
    }, 
    error : function(result) { 
        //handle the error 
    } 
});
//NYC AIR QUALITY DATABASE REQUEST
$.ajax({ 
    type : "GET", 
    url : nycAirQualityUrl,
    success : function(result) { 
        nycAirQualityJson = result;
        console.log('air quality', nycAirQualityJson);
    }, 
    error : function(result) { 
        //handle the error 
    } 
});
//***** SAFETY FILTERS *****//
//NYC FIRE STATIONS DATABASE REQUEST
$.ajax({ 
    type : "GET", 
    url : nycFireStationsUrl,
    success : function(result) { 
        nycFireStationJson = result;
        console.log('fire stations', nycFireStationJson);
    }, 
    error : function(result) { 
        //handle the error 
    } 
});
//NYC SCHOOL SAFETY REPORT DATABASE REQUEST
$.ajax({ 
    type : "GET", 
    url : nycSchoolSafetyUrl,
    success : function(result) { 
        nycSchoolSafetyJson = result;
        console.log('school safety', nycSchoolSafetyJson);
    }, 
    error : function(result) { 
        //handle the error 
    } 
}); 

//CODE TO PARSE THROUGH DATA WILL GO HERE

//CODE TO TOGGLE DIFFERENT DATA LAYERS WILL GO HERE
$('#choices').on('change', function() {
    console.log('change', $(this).val());
    for(var i = 0; i < $(this).val().length; i++) {
        switch ($(this).val()[i]) {
            case '1':
                safety = true;
                break;
            case '2':
                transportation = true;
                reloadGoogleMaps();
                break;
            case '3':
                bikePaths = true;
                reloadGoogleMaps();
                break;
            case '4':
                museums = true;
                break;
            case '5':
                careerCenters = true;
                break;
        }
    }
});

function reloadGoogleMaps() {
    var thisFunc = this, map;

	thisFunc.init = function () {
		map = new google.maps.Map(d3.select("#map").node(), {
            zoom: 12,
            center: new google.maps.LatLng(40.7291, -73.9965),
            mapTypeId: 'roadmap'
        });
		
// 		if(safety) {
//             var safetyLayer = null;
//             safetyLayer.setMap(map);
//         }
        
        if(transportation) {
            var transitLayer = new google.maps.TransitLayer();
            transitLayer.setMap(map);
        }
        
        // if(traffic) {
        //     var trafficLayer = new google.maps.TrafficLayer();
        //     trafficLayer.setMap(map);
        // }
		
		if(bikePaths) {
            console.log('Path Added');
            var bikeLayer = new google.maps.BicyclingLayer();
            bikeLayer.setMap(map);
        }
        
        // if(musuems) {
        //     var museumsLayer = null;
        //     museumsLayer.setMap(map);
        // }
        
        // if(careerCenters) {
        //     var careerLayer = null;
        //     careerLayer.setMap(map);
        // }
        
        // Set the stroke width, and fill color for each polygon
        map.data.setStyle({
            fillOpacity: '0.15',
            fillColor: '#00BBD3',
            strokeWeight: 1
        });
        map.data.loadGeoJson(nycNeigborhoodsUrl);

		google.maps.event.addDomListenerOnce(map, 'idle', function () {
		    google.maps.event.addDomListener(window, 'resize', function () {
		        map.setCenter(40.7291, -73.9965);
		    });
		});
      
        
	};
    thisFunc.getMap = function() {
        return map;
    };
	thisFunc.init();
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



















