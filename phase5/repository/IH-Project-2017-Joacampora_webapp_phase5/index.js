//DataSets
var MUSEUMS_DATA = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json";
var ART_DATA = "https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json";
var VACCINATION_DATA = "https://data.cityofnewyork.us/api/views/w9ei-idxz/rows.json";
var FIREDEP_DATA = "https://data.cityofnewyork.us/resource/byk8-bdfw.json";
var HOUSING_DATA = "https://data.cityofnewyork.us/resource/ffxx-dfvk.json";
//

//Variebles para Capas del mapa
var map;
var geocoder;
var bikeLayer;
var transitLayer;
var trafficLayer;
var showBikes = false;
var sTransit = false;
var sTraffic = false;

//Variables para marcadores
var i;
var sMuseums=false;
var sArt=false;
var sVac=false;
var sFire=false;


//MAPA
function onGoogleMapResponse() {
    var NYU = {lat: 40.729513, lng: -73.996461};
	map = new google.maps.Map(document.getElementById('googleMapContainer'), {
	zoom: 15,
    center: NYU
	});
	var marker = new google.maps.Marker({
        position: NYU,
        map: map,
        icon:"https://i.imgur.com/cbZ13g7.png"
        });
        geocoder = new google.maps.Geocoder();
        bikeLayer = new google.maps.BicyclingLayer();
        transitLayer = new google.maps.TransitLayer();
        trafficLayer = new google.maps.TrafficLayer();
        getMuseums();
        getArt();
        getVaccination();
        getFireDep();
        getDatas();
}
//geocoder
function geocodeAddress(geocoder, resultsMap, address) {
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
}
      


//Funciones para Capas del mapa
function bikeRoutes(){
    if(!showBikes){
        bikeLayer.setMap(map);
        showBikes=true;
    }else{
        bikeLayer.setMap(null);
        showBikes=false;
    }
}
function showTransit(){
    if(!sTransit){
        transitLayer.setMap(map);
        sTransit=true;
    }else{
        transitLayer.setMap(null);
        sTransit=false;
    }
}function showTraffic(){
    if(!sTraffic){
        trafficLayer.setMap(map);
        sTraffic=true;
    }else{
        trafficLayer.setMap(null);
        sTraffic=false;
    }
}


//Ubicar museos
var museumMarkers = [];
function getMuseums(){
    var data = $.get(MUSEUMS_DATA)
		.done( function(){
			//console.log(data);
			for (i = 0; i < data.responseJSON.data.length; i++) {
                if(data.responseJSON.data[i][14] == "New York"){
                    var positionsI = data.responseJSON.data[i][8];
                    var positions = positionsI.split("(")[1].split(")")[0].split(" ");
                    var latLong = new google.maps.LatLng(positions[1], positions[0]);
                    var newMarker = new google.maps.Marker({
                        position: latLong,
                        map: map,
                        title: data.responseJSON.data[i][9],
                        icon:"https://i.imgur.com/qntP1jw.png"
                        
                    });
                    museumMarkers.push(newMarker);
                    newMarker.setMap(null);
                 }
            }
        })
		.fail(function(error){console.error(error);});
}
function showMuseums(){
    if(!sMuseums){
        for(i=0; i<museumMarkers.length;i++){
        museumMarkers[i].setMap(map);
    }
        sMuseums=true;
    }else{
        for(i=0; i<museumMarkers.length;i++){
        museumMarkers[i].setMap(null);
        }
        sMuseums=false;
    }
}

// Ubicar Galerias de arte

var artMarkers = [];
function getArt(){
    var data = $.get(ART_DATA)
			.done( function(){
			//console.log(data);
			for (i = 0; i < data.responseJSON.data.length; i++) {
                if(data.responseJSON.data[i][14] == "New York"){
                    var positionsI = data.responseJSON.data[i][9];
                    var positions = positionsI.split("(")[1].split(")")[0].split(" ");
                    var latLong = new google.maps.LatLng(positions[1], positions[0]);
                    var newMarker = new google.maps.Marker({
                        position: latLong,
                        map: map,
                        title: data.responseJSON.data[i][8],
                        icon:"https://i.imgur.com/RrUGHzG.png"
                        
                    });
                    artMarkers.push(newMarker);
                    newMarker.setMap(null);
                 }
            }
        })
		.fail(function(error){console.error(error);});
}
function showArt(){
    if(!sArt){
        for(i=0; i<artMarkers.length;i++){
        artMarkers[i].setMap(map);
    }
        sArt=true;
    }else{
        for(i=0; i<artMarkers.length;i++){
        artMarkers[i].setMap(null);
        }
        sArt=false;
    }
}

