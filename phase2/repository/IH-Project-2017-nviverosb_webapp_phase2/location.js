function initMap() {

    var marker;
    var myLatlng = {lat: 40.7291,lng: -73.9965};

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7291, lng: -73.9965},
        zoom: 15
    });
    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            //var myLatlng = {lat: position.coords.latitude,lng: position.coords.longitude};

            marker = new google.maps.Marker({
                position: myLatlng,
            });

            marker.setMap(map);

            //            infoWindow.setPosition(pos);
            //            infoWindow.setContent('Location found.');
            map.setCenter(myLatlng);
            infoWindow.close();
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }


}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {

    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.close();
}