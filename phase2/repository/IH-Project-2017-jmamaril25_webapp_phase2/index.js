//ON DOCUMENT LOAD...
$(document).ready(function() {
    $('select').material_select();
});

//******** VARIABLES ********//
//API KEYS
var climateApiKey = 'LOqOvbRFiRapoYybvMyINnrMoKKdgTPg';
var zillowApiKey = 'beDsmsA8nC7m5fQymG_j';
//BASE API URLS
var climateUrl = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/locations?locationid=ZIP:10003';
var zillowUrl = 'https://www.quandl.com/api/v3/datasets/ZILLOW/';
var nycBikeRoutesUrl = 'https://data.ny.gov/resource/ftr4-g3cq.json';
var nycMuseumsUrl = 'https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD';
var nycFarmersMarketUrl = 'https://data.cityofnewyork.us/api/views/j8gx-kc43/rows.json?accessType=DOWNLOAD';
var nycCareerCentersUrl = 'https://data.ny.gov/api/views/g8h7-98zz/rows.json?accessType=DOWNLOAD';
var nycFireStationsUrl = 'https://data.ny.gov/api/views/qfsu-zcpv/rows.json?accessType=DOWNLOAD';
var nycSchoolSafetyUrl = 'https://data.cityofnewyork.us/api/views/qybk-bjjc/rows.json?accessType=DOWNLOAD';
var nycAirQualityUrl = 'https://data.cityofnewyork.us/api/views/c3uy-2p5r/rows.json?accessType=DOWNLOAD';
//API SPECIFICATIONS
var zillowMedianRentalGreenwich = 'N159_MRPAH.json?api_key=beDsmsA8nC7m5fQymG_j';
//GLOBAL VARIABLES
var map;

//***** DATABASE REQUESTS *****//
//CLIMATE API REQUEST
$.ajax({ 
    type : "GET", 
    url : climateUrl, 
    beforeSend: function(xhr){xhr.setRequestHeader('token', climateApiKey);},
    success : function(result) { 
        console.log('climate', result);
    }, 
    error : function(result) { 
        //handle the error 
    } 
});
//ZILLOW API REQUEST
$.ajax({ 
    type : "GET", 
    url : zillowUrl + zillowMedianRentalGreenwich,
    success : function(result) { 
        console.log('zillow', result);
    }, 
    error : function(result) { 
        //handle the error 
    } 
});
//NYC BIKE ROUTES DATABASE REQUEST
$.ajax({ 
    type : "GET", 
    url : nycBikeRoutesUrl,
    success : function(result) { 
        console.log('bike routes', result);
    }, 
    error : function(result) { 
        //handle the error 
    } 
}); 
//NYC MUSEUMS DATABASE REQUEST
$.ajax({ 
    type : "GET", 
    url : nycMuseumsUrl,
    success : function(result) { 
        console.log('museums', result);
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
        console.log('farmers market', result);
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
        console.log('career centers', result);
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
        console.log('air quality', result);
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
        console.log('fire stations', result);
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
        console.log('school safety', result);
    }, 
    error : function(result) { 
        //handle the error 
    } 
}); 

//CODE TO PARSE THROUGH DATA WILL GO HERE

//CODE TO USE D3 TO DISPLAY DATA WILL GO HERE
// LOOP THROUGH DATA AND PUT OVERLAY ONTO THE MAP 
window.eqfeed_callback = function(results) {
  for (var i = 0; i < results.features.length; i++) {
    var coords = results.features[i].geometry.coordinates;
    var latLng = new google.maps.LatLng(coords[1],coords[0]);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }
};

//CODE TO TOGGLE DIFFERENT DATA LAYERS WILL GO HERE

//INITIALIZE GOOGLE MAP
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: new google.maps.LatLng(40.7291, -73.9965),
    mapTypeId: 'roadmap'
  });

  // Create a <script> tag and set the USGS URL as the source.
  var script = document.createElement('script');
  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
  document.getElementsByTagName('head')[0].appendChild(script);
}