
var map;
function initMap() {
        var university = {lat: 40.729055, lng: -73.996523};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: university
        });
        var marker = new google.maps.Marker({
          position: university,
          map: map
        });
}
map.data.setStyle(function(feature) {
    var ascii = feature.getProperty('ascii');
    var color = ascii > 91 ? 'red' : 'blue';
    return {
      fillColor: color,
      strokeWeight: 1
    };
})