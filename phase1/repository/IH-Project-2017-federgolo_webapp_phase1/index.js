
(function () {
    document.getElementById("btn").addEventListener("click", function () {
        alert("Hi! :)");
    });
})();

var map;
function onGoogleMapResponse () {
 
    map = new google.maps.Map(document.getElementById('googleMapContainer'), {
        center: ({lat: 40.7291, lng: -73.9965}),
        zoom: 12
    });
    
}