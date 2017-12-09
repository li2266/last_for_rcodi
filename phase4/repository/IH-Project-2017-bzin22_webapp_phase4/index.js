/* Variable Declarations */
var map;
var climateApiKey = 'LOqOvbRFiRapoYybvMyINnrMoKKdgTPg';
var zillowApiKey = 'beDsmsA8nC7m5fQymG_j';

/* Variable URL's*/
var biking = false;
var transit = false;
var farmersMarket = false;
var atms = false;
var artGalleries = false;

var temp = 'https://data.cityofnewyork.us/api/geospatial/2fpa-bnsx?method=export&format=GeoJSON';

var zillowUrl = 'https://www.quandl.com/api/v3/datasets/ZILLOW/';
var nycTheatresUrl =  'https://data.cityofnewyork.us/api/geospatial/kdu2-865w?method=export&format=GeoJSON';
var nycWifiUrl = ' https://data.cityofnewyork.us/api/geospatial/a9we-mtpn?method=export&format=GeoJSON'
var nycMarketsUrl = 'https://data.cityofnewyork.us/api/geospatial/w9uz-8epq?method=export&format=GeoJSON';
var nycSubwayLines = 'https://data.cityofnewyork.us/api/geospatial/3qz8-muuu?method=export&format=GeoJSON';
var FarmersMarketUrl = 'https://data.cityofnewyork.us/api/views/j8gx-kc43/rows.json?accessType=DOWNLOAD';
var nyBikeRoutesUrl = 'https://data.ny.gov/resource/ftr4-g3cq.json';
var nySubwaysUrl = ' https://data.cityofnewyork.us/api/geospatial/drex-xx56?method=export&format=GeoJSON';
var nycArtGallerices = ' https://data.cityofnewyork.us/api/geospatial/tgyc-r5jh?method=export&format=GeoJSON';
var climateUrl = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/locations?locationid=ZIP:10003';

$.ajax({ 
    type: "GET", 
    url: nyBikeRoutesUrl,
    success: function(result) {
        JsonBikeRoutes = result;
        console.log('museums', JsonBikeRoutes);
    }, 
    error: function(result) { 
    } 
}); 

/* Functions */
$(document).ready(function(){
    
    
    $('#button4').click(function(){ /* function for Go button */
        $('html, body').animate({scrollTop:0}, 'slow');
    });
    
     $('#button1').click(function(){ /* function for the What are we button */

      var WH = $(window).height();  
      var SH = $('body').prop("scrollHeight");
      $('html, body').stop().animate({scrollTop: SH-(WH+200)}, 1000);

    });
    
    $('#button2').click(function(){ /* function for the What are we button */

      var WH = $(window).height();  
      var SH = $('body').prop("scrollHeight");
      $('html, body').stop().animate({scrollTop: SH-(WH)}, 1000);

    });
    
    $('#button3').click(function(){ /* function for the Explore button */

      var WH = $(window).height();  
      var SH = $('body').prop("scrollHeight");
      $('html, body').stop().animate({scrollTop: SH-(WH-200)}, 1000);

    }); 
    
})

function initMap() 
{
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7291, lng: -73.9965},
      zoom: 13
    });
    
}

$('#button5').click(function initMap() // pop art galleries
{
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7291, lng: -73.9965},
      zoom: 13
    });
    
   map.data.setStyle({
            fillOpacity: '0.15',
            fillColor: 'blue',
            strokeWeight: 1
        });
        map.data.loadGeoJson(nycArtGalleries);
    
});

$('#button6').click(function initMap() // city wifi hotspots
{
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7291, lng: -73.9965},
      zoom: 13
    });
    
   map.data.setStyle({
            fillOpacity: '0.15',
            fillColor: 'blue',
            strokeWeight: 1
        });
        map.data.loadGeoJson(nycWifiUrl);
    
});

$('#button7').click(function initMap() // movie theatres
{
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7291, lng: -73.9965},
      zoom: 13
    });
    
   map.data.setStyle({
            fillOpacity: '0.15',
            fillColor: 'green',
            strokeWeight: 1
        });
        map.data.loadGeoJson(nycTheatresUrl);
    
});

$('#button8').click(function initMap() // stores and markets
{
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7291, lng: -73.9965},
      zoom: 13
    });
    
   map.data.setStyle({
            fillOpacity: '0.15',
            fillColor: 'green',
            strokeWeight: 1
        });
        map.data.loadGeoJson(nycMarketsUrl);
    
});

$('#button9').click(function initMap() // subway stations
{
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7291, lng: -73.9965},
      zoom: 13
    });
    
   map.data.setStyle({
            fillOpacity: '0.15',
            fillColor: 'green',
            strokeWeight: 1
        });
        map.data.loadGeoJson(nySubwaysUrl);
    
});

$('#button10').click(function initMap() // subway lines
{
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7291, lng: -73.9965},
      zoom: 13
    });
    
   map.data.setStyle({
            fillOpacity: '0.15',
            fillColor: 'green',
            strokeWeight: 1
        });
        map.data.loadGeoJson(nycSubwayLines);
    
});


