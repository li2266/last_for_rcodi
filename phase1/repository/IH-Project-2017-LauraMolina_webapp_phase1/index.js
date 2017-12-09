var map;

function onGoogleMapResponse(){
	var university = {lat: 40.729055, lng: -73.996523};
	map =  new google.maps.Map(document.getElementById('googleMapDiv'), {
		zoom: 16,
		center: university
	});

	var marker = new google.maps.Marker({
          position: university,
          map: map
    });
	
}