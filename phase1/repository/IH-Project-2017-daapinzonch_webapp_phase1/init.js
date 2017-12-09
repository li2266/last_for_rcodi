var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8
    });

    var city = "New York";
    var geo = new google.maps.Geocoder();
    geo.geocode({'address' : city}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
        }
    });
}