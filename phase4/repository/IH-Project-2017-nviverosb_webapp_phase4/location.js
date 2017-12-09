function initMap() {

    var marker;
    var myLatlng = {lat: 40.7291,lng: -73.9965};
    var geocoder = new google.maps.Geocoder;

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
            var lat = 40.714224;
            var lng = -73.961452;

            var myLatlng = {lat: 40.7291,lng: -73.9965};

            marker = new google.maps.Marker({
                position: myLatlng,
            });

            marker.setMap(map);
            var info = new google.maps.InfoWindow;
            //            infoWindow.setPosition(marker);
            //            infoWindow.setContent('Location found.');
            map.setCenter(myLatlng);
            infoWindow.close();
            geocodeLatLng(geocoder,map,info,lat,lng);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function geocodeLatLng(geocoder, map, infowindow, lati, long) {
    //        var input = document.getElementById('latlng').value;
    //        var latlngStr = input.split(',', 2);
    var latlng = {lat: lati, lng: long};
    geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
            if (results[1]) {
                map.setZoom(11);
//                var marker = new google.maps.Marker({
//                    position: latlng,
//                    map: map
//                });
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {

    infoWindow.close();
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.close();
}