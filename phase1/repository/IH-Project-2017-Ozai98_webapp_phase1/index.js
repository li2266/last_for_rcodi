function myMap() {
  var mapOptions = {
    center: new google.maps.LatLng(40.7289694, -73.9978904),
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.map
  }
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}
