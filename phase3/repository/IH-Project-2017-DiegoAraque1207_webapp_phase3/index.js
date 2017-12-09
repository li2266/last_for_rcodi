
var map;
function onGoogleMapResponse(){
	map = new google.maps.Map(document.getElementById('mapDiv'), {
		center: {lat: 40.729131, lng: -73.9965},
		zoom: 17
		
	});
}


