var map;
function initMap() {
    var newYork = {lat: 40.7291, lng: -73.9965};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: newYork
    });
    var marker = new google.maps.Marker({
        position: newYork,
        map: map
    });
}