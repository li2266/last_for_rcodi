const NY_SCHOOL_DATA = "https://data.cityofnewyork.us/resource/qybk-bjjc.json"
const NY_FIRE_DATA = "https://data.ny.gov/resource/qfsu-zcpv.json"
const NY_CAREER_DATA = "https://data.ny.gov/resource/g8h7-98zz.json"

var data;
var map;

var schoolsInfo = [];
var fireInfo = [];
var careerInfo = [];

var schools;
var fireDepartment;
var career;
	
//Schools DATA------------------------------------------------
function loadDataSchool(){
	$.getJSON(NY_SCHOOL_DATA, function(data, tStatus){
		$.each(data, function(i, result){
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(parseFloat(result.latitude), parseFloat(result.longitude)),
				map: null,
			});
			schoolsInfo.push(marker);
		});
	});
};

function setSchools(type){
	for (var i = 0; i < schoolsInfo.length; i++){
			schoolsInfo[i].setMap(type);
	}
}
//------------------------------------------------------------

//Fire Depatment Data-----------------------------------------
function loadDataFire(){
    $.getJSON(NY_FIRE_DATA, function(data, tStatus){
    		$.each(data, function(i, result){
    			var marker = new google.maps.Marker({
    				position: new google.maps.LatLng(parseFloat(result.lat),parseFloat(result.long)),
    				map: null,
    			});
    			fireInfo.push(marker);
    		});
    	});
}

function setFire(type){
	for (var i = 0; i < fireInfo.length; i++){
			fireInfo[i].setMap(type);
	}
}
//------------------------------------------------------------

//ATM Data----------------------------------------------------
function loadDataCareer(){
    $.getJSON(NY_CAREER_DATA, function(data, tStatus){
    		$.each(data, function(i, result){
    			var marker = new google.maps.Marker({
    				position: new google.maps.LatLng(parseFloat(result.location_1.latitude),parseFloat(result.location_1.longitude)),
    				map: null,
    			});
    			careerInfo.push(marker);
    		});
    	});
}

function setCareer(type){
	for (var i = 0; i < careerInfo.length; i++){
			careerInfo[i].setMap(type);
	}
}
//------------------------------------------------------------

$(document).ready(function() {
	$("#getDataButton").on('click', function(){
	    
	    schools = document.getElementById("searchSchools").checked;
	    fireDepartment = document.getElementById("searchFire").checked;
	    career = document.getElementById("searchCareer").checked;
	    
	    if (schools){
			setSchools(map)
		}
		else if(!schools){
			setSchools(null)	
		}
		
		if (fireDepartment){
			setFire(map)
		}
		else if(!fireDepartment){
			setFire(null)	
		}
		
		if (career){
			setCareer(map)
		}
		else if(!career){
			setCareer(null)	
		}
	});
});

function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7291, lng: -73.9965},
        zoom: 12
    });
}

loadDataSchool();
loadDataFire();
loadDataCareer();