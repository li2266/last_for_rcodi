const DATASET_HOUSES = "https://data.cityofnewyork.us/resource/q3m4-ttp3.json?$query=select house_number, street_name, borough,  latitude, longitude, date_extract_y(project_completion_date) as year where year >=2017";
const DATASET_CRIMES = "https://data.cityofnewyork.us/resource/9s4h-37hy.json?$where=%20lat_lon%20IS%20NOT%20NULL";
const DATASET_APARTAMENTO = "http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1g3gstrqa6j_68qz7";


var HOUSES;
var CRIMES;
var CLIMATES;
var map;
var infowindow;
var xmlText;



function getDataHouses() {
	$.ajax({
		url: DATASET_HOUSES,
		type: "GET",
		data: {
		  "$$app_token" : "tSehI8ruitHdWeRVvYn1n30oE"
		}
	}).done(function(data) {
	  HOUSES = data;
	  console.log(data);
	});
}

function getDataClimate() {
	$.ajax({
		url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=ZIP:28801&startdate=2010-05-01&enddate=2010-05-01",
		headers:{ token: "DmKeNEkgvKpRhjQrMaYdLXsOABXsgldC" }
	}).done(function(data){
		CLIMATES = data;
		console.log(data);
	});
}

function getDataCrimes(){
	var data = $.get( DATASET_CRIMES, () => {
		console.log(DATASET_CRIMES);
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
	for (i = 0; i < HOUSES.length-1; i++) {
		if (HOUSES[i].latitude != null && HOUSES[i].house_number != "---" && HOUSES[i].street_name != null) {
			var position = new google.maps.LatLng(HOUSES[i].latitude, HOUSES[i].longitude);

			var address = '&address='+HOUSES[i].house_number+'+'+HOUSES[i].street_name;
			var citystatezip = '&citystatezip='+HOUSES[i].borough;
			var urlHome = DATASET_APARTAMENTO + address + citystatezip;
			console.log(urlHome);
			var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + urlHome + '"') + '&format=xml&callback=?';
			var contentString;

			$.ajax({
				url: yql,
				type: "GET",
				dataType: "jsonp"
			}).done(function(data) {
				/*
				xmlText = data.results[0];
				console.log(xmlText);
				var xmlDOM = new DOMParser().parseFromString(xmlText, 'text/xml');
				var x = xmlDOM.getElementsByTagName("lastSoldPrice")[0].childNodes[0].nodeValue;
				console.log(x);
			*/
				var house_number = HOUSES[i].house_number;
				contentString = '<div id="content">'+
				'<div id="siteNotice">'+
				'</div>'+
				'<div id="bodyContent">'+
				'<p><b>Address:<br/></b>'+house_number+' '+HOUSES[i].street_name+
				'<br/><b>City:</b></p>'+HOUSES[i].borough+
				'</div>'+
				'</div>';
			});



			marker = new google.maps.Marker({
				position: position,
				map: map
			});

			(function(i, marker) {
				google.maps.event.addListener(marker,'click',function() {
					if (!infowindow) {
						infowindow = new google.maps.InfoWindow();
					}
					infowindow.setContent(contentString);
					infowindow.open(map, marker);
				});

			})(i, marker);
		}
	}
}

function drawMarkerCrimes() {
	for (i = 0; i < CRIMES.length; i++) {
		if (CRIMES[i].latitude != null || CRIMES[i].longitude != null) {
			var position = new google.maps.LatLng(CRIMES[i].latitude, CRIMES[i].longitude);
			marker = new google.maps.Marker({
				position: position,
				icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Nice_Tramway_Ligne_2_Point.svg/8px-Nice_Tramway_Ligne_2_Point.svg.png",
				map: map
			});
		}
	}
}


getDataCrimes();;
getDataHouses();
getDataClimate();

$(document).ready(function(){
	$("#drawHouses").on("click", drawMarkerHouses)
	$("#drawCrimes").on("click", drawMarkerCrimes)
});

