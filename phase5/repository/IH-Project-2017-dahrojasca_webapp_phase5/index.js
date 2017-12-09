
function initMap(){
	var NYUSSB={lat: 40.7291, lng: -73.9965};
	var mapDiv = document.getElementById('map');
	map = new google.maps.Map(mapDiv, {
		center: NYUSSB,
		zoom: 14});

	var markerini0 = new google.maps.Marker({
		position: NYUSSB,
		map:map,
		title: 'NYU Stern School of Business'
	})
}