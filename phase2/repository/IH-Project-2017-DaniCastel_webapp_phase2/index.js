function initMap() {

var myLatlng = new google.maps.LatLng(40.7291,-73.9965);
var mapOptions = {
  zoom: 9,
  center: myLatlng
}
var map = new google.maps.Map(document.getElementById("map"), mapOptions);

var marker = new google.maps.Marker({
    position: myLatlng,
    title:"Hello World!"
});

// To add the marker to the map, call setMap();
marker.setMap(map);

var otra = {lat: 40.7291, lng: -74.9965};
var marker = new google.maps.Marker({
    position: otra,
    title:"Hello World!"
});

marker.setMap(map);


}

