
var map

function initMap(){
	  map = new google.maps.Map(document.getElementById('googleMapContainer'), {
				center: {lat: 40.7288625, lng: -73.9964132},
				zoom: 17

		});
}