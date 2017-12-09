var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: {lat: 40.7291, lng: -73.9965}
    });
}