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
        
        map.data.setStyle(function(feature) {
 return {
 fillColor: getColor(feature.getProperty('Shape__Length')), // call function to get color for state based on the COLI (Cost of Living Index)
 fillOpacity: 0.8,
 strokeColor: '#b3b3b3',
 strokeWeight: 1,
 zIndex: 1
 };
});
        
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
			console.log(data.responseJSON[0].geo_entity_name);
			DATASET1=data.responseJSON;
			
		})
		.fail(function(error){
			console.error(error);
		});
}

$(document).ready(function(){
//	getDataFromURL( DATASET1_QUERY_URL );
	loadAirData();
});

var toxicsValueMin = Number.MAX_VALUE, toxicsValueMax = -Number.MAX_VALUE;

function loadAirData() {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://data.cityofnewyork.us/resource/ah89-62h9.json');
        xhr.onload = function() {
          var censusData = JSON.parse(xhr.responseText);
          censusData.shift(); // the first row contains column names
          censusData.forEach(function(row) {
            
            var  entity_name = row.geo_entity_name;
            var toxicsValue = parseFloat(row.indicator_data_id);
            
            console.log(entity_name);
            console.log(toxicsValue);
            // keep track of min and max values
            if (toxicsValue < toxicsValueMin) {
              toxicsValueMin = toxicsValue;
            }
            if (toxicsValue > toxicsValueMax) {
              toxicsValueMax = toxicsValue;
            }
            
            map.data.forEach(function(feature) {
                var neiberhoodName=feature.getProperty("NTAName");
                
                if(neiberhoodName==entity_name){
                    feature.setProperty('Shape__Length', toxicsValue);
                    
                }
            });

          
          
          });

        
        };
        xhr.send();
}






// returns a color based on the value given when the function is called
function getColor(coli) {

 return coli >= 121 ? '#89a844' :
 coli > 110 ? '#acd033' :
 coli > 102.5 ? '#cbd97c' :
 coli > 100 ? '#c2c083' :
 '#d1ccad';
}

/*
function loadAirData() {
           for (i = 55; i < 97; i++) {
            console.log(DATASET1);
            var  entity_name = DATASET1 [i].geo_entity_name;
            var toxicsValue = parseFloat(DATASET1 [i].indicator_data_id);
            
            // keep track of min and max values
            if (toxicsValue < toxicsValueMin) {
              toxicsValueMin = toxicsValue;
            }
            if (toxicsValue > toxicsValueMax) {
              toxicsValueMax = toxicsValue;
            }
            
            map.data.forEach(function(feature) {
                var neiberhoodName=feature.getProperty("NTAName");
                if(neiberhoodName==entity_name){
                    feature.setProperty('Shape__Length', toxicsValue);
                }
            });
           }

        
        };
*/

function getGeocode(address){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address : address}, function (results,status){
        if (status==google.maps.GeocoderStatus.OK){
            console.log(results);
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
var budget=$('#inputBudget').value;
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

function bestOption(){
    var priority1=$('#inputPriorityCriteria1').value;
    var priority2=$('#inputPriorityCriteria2').value;
    var priority3=$('#inputPriorityCriteria3').value;
    var priority4=$('#inputPriorityCriteria4').value;
}