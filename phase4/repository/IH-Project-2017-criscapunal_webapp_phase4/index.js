const DATASET_HOUSES = "https://data.cityofnewyork.us/resource/q3m4-ttp3.json?$query=%20select%20latitude,longitude";
const DATASET_CRIMES = "https://data.cityofnewyork.us/resource/9s4h-37hy.json?$where=%20lat_lon%20IS%20NOT%20NULL";
const DATASET_APARTAMENTO = "http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=https://mail.google.com/mail/u/0/#inbox/15f8d2401331da73";
var HOUSES;
var CRIMES;
var map;


function getDataHouses() {
	$.ajax({
		url: "https://data.cityofnewyork.us/resource/q3m4-ttp3.json?$query=select house_number, street_name, borough,  latitude, longitude, date_extract_y(project_completion_date) as year where year >=2017",
		type: "GET",
		data: {
		  "$$app_token" : "tSehI8ruitHdWeRVvYn1n30oE"
		}
	}).done(function(data) {
	  HOUSES = data;
	  console.log(data);
	});
}



function getDataCrimes(url){
	var data = $.get( url, () => {
		console.log(url);
	})
		.done(function(){
			console.log(data.responseJSON);
			CRIMES = data.responseJSON;
		})
		.fail(function(error){
			console.error(error)
		})
}


function initMap() {
	var uluru = {lat: 40.729056, lng: -73.996524};
	map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 15,
	  center: uluru
	});
}

function drawMarkerHouses() {
	for (i = 0; i < HOUSES.length; i++) {
			
		var position = new google.maps.LatLng(HOUSES[i].latitude, HOUSES[i].longitude);
		console.log(HOUSES[i].latitude);

		var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + DATASET_APARTAMENTO+HOUSES + '"') + '&format=xml&callback=?';
		
		$.getJSON(yql, function(data){
			console.log(data.results[0]);
		});

		var contentString = '<div id="content">'+
		'<div id="siteNotice">'+
		'</div>'+
		'<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
		'<div id="bodyContent">'+
		'<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
		'sandstone rock formation in the southern part of the '+
		'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
		'south west of the nearest large town, Alice Springs; 450&#160;km '+
		'(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
		'features of the Uluru - Kata Tjuta National Park. Uluru is '+
		'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
		'Aboriginal people of the area. It has many springs, waterholes, '+
		'rock caves and ancient paintings. Uluru is listed as a World '+
		'Heritage Site.</p>'+
		'<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
		'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
		'(last visited June 22, 2009).</p>'+
		'</div>'+
		'</div>';

		var infowindow = new google.maps.InfoWindow({
		content: contentString
		});

		marker = new google.maps.Marker({
			position: position,
			map: map
		});

		marker.addListener('click', function() {
			infowindow.open(map, marker);
		});

	}
}

function drawMarkerCrimes() {
	for (i = 0; i < CRIMES.length; i++) {
		if (CRIMES[i].latitude != null || CRIMES[i].longitude != null) {
			var position = new google.maps.LatLng(CRIMES[i].latitude, CRIMES[i].longitude);
			marker = new google.maps.Marker({
				position: position,
				map: map
			});
		}
	}
}


getDataCrimes(DATASET_CRIMES);;
getDataHouses();

$(document).ready(function(){
	$("#drawHouses").on("click", drawMarkerHouses)
	$("#drawCrimes").on("click", drawMarkerCrimes)
});

