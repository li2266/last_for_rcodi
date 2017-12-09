const NY_SCHOOL_DATA = "https://data.cityofnewyork.us/resource/qybk-bjjc.json"
const NY_MUSEUMS_DATA = "https://data.cityofnewyork.us/resource/fn6f-htvy.json"
const NY_ART_DATA = "https://data.cityofnewyork.us/resource/43hw-uvdj.json"
const NY_HEALTH_DATA = "https://data.cityofnewyork.us/resource/w9ei-idxz.json"

var data;
var map;

var schoolsInfo = [];
var museumsInfo = [];
var artsInfo = [];
var healthInfo = [];

var schools;
var museums;
var arts;
var health;

function loadDataSchool(){
	$.getJSON(NY_SCHOOL_DATA, function(data, tStatus){
		$.each(data, function(i, result){
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(parseFloat(result.latitude), parseFloat(result.longitude)),
				map: null,
				icon : 'https://newcdn.iconfinder.com/data/icons/location-map-simplicity/512/university_school-32.png'
			});
			schoolsInfo.push(marker);
		});
	});
}

function loadDataMuseum(){
	$.getJSON(NY_MUSEUMS_DATA, function(data, tStatus){
		$.each(data, function(i, result){
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(parseFloat(result.the_geom.coordinates[1]), parseFloat(result.the_geom.coordinates[0])),
				map: null,
				icon : 'https://cdn2.iconfinder.com/data/icons/location-map-simplicity/512/museum-32.png'
			});
			museumsInfo.push(marker);
		});
	});
}

function loadDataArt(){
	$.getJSON(NY_ART_DATA, function(data, tStatus){
		$.each(data, function(i, result){
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(parseFloat(result.the_geom.coordinates[1]), parseFloat(result.the_geom.coordinates[0])),
				map: null,
				icon : 'https://cdn2.iconfinder.com/data/icons/maki/100/art-gallery-32.png'
			});
			artsInfo.push(marker);
		});
	});
}

function loadDataHealth(){
	$.getJSON(NY_HEALTH_DATA, function(data, tStatus){
		$.each(data, function(i, result){
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(parseFloat(result.latitude), parseFloat(result.longitude)),
				map: null,
				icon : 'https://cdn4.iconfinder.com/data/icons/ios-web-user-interface-multi-circle-flat-vol-7/512/H_sign_hospital_hospital_sign_hospital__medical__road_sign-32.png'
			});
			healthInfo.push(marker);
		});
	});
}

function setSchools(type){
	for (var i = 0; i < schoolsInfo.length; i++){
			schoolsInfo[i].setMap(type);
	}
}

function setMuseums(type){
	for (var i = 0; i < museumsInfo.length; i++){
			museumsInfo[i].setMap(type);
	}
}

function setArts(type){
	for (var i = 0; i < artsInfo.length; i++){
			artsInfo[i].setMap(type);
	}
}

function setHealth(type){
	for (var i = 0; i < healthInfo.length; i++){
			healthInfo[i].setMap(type);
	}
}

$(document).ready(function() {
	$("#getPlaces").on('click', function(){
	    
	    schools = document.getElementById("searchSchools").checked;
	    
	    if (schools){
			setSchools(map)
		}
		else if(!schools){
			setSchools(null)	
		}
		
		museums = document.getElementById("searchMuseums").checked;
	    
	    if (museums){
			setMuseums(map)
		}
		else if(!museums){
			setMuseums(null)	
		}
		
		arts = document.getElementById("searchArts").checked;
	    
	    if (arts){
			setArts(map)
		}
		else if(!arts){
			setArts(null)	
		}
		
		health = document.getElementById("searchVaccination").checked;
	    
	    if (health){
			setHealth(map)
		}
		else if(!health){
			setHealth(null)	
		}
	});
});

function onGoogleMapResponse() {
    
    var city = "New York";
    var university = "New York University";
    var setcity = {lat: 40.729100, lng: -73.996500};
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address' : university } , function(results,status){
        if (status == google.maps.GeocoderStatus.OK){
            map.setCenter(results[0].geometry.location);
        }
    });
    
    map = new google.maps.Map(document.getElementById('googleMapContainer'), {
       zoom: 13
    });
    
    var marker = new google.maps.Marker({
        map: map,
        position: setcity
    });    
}

loadDataSchool();
loadDataMuseum();
loadDataArt();
loadDataHealth();