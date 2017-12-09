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
			DATASET1=data.responseJSON;
			console.log(DATASET1);
			//getGeocodes();
		})
		.fail(function(error){
			console.error(error);
		});
}

$(document).ready(function(){
	getDataFromURL( DATASET1_QUERY_URL );
});


function getGeocodes(){
    for (i = 55; i < 97; i++) { 
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address' : DATASET1 [i][2]}, function (results,status){
        if (status==google.maps.GeocoderStatus.OK){
            console.log(results[0].geometry.location);
        }
    }
        )
}
}



//

var budget;
var cheapestOption;
var listAviableOptions;

function getCheapestOption(){
var priceCheapestOption=Number.POSITIVE_INFINITY;
for ( var option of listOptions ){
		if (priceOption<cheapestOption){
		    cheapestOption=Option;
		}
		if (priceOption<=budget){
		    listAviableOptions.push(Option);
		}
	}
}
