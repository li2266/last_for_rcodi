//MAP:
var map;
var airData;

function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.729100, lng: -73.996500},
          zoom: 11
        });
        
        var marker = new google.maps.Marker({
        position: {lat: 40.729100, lng: -73.996500},
        map: map,
        title: 'School of economics'
        });
    
    loadMapShapes();
    loadAirData();
    
    map.data.setStyle(styleFeature);
    
        
}

function drawDistancesArea1(){
    var cityCircle= new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.3,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.2,
            center:  {lat: 40.729100, lng: -73.996500},
            radius: 3540.56
          });
    if (area1.checked) {
     cityCircle.setMap(map);
  } else {
    cityCircle.setMap(null);
    initMap();
  }
   
}


function loadMapShapes() {
  map.data.loadGeoJson('http://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nynta/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson', 
  { idPropertyName: 'NTAName' });
    
}


function loadGeo_Json() {
        // load the requested variable from the census API (using local copies)
        var xhr = new XMLHttpRequest();
        xhr.open('GET','http://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nynta/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson');
        xhr.onload = function() {
        var geojson =  JSON.parse(xhr.responseText);
        console.log(geojson);
        };
        xhr.send();
      }




$(document).ready(function(){
//	getDataFromURL( DATASET1_QUERY_URL );
	
});

var mapToxicsValues = new Map();
var toxicsValueMin = Number.MAX_VALUE, toxicsValueMax = -Number.MAX_VALUE;

function loadAirData() {
    

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://data.cityofnewyork.us/resource/ah89-62h9.json');
        xhr.onload = function() {
          var airData = JSON.parse(xhr.responseText);
          console.log(airData);
          airData.shift(); // the first row contains column names
          airData.forEach(function(row) {
        var  entity_name = row.geo_entity_name;
        var toxicsValue = parseFloat(row.indicator_data_id);
        var year = row.year_description;
        var indicator_id = row.indicator_id;
        var geo_type_name = row.geo_type_name;
        
            if (year==2005 & indicator_id==647 & geo_type_name=="UHF42"){
            var entity_name2=String(entity_name);
            entity_name2=entity_name2.replace(/\s/g, '');
            entity_name2=entity_name2.replace(/-/g, '');
            console.log(entity_name2);
            mapToxicsValues.set(entity_name2, toxicsValue);
            // keep track of min and max values
            if (toxicsValue < toxicsValueMin) {
              toxicsValueMin = toxicsValue;
            }
            if (toxicsValue > toxicsValueMax) {
              toxicsValueMax = toxicsValue;
            }
            }
          });

        
        };
        xhr.send();
}


function styleFeature(feature) {
    
    var ntaName = feature.getProperty('NTAName');
    ntaName=ntaName.replace(/\s/g, '');
    ntaName=ntaName.replace(/-/g, '');
    console.log(ntaName);
    var toxicValue=mapToxicsValues.get(ntaName);
    
            
        var low = [5, 69, 54];  // color of smallest datum
        var high = [151, 83, 34];   // color of largest datum

        // delta represents where the value sits between the min and max
        var delta = (toxicValue - toxicsValueMin) /
            (toxicsValueMax - toxicsValueMin);

        var color = [];
        for (var i = 0; i < 3; i++) {
          // calculate an integer color based on the delta
          color[i] = (high[i] - low[i]) * delta + low[i];
        }

        // determine whether to show this shape or not
        var showRow = true;
        if (toxicValue == null ||
            isNaN(toxicValue)) {
          showRow = true;
        }

        var outlineWeight = 0.5, zIndex = 1;
        
        return {
          strokeWeight: outlineWeight,
          strokeColor: '#FF0000',
          zIndex: zIndex,
          fillColor: 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)',
          fillOpacity: 0.5,
          visible: showRow
        };
      }





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