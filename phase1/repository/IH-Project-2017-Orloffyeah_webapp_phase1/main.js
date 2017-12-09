const ZILLOW_DATA = "https://www.quandl.com/api/v3/datasets/ZILLOW/N9_TURNAH.json?api_key=JVy_pYi3kZ_XgnasNvHF"

var data;
var map;

function getDataFromURL(URL){
	data = $.get(URL, function(){
		console.log(URL);
	})
		.done(function(){
			console.log(data);
			
		})
		.fail(function(error){
			console.error(error);
		})
}


function initMap() {
	map = new google.maps.Map(document.getElementById('googleMapContainer'), {
		center: {lat: 40.7291, lng: -73.9965},
		zoom: 16
	});
}

$(document).ready(function(){
	$("getDataButton1").on("click", getDataFromURL(ZILLOW_DATA));
})