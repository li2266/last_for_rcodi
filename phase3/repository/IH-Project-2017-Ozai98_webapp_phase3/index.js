function myMap() {
  var mapOptions = {
    center: new google.maps.LatLng(40.7291, -73.9965),
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.map
  }
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function test() {
  document.getElementById("startText").innerHTML = "Magic :O";
}