//Ubicar punto de vacunación
var vacMarkers = [];
function getVaccination(){
    var data = $.get(VACCINATION_DATA)
			.done( function(){
			//console.log(data);
			for (i = 0; i < data.responseJSON.data.length; i++) {
                if(data.responseJSON.data[i][17] == "NEW YORK"){
                    var lat = data.responseJSON.data[i][19];
                    var lng = data.responseJSON.data[i][20];
                    var position = new google.maps.LatLng(lat, lng);
                    var newMarker = new google.maps.Marker({
                        position: position,
                        map: map,
                        title: data.responseJSON.data[i][33][0][1],
                        icon: "https://i.imgur.com/JyA6rNR.png"
                    });
                    vacMarkers.push(newMarker);
                    newMarker.setMap(null);
                 }
            }
        })
		.fail(function(error){console.error(error);});
}
function showVac(){
    if(!sVac){
        for(i=0; i<vacMarkers.length;i++){
        vacMarkers[i].setMap(map);
    }
        sVac=true;
    }else{
        for(i=0; i<vacMarkers.length;i++){
        vacMarkers[i].setMap(null);
        }
        sVac=false;
    }
}
//Ubicar departamentos de bomberos

var fireMarkers = [];
function getFireDep(){
    var data = $.get(FIREDEP_DATA)
			.done( function(){
			   // console.log(data);
			    for (i = 0; i < data.responseJSON.length; i++) {
			        if((data.responseJSON[i]).borough=="Manhattan"){
                        var latLong = new google.maps.LatLng((data.responseJSON[i]).latitude, (data.responseJSON[i]).longitude);
                        var newMarker = new google.maps.Marker({
                            position: latLong,
                            map: map,
                            title: (data.responseJSON[i]).nta,
                            icon:"https://i.imgur.com/ZRdi4SA.png"
                        
                    });
                    fireMarkers.push(newMarker);
                    newMarker.setMap(null);
			    }
                
            }
        })
		.fail(function(error){console.error(error);});
}
function showFireDep(){
    if(!sFire){
        for(i=0; i<fireMarkers.length;i++){
        fireMarkers[i].setMap(map);
    }
        sFire=true;
    }else{
        for(i=0; i<fireMarkers.length;i++){
        fireMarkers[i].setMap(null);
        }
        sFire=false;
    }
}

//House
var houseMarkers = [];
var aux =[];
function getDatas(){
    var data = $.get(HOUSING_DATA)
			.done( function(){
			    //console.log(data);
			    for (i = 0; i < data.responseJSON.length; i++) {
                    var dir = (data.responseJSON[i]).location_street_a+(data.responseJSON[i]).location_street_b+", ny";
                    //console.log(dir);
                    var geo = 'https://maps.googleapis.com/maps/api/geocode/json?address='+dir+'&key=AIzaSyCKT8kGv3AV6EKIANjsxxYtuDORS0mCcvs';
                    var pos = $.getJSON(geo)
                        .done( function(){
                            //aux.push(pos);
                            var formatted_address =  pos.results.geometry.location.lat;
                            console.log(formatted_address);
                            //alert(JSON.stringify(geo));
                            /*var lat = pos.responseJSON.results[0].geometry.location.lat;
                            var long = pos.responseJSON.results[0].geometry.location.lng;
                            var latLong = new google.maps.LatLng(lat, long);
                            var newMarker = new google.maps.Marker({
                            position: latLong,
                            map: map
                            });
                            houseMarkers.push(newMarker);
                            newMarker.setMap(map);*/
                        })
                    .fail(function(error){console.error(error);
                                         });
                }
                console.log(aux);
                console.log(aux[0]);
            })
    .fail(function(error){console.error(error);});
}