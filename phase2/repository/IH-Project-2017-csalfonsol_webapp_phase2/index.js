
var map
var nyuLocation = {lat: 40.7291, lng: -73.9965};
var opacityChange = 0;
var mapVisible = true;

function initMap(){

		var styledMapType = new google.maps.StyledMapType(
			[
			{
			 featureType: "road",
			 elementType: "labels",
			 stylers: [{'visibility': 'off'}]
			}
			],
      {name: 'Styled Map'});


	  map = new google.maps.Map(document.getElementById('googleMapContainer'),
		{
				center: nyuLocation,
				zoom: 15
		});

		var marker = new google.maps.Marker({
		          position: nyuLocation,
		          map: map,
							label: "N",
							animation: google.maps.Animation.DROP,
		          title: 'Your destiny!'
		});

		map.mapTypes.set('Styled_map', styledMapType);
    map.setMapTypeId('Styled_map');
}

function mapOpacity(){
	   opacity = document.getElementById("googleMapContainer").style.opacity;
		 $('#googleMapContainer').animate(
			 {opacity: opacityChange},'slow');
			 opacityChange = opacityChange * -1 + 1;

		 if (mapVisible){
			 document.getElementById("hideButton").value="Show Map";
			 mapVisible = false;
		 }
		 else {
			 document.getElementById("hideButton").value="Hide Map";
 			 mapVisible = true;
		 }
}

function center(){
	 map.panTo(nyuLocation);
}