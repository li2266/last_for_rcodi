//Map

function initMap(){

	var mapDiv = document.getElementById('map');

	var map = new google.maps.Map(mapDiv, {

		center: {lat: 40.7291, lng: -73.9965},

		zoom: 12});

	var marker = new google.maps.Marker({

		position: {lat: 40.7291, lng: -73.9965},

		map: map,

		title: 'NYU' 

	});

	var infoWindow  = new google.maps.InfoWindow({

		content: "<b>NYU Stern School of Business</b>"

	});

	google.maps.event.addListener(marker, 'click', function(){ infoWindow.open(map, marker);});

}

//Modal

$(window).on('load',function(){

        $('#myModal').modal('show');

});