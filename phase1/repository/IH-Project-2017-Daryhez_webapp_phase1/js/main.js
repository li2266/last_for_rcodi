function initMap() {
    var uluru = {lat: 40.729100, lng: -73.996500};
    var map = new google.maps.Map(document.getElementById('googleMapContainer'), {
      zoom: 18,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
}