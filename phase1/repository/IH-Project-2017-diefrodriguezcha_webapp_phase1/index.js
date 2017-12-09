
// -------------------Google Maps Section ------------------------

function initMap(){
    var initialLocation = {lat: 40.7291, lng: -73.9965};
    var map = new google.maps.Map(document.getElementById("mapContainer"), {
        center: initialLocation,
        zoom: 17
    });
    
    var initialMarker = new google.maps.Marker({
        position: initialLocation,
        map: map, 
        title: "NYU"
    });
}
