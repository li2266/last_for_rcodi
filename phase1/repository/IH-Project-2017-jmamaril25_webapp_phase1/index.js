$(document).ready(function(){
    
});

//******** VARIABLES ********//
//API KEYS
var climateApiKey = 'LOqOvbRFiRapoYybvMyINnrMoKKdgTPg';
var zillowApiKey = 'beDsmsA8nC7m5fQymG_j';
//var nycTransitApiKey = '';
//BASE API URLS
var climateUrl = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/';
var zillowUrl = 'https://www.quandl.com/api/v3/datasets/ZILLOW/';
//var nycTransitUrl = '';
var map;


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
}