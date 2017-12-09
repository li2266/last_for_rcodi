function initMap() {
        var position = {lat: 40.7291 , lng: -73.9965 }; //
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: position
        });
        var marker = new google.maps.Marker({
          position: position,
          map: map
        });
    
}