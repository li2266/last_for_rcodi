//MAP:
var map;
function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.729100, lng: -73.996500},
          zoom: 15
        });
        
        var marker = new google.maps.Marker({
        position: {lat: 40.729100, lng: -73.996500},
        map: map,
        title: 'School of economics'
        });
        loadMapShapes();
}



function loadMapShapes() {
  map.data.loadGeoJson('http://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nynta/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson');
}


//DATASETS:

const DATASET1_QUERY_URL = "https://data.cityofnewyork.us/resource/ah89-62h9.json";
var DATASET1;

function getDataFromURL( url ){
	var data = $.get( url, () => {
		console.log(url);
	})
		.done(function(){
			console.log(data);
			console.log(DATASET1=data.responseJSON[0].geo_entity_name);
			console.log(DATASET1);
		})
		.fail(function(error){
			console.error(error);
		});
}

$(document).ready(function(){
	getDataFromURL( DATASET1_QUERY_URL );
	getGeocode('Northeast Bronx');
});


function getGeocode(address){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address : address}, function (results,status){
        if (status==google.maps.GeocoderStatus.OK){
            console.log(results);
            console.log(DATASET1[0].geo_entity_name);
        }
    });
}

function getGeocodes(){
    for (i = 55; i < 97; i++) {
        getGeocode(DATASET1 [i][2]);
    }
}



//


var cheapestOption;
var listAviableOptions=[];
var listOptions=[23,32,12,55];

function getCheapestOption(){
var budget=$('#enterBudget').value;
var priceCheapestOption=Number.POSITIVE_INFINITY;
for ( var option of listOptions ){
		if (option<=budget){
		    	if (option<cheapestOption){
		    	    cheapestOption=option;
		    	}
		    listAviableOptions.push(option);
		}
	}
	 console.log(listAviableOptions);
}
