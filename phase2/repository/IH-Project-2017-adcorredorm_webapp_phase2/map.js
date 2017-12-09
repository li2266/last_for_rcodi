function initMap(){
    var mapDiv = document.getElementById('googleMap');
    var map = new google.maps.Map(mapDiv, {
        center: {lat: 40.7291, lng: -73.9965},
        zoom: 17});
    var marker = new google.maps.Marker({ //Line 1
        position: {lat: 40.7291, lng: -73.9965}, //Line2: Location to be highlighted
        map: map,//Line 3: Reference to map object
        title: 'NYU Stern School' //Line 4: Title to be given
    })
}