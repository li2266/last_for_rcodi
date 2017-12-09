var map;
function initMap(){
    map = new google.maps.Map(document.getElementById("map_row"), {
        center : {lat: 40.729100, lng: -73.996500}, zoom: 17
    });
    var country = "United States";
    var marker = new google.maps.Marker({
          position: {lat: 40.729100, lng: -73.996500},
          map: map,
          title: 'NYU Stern School of Business'
    });
    map.addListener('change_center', function() {
        });

        marker.addListener('click', function() {
          map.setCenter(marker.getPosition());
        });
      }