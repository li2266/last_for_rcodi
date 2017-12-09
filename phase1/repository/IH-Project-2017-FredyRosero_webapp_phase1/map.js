function initMap() {    
var uluru = {lat: 40.7290821, lng: -73.9970246};
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 15,
  center: uluru
});
var marker = new google.maps.Marker({
  position: uluru,
  map: map
});
}