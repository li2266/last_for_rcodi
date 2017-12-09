function initMap(){
		var mapDiv = document.getElementById('map');
		var map = new google.maps.Map(mapDiv, {
			center: {lat: 40.7291, lng: -73.9965},
			zoom: 14});  
		var marker = new google.maps.Marker({ 
			position: {lat: 40.7291, lng: -73.9965},
			map: map,
			title: 'NYU Stern School of Business'
		});
	}

